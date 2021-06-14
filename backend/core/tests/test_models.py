from unittest.mock import patch
from django.utils import timezone

from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@test.com', password='123qwe'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


def sample_product(user, **params):
    """Create and return a sample product"""
    defaults = {
        'title': 'Sample Product',
        'description': 'Sample description',
        'status': 'publicado'
    }
    defaults.update(params)

    return models.Product.objects.create(user=user, **defaults)


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Teset creating a new user with an email is successful"""
        email = 'test@test.com'
        name = 'Test User'
        password = '123qwe'
        user = get_user_model().objects.create_user(
            email=email,
            name=name,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalizaled"""
        email = 'test@TesT.com'
        user = get_user_model().objects.create_user(
            email,
            'test name',
            '123qwe'
        )

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test name', '123qwe')

    def test_create_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@test.com',
            'test name',
            '123qwe'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
