import tempfile
import os

from PIL import Image

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie, Genre
from movie.serializers import MovieSerializer, MovieDetailSerializer


MOVIES_URL = reverse('movie:movie-list')


def image_upload_url(movie_id):
    """Return URL for movie image upload
    """
    return reverse('movie:movie-upload-image', args=[movie_id])


def detail_url(movie_id):
    """Return movie detail URL
    """
    return reverse('movie:movie-detail', args=[movie_id])


def sample_genre(user, name='Sample Genre'):
    """Create and return a sample genre
    """
    return Genre.objects.create(user=user, name=name)


def sample_movie(user, **params):
    """Create and return a sample movie
    """
    defaults = {
        'title': 'Sample movie',
        'description': 'Sample description',
        'stock': 100,
        'rental_price': 2.50,
        'sale_price': 10.00,
        'availability': True
    }
    defaults.update(params)

    return Movie.objects.create(user=user, **defaults)


class PublicMovieApiTests(TestCase):
    """Test unauthenticated movie API access
    """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that no authentication is required to view the movies
        """
        res = self.client.get(MOVIES_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivateMovieApiTests(TestCase):
    """Test authenticated movie API access
    """

    def setUp(self):
        # admin user
        self.client = APIClient()
        self.user = get_user_model().objects.create_superuser(
            'admin@gmail.com',
            'Admin User',
            'testpass'
        )
        self.client.force_authenticate(self.user)

        # non admin user
        self.client_nonadmin = APIClient()
        self.user_nonadmin = get_user_model().objects.create_user(
            'test@gmail.com',
            'Normal User',
            'testpass'
        )
        self.client_nonadmin.force_authenticate(self.user_nonadmin)

    def test_retrieve_movies(self):
        """Test retrieving a list of movies
        """
        sample_movie(user=self.user)
        sample_movie(user=self.user)

        res = self.client.get(MOVIES_URL)

        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.get('results'), serializer.data)

    def test_retrieve_movies_nonadmin(self):
        """Test retrieving a list of movies as non admin user
        """
        movie1 = sample_movie(user=self.user)
        movie2 = sample_movie(
            user=self.user,
            stock=0,
            availability=False
        )

        res = self.client_nonadmin.get(MOVIES_URL)

        serializer1 = MovieSerializer(movie1)
        serializer2 = MovieSerializer(movie2)

        self.assertIn(serializer1.data, res.data.get('results'))
        self.assertNotIn(serializer2.data, res.data.get('results'))

    def test_movies_not_limited_to_user(self):
        """Retrieving movies for all users
        """
        user2 = get_user_model().objects.create_superuser(
            'admin2@gmail.com',
            'Admin User',
            'password123'
        )
        sample_movie(user=user2)
        sample_movie(user=self.user)

        res = self.client.get(MOVIES_URL)

        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data.get('results')), 2)
        self.assertEqual(res.data.get('results'), serializer.data)

    def test_view_movie_detail(self):
        """Test viewing a movie detail
        """
        movie = sample_movie(user=self.user)
        movie.genre.add(sample_genre(user=self.user))

        url = detail_url(movie.id)
        res = self.client.get(url)

        serializer = MovieDetailSerializer(movie)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_movie(self):
        """Test creating movie
        """
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'stock': 100,
            'rental_price': 2.50,
            'sale_price': 10.00,
            'availability': True
        }
        res = self.client.post(MOVIES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        movie = Movie.objects.get(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(movie, key))

    def test_create_basic_movie_no_admin(self):
        """Test creating movie with a non admin user
        """
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'stock': 100,
            'rental_price': 2.50,
            'sale_price': 10.00,
            'availability': True
        }
        res = self.client_nonadmin.post(MOVIES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_movie_with_genre(self):
        """Test creating a movie with genre
        """
        genre1 = sample_genre(user=self.user, name='Sci-fy')
        genre2 = sample_genre(user=self.user, name='Suspense')
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'genre': [genre1.id, genre2.id],
            'stock': 100,
            'rental_price': 2.50,
            'sale_price': 10.00,
            'availability': True
        }
        res = self.client.post(MOVIES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        movie = Movie.objects.get(id=res.data['id'])
        genres = movie.genre.all()
        self.assertEqual(genres.count(), 2)
        self.assertIn(genre1, genres)
        self.assertIn(genre2, genres)

    def test_partial_update_movie(self):
        """Test updating a movie with patch
        """
        movie = sample_movie(user=self.user)
        movie.genre.add(sample_genre(user=self.user))
        new_genre = sample_genre(user=self.user, name='Action')

        payload = {
            'title': 'Avengers: Infinity War',
            'genre': [new_genre.id],
            'stock': 0,
            'availability': False,
            'link': 'http://www.something.com/'
        }
        url = detail_url(movie.id)
        self.client.patch(url, payload)

        movie.refresh_from_db()
        self.assertEqual(movie.title, payload['title'])
        self.assertEqual(movie.availability, payload['availability'])
        self.assertEqual(movie.link, payload['link'])
        genres = movie.genre.all()
        self.assertEqual(len(genres), 1)
        self.assertIn(new_genre, genres)

    def test_full_update_movie(self):
        """Test updating a recipe with put
        """
        movie = sample_movie(user=self.user)
        movie.genre.add(sample_genre(user=self.user))
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'stock': 0,
            'rental_price': 3.50,
            'sale_price': 12.00,
            'availability': False
        }
        url = detail_url(movie.id)
        self.client.put(url, payload)

        movie.refresh_from_db()
        self.assertEqual(movie.title, payload['title'])
        self.assertEqual(movie.description, payload['description'])
        self.assertEqual(movie.stock, payload['stock'])
        self.assertEqual(movie.rental_price, payload['rental_price'])
        self.assertEqual(movie.sale_price, payload['sale_price'])
        self.assertEqual(movie.availability, payload['availability'])
        genre = movie.genre.all()
        self.assertEqual(len(genre), 0)

    def test_filter_movies_by_genre(self):
        """Test returning movies with specific genre
        """
        movie1 = sample_movie(user=self.user, title='Interstellar')
        movie2 = sample_movie(user=self.user, title='The Great Gatsby')
        genre1 = sample_genre(user=self.user, name='Sci-fy')
        genre2 = sample_genre(user=self.user, name='Suspense')
        movie1.genre.add(genre1)
        movie2.genre.add(genre2)
        movie3 = sample_movie(user=self.user, title='Avengers: Infinity War')

        res = self.client.get(
            MOVIES_URL,
            {'genre': f'{genre1.id}, {genre2.id}'}
        )

        serializer1 = MovieSerializer(movie1)
        serializer2 = MovieSerializer(movie2)
        serializer3 = MovieSerializer(movie3)
        self.assertIn(serializer1.data, res.data.get('results'))
        self.assertIn(serializer2.data, res.data.get('results'))
        self.assertNotIn(serializer3.data, res.data.get('results'))

    def test_filter_movies_by_availability(self):
        """Test returning movies with specific Availability
        """
        movie1 = sample_movie(user=self.user, title='Interstellar')
        movie2 = sample_movie(user=self.user, title='The Great Gatsby')
        movie3 = sample_movie(
            user=self.user,
            title='Avengers: Infinity War',
            stock=0,
            availability=False
        )

        res = self.client.get(
            MOVIES_URL,
            {'availability': True}
        )

        serializer1 = MovieSerializer(movie1)
        serializer2 = MovieSerializer(movie2)
        serializer3 = MovieSerializer(movie3)
        self.assertIn(serializer1.data, res.data.get('results'))
        self.assertIn(serializer2.data, res.data.get('results'))
        self.assertNotIn(serializer3.data, res.data.get('results'))


class MovieImageUploadTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_superuser(
            'admin@gmail.com',
            'Admin User',
            'testpass'
        )
        self.client.force_authenticate(self.user)
        self.movie = sample_movie(user=self.user)

    def tearDown(self):
        self.movie.image.delete()

    def test_upload_image_to_movie(self):
        """Test uploading an image to movie
        """
        url = image_upload_url(self.movie.id)
        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')
            ntf.seek(0)
            res = self.client.post(url, {'image': ntf}, format='multipart')

        self.movie.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('image', res.data)
        self.assertTrue(os.path.exists(self.movie.image.path))

    def test_upload_image_bad_request(self):
        """Test uploading an invalid image
        """
        url = image_upload_url(self.movie.id)
        res = self.client.post(url, {'image': 'notimage'}, format='multipart')

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
