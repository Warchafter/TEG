from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie, LikedMovie
from movie.serializers import LikedMovieSerializer


LIKED_MOVIE_URL = reverse('movie:likedmovie-list')


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


def sample_liked_movie(user, movie):
    """Create and return a sample liked movie
    """
    return LikedMovie.objects.create(user=user, movie=movie)


class PublicLikedMovieApiTests(TestCase):
    """Test unauthorized liked movie access
    """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required to view the liked movies
        """
        res = self.client.get(LIKED_MOVIE_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateLikedMovieApiTests(TestCase):
    """Test authorized liked movie API access
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

        # sample movie
        self.movie = sample_movie(user=self.user)

    def test_retrieve_liked_movies(self):
        """Test retrieving a list of liked movies
        """
        movie1 = sample_movie(user=self.user, title='Interstellar')
        movie2 = sample_movie(user=self.user, title='Nobody')

        sample_liked_movie(user=self.user_nonadmin, movie=movie1)
        sample_liked_movie(user=self.user_nonadmin, movie=movie2)

        res = self.client_nonadmin.get(LIKED_MOVIE_URL)

        liked_movies = LikedMovie.objects.all()
        serializer = LikedMovieSerializer(liked_movies, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_liked_movie(self):
        """Test creating a purchased movie
        """
        payload = {
            'movie': self.movie.id
        }
        res = self.client_nonadmin.post(LIKED_MOVIE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        liked_movie = LikedMovie.objects.get(id=res.data['id'])
        self.assertEqual(self.movie.id, liked_movie.movie_id)
        self.assertEqual(self.movie.likes, 1)
