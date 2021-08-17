import uuid
import os
import logging
from django.db import models
from django.db.models import F
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.db.utils import IntegrityError
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings


def user_rif_image_file_path(instance, filename):
    """Generate file path for new users rif image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/user_rif/', filename)


def product_image_file_path(instance, filename):
    """Generate file path for new product image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/product/', filename)


# def brand_image_file_path(instance, filename):
#     """Generate file path for new brand image"""
#     ext = filename.split('.')[-1]
#     filename = f'{uuid.uuid4()}.{ext}'

#     return os.path.join('uploads/product/brand/', filename)


def supplier_rif_file_path(instance, filename):
    """Generate file path for new suppliers rif image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/supplier/rif/', filename)


def bill_payment_receipt_image_file_path(instance, filename):
    """Generate file path for new bill payment receipts image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/bill/payment_evidence/', filename)


def movie_image_file_path(instance, filename):
    """Generate file path for new movie image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/movie/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, name, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError(_('Usuarios deben tener un correo electrónico'))

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, **extra_fields):
        """Creates and saves a new superuser

        Args:
            email (string): User email
            name (string): User name
            password (string): User Password

        Returns:
            Object: The user model
        """
        user = self.create_user(email, name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


# SPECIALIZATION_CHOICES = (
#     ('Alergología', 'Alergología'),
#     ('Anestesiología', 'Anestesiología'),
#     ('Cardiología', 'Cardiología'),
#     ('Endocrinología', 'Endocrinología'),
#     ('Gastroenterología', 'Gastroenterología'),
#     ('Medicina', 'Medicina')
# )


class Specialization(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


BUSINESS_TYPE_CHOICES = (
    ('Personal', 'Personal'),
    ('Consultorio', 'Consultorio'),
    ('Hospital', 'Hospital'),
    ('Clínica', 'Clínica'),
    ('Distribuidora', 'Distribuidora'),
    ('Gubernamental', 'Gubernamental')
)


ROLES_OPT = (
    ('user', 'Usuario'),
    ('staff', 'Empleado'),
    ('admin', 'Administrador')
)


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    business_name = models.CharField(
        "nombre de la empresa", max_length=255, blank=True)
    business_type = models.CharField(
        max_length=255, choices=BUSINESS_TYPE_CHOICES, blank=True)
    specialization = models.ManyToManyField(
        Specialization, verbose_name="listado de especializaciones")
    rif = models.ImageField(null=True, upload_to=user_rif_image_file_path)
    rif_address = models.CharField(max_length=255, blank=True)
    rif_validated = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    roles = models.CharField(
        max_length=30, choices=ROLES_OPT, default='user'
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', ]

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email


class Brand(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING
    )

    class Meta:
        ordering = ('-name',)

    def __str__(self):
        return self.name


class CharacteristicTypes(models.Model):
    """ """
    # Familia de Producto - (Material Médico, Mobiliario Médico, etc.)
    # Tipo de Producto - (Guante, Anastesia, Germinidas, Lencería, etc.)
    # Tipo de Especialización - (Cirujano, Cardiólogo, etc.)
    # Tipo de Presentación - (Paquete, Caja, Bulto, Unitario)
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


PRODUCT_STATUS_OPT = (
    ('borrador', 'Borrador'),
    ('publicado', 'Publicado'),
    ('test', 'Test')
)


class Product(models.Model):
    """Product object"""

    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )
    brand = models.ManyToManyField(
        'Brand', verbose_name="Marca")
    description = models.TextField()
    product_image = models.ImageField(
        null=True, upload_to=product_image_file_path)
    published = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=10, choices=PRODUCT_STATUS_OPT, default='publicado'
    )

    def __str__(self):
        return self.title


class ProductCharacteristics(models.Model):
    """ """
    # Voy a tener para un Guante N registros
    # 1.- [characteristic_type] = 'Tipo de presentación'; [name] = 'Paquete'; [value] = '50'
    # 2.- [characteristic_type] = 'Tipo de presentación'; [name] = 'Paquete'; [value] = '250'
    # 3.- [characteristic_type] = 'Tipo de Producto'; [name] = 'Guante'; [value] = null/blank
    # 4.- [characteristic_type] = 'Familia de Producto'; [name] = 'Equipo Médico'; [value] = null/blank
    # 5.- [characteristic_type] = 'Color'; [name] = 'Blanco'; [value] = '#FFFFFF'
    # 6.- [characteristic_type] = 'Color'; [name] = 'Negro'; [value] = '#000000'
    # 7.- [characteristic_type] = 'Tamaño'; [name] = 'XL'; [value] = '7'
    # 8.- [characteristic_type] = 'Tamaño'; [name] = '30cc'; [value] = '30'
    # 9.- [characteristic_type] = 'Especial'; [name] = 'Talco'; [value] = 'True'
    # 10.- [characteristic_type] = 'Especial'; [name] = 'Talco'; [value] = 'False'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )
    product = models.ForeignKey(
        'Product',
        verbose_name="ID Tipo de Producto",
        on_delete=models.DO_NOTHING)
    characteristic_type = models.ForeignKey(
        'CharacteristicTypes',
        verbose_name="Tipo de Característica",
        on_delete=models.DO_NOTHING
    )
    name = models.CharField(max_length=255, blank=False)
    value = models.TextField(blank=True)

    def __str__(self):
        return str(self.product) + ' - ' + str(self.characteristic_type) + ' - ' + str(self.name) + ' ' + str(self.value)


# class Deparment(models.Model):
#     """Department object"""
#     name = models.CharField(max_length=255)
#     user = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.DO_NOTHING,
#     )

#     def __str__(self):
#         return self.name


# class CompanyPhones(models.Model):
#     """ """
#     phone_number = models.CharField(max_length=15)
#     description = models.CharField(max_length=255)
#     department = models.ForeignKey(Deparment,
#                                    verbose_name="ID Departamento",
#                                    on_delete=models.DO_NOTHING
#                                    )
#     is_Main = models.BooleanField(verbose_name="Flag de Telefono Principal")

#     def __str__(self):
#         return self.phone_number


# class CompanyEmails(models.Model):
#     """ """
#     email = models.CharField(max_length=255)
#     description = models.CharField(max_length=255)
#     is_Main = models.BooleanField(verbose_name="Flag de Correo Pricipal")

#     def __str__(self):
#         return self.email


class Bank(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


# class CompanyBankAccounts(models.Model):
#     """ """
#     account_number = models.CharField(max_length=50)
#     bank_type = models.ForeignKey(
#         Bank,
#         verbose_name="ID Banco",
#         on_delete=models.DO_NOTHING
#     )
#     description = models.CharField(max_length=255)

#     def __str__(self):
#         return self.account_number


# class SupplierBankAccounts(models.Model):
#     """ """
#     account_number = models.CharField(max_length=50)
#     bank_type = models.ForeignKey(
#         Bank,
#         verbose_name="ID Banco",
#         on_delete=models.DO_NOTHING
#     )
#     description = models.CharField(max_length=255)

#     def __str__(self):
#         return self.account_number


class Supplier(models.Model):
    """ """
    name = models.CharField(max_length=255)
    rif = models.CharField(max_length=20)
    image = models.ImageField(
        null=True, upload_to=supplier_rif_file_path)
    address = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


class SupplierEmails(models.Model):
    """ """
    supplier = models.ForeignKey(
        Supplier, verbose_name="ID Distribuidor",
        on_delete=models.CASCADE
    )
    email = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    is_Main = models.BooleanField(verbose_name="Flag de Correo Pricipal")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.email


class SupplierProducts(models.Model):
    """ """
    product = models.ForeignKey(
        Product, verbose_name="ID Producto",
        on_delete=models.DO_NOTHING
    )
    supplier = models.ForeignKey(
        Supplier, verbose_name="ID Proveedor",
        on_delete=models.DO_NOTHING
    )
    price = models.FloatField(verbose_name="Precio del Producto")
    stock = models.FloatField(
        verbose_name="Inventario del Producto del Proveedor")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    class Meta:
        unique_together = ('product', 'supplier')

    def __str__(self):
        return str(self.supplier) + ' - ' + str(self.product)


# class SupplierEmployees(models.Model):
#     """ """
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     rif = models.CharField(max_length=20)
#     supplier = models.ForeignKey(Supplier, on_delete=models.DO_NOTHING)

#     def __str__(self):
#         return self.first_name + ' ' + self.last_name


# class SupplierPhones(models.Model):
#     """ """
#     phone_number = models.CharField(max_length=13)
#     description = models.CharField(max_length=255)
#     is_Main = models.BooleanField(
#         verbose_name="Flag de Telefono Pricipal del Proveedor")

#     def __str__(self):
#         return self.phone_number


class ExchangeRate(models.Model):
    """ """
    date = models.DateTimeField()
    rate = models.FloatField()

    def __str__(self):
        return self.rate


class PaymentMethod(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


class Currency(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


class PurchaseStatus(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


class PaymentStatus(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


class DeliveryStatus(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.name


class BillClientSubmission(models.Model):
    """ """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING
    )
    bill_name_receiver = models.CharField(max_length=255, blank=False)
    product_requirements = models.TextField(blank=False)
    submission_date = models.DateTimeField(default=timezone.now)
    handling_date = models.DateTimeField(blank=True, null=True)
    has_been_handled = models.BooleanField(default=False)

    def __str__(self):
        return self.bill_name_receiver


class PurchaseBill(models.Model):
    """ """
    purchase_order_date = models.DateTimeField(default=timezone.now)
    purchase_payment_date = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        related_name='user_object_creator'
    )
    employee_in_charge = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        related_name='user_in_charge'
    )
    bill_client_submission = models.ForeignKey(
        BillClientSubmission,
        verbose_name="Solicitud del Cliente",
        blank=False,
        null=False,
        on_delete=models.DO_NOTHING
    )
    payment_method = models.ForeignKey(
        PaymentMethod,
        verbose_name="Método de Pago",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True
    )
    currency = models.ForeignKey(
        Currency, verbose_name="Moneda",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True
    )
    bank = models.ForeignKey(
        Bank, verbose_name="Banco",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True
    )
    purchase_status = models.ForeignKey(
        PurchaseStatus,
        verbose_name="Estado de la Compra",
        on_delete=models.DO_NOTHING
    )
    payment_status = models.ForeignKey(
        PaymentStatus,
        verbose_name="Estado del Pago",
        on_delete=models.DO_NOTHING
    )
    delivery_status = models.ForeignKey(
        DeliveryStatus,
        verbose_name="Estado del Despacho",
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.purchase_status) + ' - ' + str(self.user.name) + ' (Nº: ' + str(self.id) + ') Status Pago: ' + str(self.payment_status)


class BillDetail(models.Model):
    """ """
    purchase_bill = models.ForeignKey(
        PurchaseBill,
        verbose_name="Factura de la Compra",
        on_delete=models.DO_NOTHING
    )
    product = models.ForeignKey(SupplierProducts, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.purchase_bill) + ' - ' + str(self.product) + '(' + str(self.quantity) + ')'

# [BillDetail_ID] = 1;
# [Product_ID] = 13;
# [Quantity] = 30


class BillProductCharacteristics(models.Model):
    """ """
    bill_detail = models.ForeignKey(
        BillDetail, on_delete=models.DO_NOTHING)
    characteristic_sel = models.ManyToManyField(
        ProductCharacteristics
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.bill_detail.id) + ' - ' + str(self.bill_detail.product) + str(self.characteristic_sel.name)
        # return self.characteristic_sel

# [Characteristic_ID] = 14 // Especial - Con Talco - True
# [BillDetail] = 1 // Guante de Nitrilo - Se compró 50 de ellos

# [Characteristic_ID] = 31 // Color - Negro - #000000
# [BillDetail] = 1 // Guante de Nitrilo - Se compró 50 de ellos

# [Characteristic_ID] = 10 // Talla - M - 5
# [BillDetail] = 1 // Guante de Nitrilo - Se compró 50 de ellos

# [Characteristic_ID] = 6 // Tpo_Presentación - Bulto - 100
# [BillDetail] = 1 // Guante de Nitrilo - Se compró 50 de ellos


class BillPaymentDetail(models.Model):
    """ """
    purchase_bill = models.ForeignKey(
        PurchaseBill,
        verbose_name="Factura de la Compra",
        on_delete=models.DO_NOTHING
    )
    payment_receipt_number = models.BigIntegerField()
    payment_receipt_image = models.ImageField(
        null=True, upload_to=bill_payment_receipt_image_file_path
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return str(self.purchase_bill) + ' - ' + str(self.payment_receipt_number)
