import tempfile
import os
from PIL import Image

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Product, CharacteristicTypes, Brand, ProductCharacteristics
from product.serializers import ProductSerializer, ProductDetailSerializer


PRODUCTS_URL = reverse('product:product-list')


def image_upload_url(product_id):
    """Return URL for product image upload"""
    return reverse('product:product-upload-image', args=[product_id])


def detail_url(product_id):
    """Return product detail URL"""
    return reverse('product:product-detail', args=[product_id])


def sample_brand(user, name='Sample Brand'):
    """Create and return a sample brand"""
    return Brand.objects.create(user=user, name=name)


def sample_product(user, **params):
    """Create and return a sample product"""
    defaults = {
        'title': 'Sample product',
        'description': 'Sample product description',
        'status': 'publicado'
    }
    defaults.update(params)

    return Product.objects.create(user=user, **defaults)


class PublicProductApiTests(TestCase):
    """Test unauthenticated product API access"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_requires(self):
        """Test that no authentication is required to view the products"""
        res = self.client.get(PRODUCTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivateProductAPITests(TestCase):
    """Test authenticated product API access"""

    def setUp(self):
        # admin user
        self.client = APIClient()
        self.user = get_user_model().objects.create_superuser(
            'admin@admin.com',
            'Admin username',
            'testpass'
        )
        self.client.force_authenticate(self.user)

        # non admin user
        self.client_nonadmin = APIClient()
        self.user_nonadmin = get_user_model().objects.create_user(
            'test@gmail.com',
            'Normal user',
            'testpass'
        )
        self.client_nonadmin.force_authenticate(self.user_nonadmin)

    def test_retrieve_products(self):
        """Test retrieving a list products"""
        sample_product(user=self.user)
        sample_product(user=self.user)

        res = self.client.get(PRODUCTS_URL)

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.get('results'), serializer.data)

    def test_retrieve_products_nonadmin(self):
        """Test retrieving a list of products as a non admin user"""
        product1 = sample_product(user=self.user)
        product2 = sample_product(
            user=self.user,
            description="new description",
            status='borrador'
        )

        res = self.client_nonadmin.get(PRODUCTS_URL)

        serializer1 = ProductSerializer(product1)
        serializer2 = ProductSerializer(product2)

        self.assertIn(serializer1.data, res.data.get('results'))
        self.assertNotIn(serializer2.data, res.data.get('results'))

    def test_products_not_limited_to_user(self):
        """Retrieving products for all users"""
        user2 = get_user_model().objects.create_superuser(
            'admin2@gmail.com',
            'Admin User',
            '123qwe'
        )
        sample_product(user=user2)
        sample_product(user=self.user)

        res = self.client.get(PRODUCTS_URL)

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data.get('results')), 2)
        self.assertEqual(res.data.get('results'), serializer.data)

    def test_view_product_detial(self):
        """Test viewing a product detail"""
        product = sample_product(user=self.user)
        product.brand.add(sample_brand(user=self.user))

        url = detail_url(product.id)
        res = self.client.get(url)

        serializer = ProductDetailSerializer(product)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_product(self):
        """Test creating product"""
        payload = {
            'title': 'Guantes Estériles',
            'description': 'Guantes para uso quirúrjico',
            'status': 'publicado'
        }
        res = self.client.post(PRODUCTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        product = Product.objects.all(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(product, key))

    def test_create_basic_product_no_admin(self):
        """Test creating product with a non admin user"""
        payload = {
            'title': 'Guantes Estériles',
            'description': 'Guantes para uso quirúrjico',
            'status': 'publicado'
        }
        res = self.client_nonadmin.post(PRODUCTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_product_with_brand(self):
        """Test creating a product with brand"""
        brand1 = sample_brand(user=self.user, name='Riester')
        brand2 = sample_brand(user=self.user, name='3M')
        payload = {
            'title': 'Guantes Estériles',
            'brand': [brand1.id, brand2.id],
            'description': 'Guantes para uso quirúrjico',
            'status': 'publicado'
        }
        res = self.client.post(PRODUCTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        product = Product.objects.get(id=res.data['id'])
        brands = product.brand.all()
        self.assertEqual(brands.count(), 2)
        self.assertIn(brand1, brands)
        self.assertIn(brand2, brands)

    # def test_partial_update_product(self):
    #     """
