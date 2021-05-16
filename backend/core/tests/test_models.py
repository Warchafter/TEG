from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@test.com', password='123qwe'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Teset creating a new user with an email is successful"""
        email = 'test@test.com'
        password = '123qwe'
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalizaled"""
        email = 'test@TesT.com'
        user = get_user_model().objects.create_user(email, '123qwe')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, '123qwe')

    def test_create_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@test.com',
            '123qwe'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_product_family_str(self):
        """Test the product family string representation"""
        prod_family = models.ProductFamily.objects.create(
            user=sample_user(),
            name='Descartable'
        )

        self.assertEqual(str(prod_family), prod_family.name)

    def test_product_type_str(self):
        """Test the product type string representation"""
        user = sample_user()
        prod_family = models.ProductFamily.objects.create(
            user=user,
            name='Descartable'
        )

        prod_type = models.ProductType.objects.create(
            user=user,
            name='Descartable',
            product_family=prod_family
        )

        self.assertEqual(str(prod_type), prod_type.name)

    def test_presentation_type(self):
        """Test the presentation type string representation"""
        user = sample_user()
        pres_type = models.PresentationType.objects.create(
            user=user,
            name='P'
        )

        self.assertEqual(str(pres_type), pres_type.name)
