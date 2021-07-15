from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie, Purchase
from movie.serializers import PurchaseSerializer


PURCHASE_URL = reverse('movie:purchase-list')


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


def sample_purchase(user, movie):
    """Create and return a sample purchase
    """
    return Purchase.objects.create(user=user, movie=movie)


class PublicPurchaseApiTests(TestCase):
    """Test unauthorized Purchase access
    """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required to view the Purchases
        """
        res = self.client.get(PURCHASE_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivatePurchaseApiTests(TestCase):
    """Test authorized Purchase API access
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

    def test_retrieve_purchases(self):
        """Test retrieving a list of purchased movies
        """
        movie1 = sample_movie(user=self.user, title='Interstellar')
        movie2 = sample_movie(user=self.user, title='Nobody')

        sample_purchase(user=self.user_nonadmin, movie=movie1)
        sample_purchase(user=self.user_nonadmin, movie=movie2)

        res = self.client_nonadmin.get(PURCHASE_URL)

        purchases = Purchase.objects.all()
        serializer = PurchaseSerializer(purchases, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_purchase(self):
        """Test creating a purchased movie
        """
        payload = {
            'user': self.user.id,
            'movie': self.movie.id
        }
        res = self.client_nonadmin.post(PURCHASE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        purchase = Purchase.objects.get(id=res.data['id'])
        self.assertEqual(timezone.now().date(), purchase.date_bought.date())
