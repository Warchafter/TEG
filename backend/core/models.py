import uuid
import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.db.models.deletion import SET_DEFAULT, SET_NULL
from django.conf import settings


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    business_name = models.CharField("nombre de la empresa", max_length=255)
    business_type_choices = (
        ('Personal', 'Personal'),
        ('Consultorio', 'Consultorio'),
        ('Hospital', 'Hospital'),
        ('Clínica', 'Clínica'),
        ('Distribuidora', 'Distribuidora')
    )
    business_type = models.CharField(
        max_length=255, choices=business_type_choices, default='Personal')
    specialization_chocies = (
        ('Alergología', 'Alergología'),
        ('Anestesiología', 'Anestesiología'),
        ('Cardiología', 'Cardiología'),
        ('Endocrinología', 'Endocrinología'),
        ('Gastroenterología', 'Gastroenterología'),
        ('Medicina', 'Medicina')
    )
    specialization = models.CharField(
        max_length=255, choices=specialization_chocies, default='Medicina')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Brand(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


PRESENTATION_TYPE_OPT = (
    ('P', 'paquete'),
    ('C', 'caja'),
    ('B', 'bulto'),
    ('U', 'unitario')
)


class ProductFamily(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ProductType(models.Model):
    """ """
    name = models.CharField(max_length=255)
    product_family = models.ForeignKey(ProductFamily, default=1,
                                       verbose_name="ID Familia de Producto",
                                       on_delete=models.SET_DEFAULT
                                       )

    def __str__(self):
        return self.name


class PresentationType(models.Model):
    """Model that defines the type of product presentation"""
    name = models.CharField(choices=PRESENTATION_TYPE_OPT, max_length=1)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Product object"""
    name = models.CharField(max_length=255)
    product_type = models.ForeignKey(ProductType, default=1,
                                     verbose_name="ID Tipo de Producto",
                                     on_delete=SET_DEFAULT
                                     )
    presentation_type = models.ForeignKey(PresentationType, default=1,
                                          verbose_name="ID Presentacion",
                                          on_delete=models.SET_DEFAULT
                                          )
    brand = models.ForeignKey(Brand, default=1, verbose_name="Marca",
                              on_delete=models.SET_DEFAULT,
                              )
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class Deparment(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CompanyPhones(models.Model):
    """ """
    phone_number = models.CharField(max_length=15)
    description = models.CharField(max_length=255)
    department = models.ForeignKey(Deparment,
                                   default=1,
                                   verbose_name="ID Departamento",
                                   on_delete=models.SET_DEFAULT
                                   )
    is_Main = models.BooleanField(verbose_name="Flag de Telefono Principal")

    def __str__(self):
        return self.name


class CompanyEmails(models.Model):
    """ """
    email = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    is_Main = models.BooleanField(verbose_name="Flag de Correo Pricipal")

    def __str__(self):
        return self.email


class Bank(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CompanyBankAccounts(models.Model):
    """ """
    account_number = models.CharField(max_length=50)
    bank_type = models.ForeignKey(Bank, default=1,
                                  verbose_name="ID Banco",
                                  on_delete=models.SET_DEFAULT
                                  )
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.account_number


class SupplierBankAccounts(models.Model):
    """ """
    account_number = models.CharField(max_length=50)
    bank_type = models.ForeignKey(Bank, default=1,
                                  verbose_name="ID Banco",
                                  on_delete=models.SET_DEFAULT
                                  )
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.account_number


class Supplier(models.Model):
    """ """
    name = models.CharField(max_length=255)
    rif = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    bank_accounts = models.ForeignKey(
        SupplierBankAccounts, default=1, on_delete=SET_DEFAULT)

    def __str__(self):
        return self.name


class SupplierEmployees(models.Model):
    """ """
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    rif = models.CharField(max_length=20)
    supplier = models.ForeignKey(Supplier, default=1, on_delete=SET_DEFAULT)

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class SupplierPhones(models.Model):
    """ """
    phone_number = models.CharField(max_length=13)
    description = models.CharField(max_length=255)
    is_Main = models.BooleanField(
        verbose_name="Flag de Telefono Pricipal del Proveedor")

    def __str__(self):
        return self.phone_number


class SupplierEmails(models.Model):
    """ """
    email = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    is_Main = models.BooleanField(verbose_name="Flag de Correo Pricipal")

    def __str__(self):
        return self.email


class SupplierProducts(models.Model):
    """ """
    product = models.ForeignKey(Product, verbose_name="ID Producto",
                                on_delete=models.CASCADE
                                )
    supplier = models.ForeignKey(Supplier, verbose_name="ID Proveedor",
                                 on_delete=models.CASCADE
                                 )
    price = models.FloatField(verbose_name="Precio del Producto")
    stock = models.FloatField(
        verbose_name="Cantidad de Productos en Existencia")

    class Meta:
        unique_together = ('product', 'supplier')


class ExchangeRate(models.Model):
    """ """
    date = models.DateTimeField()
    rate = models.FloatField()

    def __str__(self):
        return self.rate


class PaymentMethod(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Currency(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class PurchaseStatus(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class PaymentStatus(models.Model):
    """ """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class PurchaseBill(models.Model):
    """ """
    purchase_order_date = models.DateTimeField()
    purchase_payment_date = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING
    )
    payment_method = models.ForeignKey(PaymentMethod, default=1,
                                       verbose_name="Método de Pago",
                                       on_delete=models.SET_DEFAULT
                                       )
    currency = models.ForeignKey(Currency, default=1, verbose_name="Moneda",
                                 on_delete=models.SET_DEFAULT
                                 )
    bank = models.ForeignKey(Bank, default=1, verbose_name="Banco",
                             on_delete=SET_DEFAULT
                             )
    purchase_status = models.ForeignKey(PurchaseStatus, default=1,
                                        verbose_name="Estado de la Compra",
                                        on_delete=models.SET_DEFAULT
                                        )
    payment_status = models.ForeignKey(PaymentStatus, default=1,
                                       verbose_name="Estado del Pago",
                                       on_delete=models.SET_DEFAULT
                                       )


# class BillDetail(models.Model):
#     """ """
#     purchase_bill = models.ForeignKey(PurchaseBill, default=1,
#                                       verbose_name="Factura de la Compra",
#                                       on_delete=models.CASCADE
#                                       )
#     product = models.ForeignKey(Product, on_delete=)
