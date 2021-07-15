from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie, Rental
from movie.serializers import RentalSerializer


RENTAL_URL = reverse('movie:rental-list')


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


def sample_rental(user, movie, **params):
    """Create and return a sample rental
    """
    defaults = {
        'date_out': timezone.now()
    }
    defaults.update(params)

    return Rental.objects.create(user=user, movie=movie, **defaults)


class PublicRentalApiTests(TestCase):
    """Test unauthorized rental access
    """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required to view the rentals
        """
        res = self.client.get(RENTAL_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateRentalApiTests(TestCase):
    """Test authorized rental API access
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

    def test_retrieve_rentals(self):
        """Test retrieving a list of rented movies
        """
        movie1 = sample_movie(user=self.user, title='Interstellar')
        movie2 = sample_movie(user=self.user, title='Nobody')

        sample_rental(user=self.user_nonadmin, movie=movie1)
        sample_rental(user=self.user_nonadmin, movie=movie2)

        res = self.client_nonadmin.get(RENTAL_URL)

        rentals = Rental.objects.all()
        serializer = RentalSerializer(rentals, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_rental(self):
        """Test creating a rented movie
        """
        payload = {
            'user': self.user.id,
            'movie': self.movie.id,
            'date_out': timezone.now()
        }
        res = self.client_nonadmin.post(RENTAL_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        rental = Rental.objects.get(id=res.data['id'])
        self.assertEqual(payload['date_out'].date(), rental.date_out.date())
