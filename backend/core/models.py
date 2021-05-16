from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.conf import settings


class UserManager(BaseUserManager):

    def create_user(self, email, name, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Usuarios deben tener un correo electrónico')
        user = self.model(email=self.normalize_email(
            email), name=name, **extra_fields)
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


SPECIALIZATION_CHOICES = (
    ('Alergología', 'Alergología'),
    ('Anestesiología', 'Anestesiología'),
    ('Cardiología', 'Cardiología'),
    ('Endocrinología', 'Endocrinología'),
    ('Gastroenterología', 'Gastroenterología'),
    ('Medicina', 'Medicina')
)

BUSINESS_TYPE_CHOICES = (
    ('Personal', 'Personal'),
    ('Consultorio', 'Consultorio'),
    ('Hospital', 'Hospital'),
    ('Clínica', 'Clínica'),
    ('Distribuidora', 'Distribuidora')
)


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    # business_name = models.CharField(
    #     "nombre de la empresa", max_length=255, default="")
    # business_type = models.CharField(
    #     max_length=255, choices=BUSINESS_TYPE_CHOICES, default='Personal')
    # specialization = models.CharField(
    #     max_length=255, choices=SPECIALIZATION_CHOICES, default='Medicina')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

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

    def __str__(self):
        return self.name


PRESENTATION_TYPE_OPT = (
    ('P', 'paquete'),
    ('C', 'caja'),
    ('B', 'bulto'),
    ('U', 'unitario')
)


class ProductFamily(models.Model):
    """Product family to be used for a product"""
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class ProductType(models.Model):
    """ """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    product_family = models.ForeignKey(ProductFamily,
                                       verbose_name="ID Tipo de Producto",
                                       on_delete=models.CASCADE
                                       )

    def __str__(self):
        return self.name


class Product(models.Model):
    """Product object"""
    name = models.CharField(max_length=255)
    product_type = models.ForeignKey(ProductType,
                                     verbose_name="ID Tipo de Producto",
                                     on_delete=models.CASCADE
                                     )
    presentation_type = models.CharField(
        max_length=255, choices=PRESENTATION_TYPE_OPT, default='paquete')
    brand = models.ForeignKey(Brand, verbose_name="Marca",
                              on_delete=models.CASCADE,
                              )
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Deparment(models.Model):
    """Department object"""
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CompanyPhones(models.Model):
    """ """
    phone_number = models.CharField(max_length=15)
    description = models.CharField(max_length=255)
    department = models.ForeignKey(Deparment,
                                   verbose_name="ID Departamento",
                                   on_delete=models.CASCADE
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
    bank_type = models.ForeignKey(Bank,
                                  verbose_name="ID Banco",
                                  on_delete=models.CASCADE
                                  )
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.account_number


class SupplierBankAccounts(models.Model):
    """ """
    account_number = models.CharField(max_length=50)
    bank_type = models.ForeignKey(Bank,
                                  verbose_name="ID Banco",
                                  on_delete=models.CASCADE
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
        SupplierBankAccounts, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class SupplierEmployees(models.Model):
    """ """
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    rif = models.CharField(max_length=20)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

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
        on_delete=models.CASCADE
    )
    payment_method = models.ForeignKey(PaymentMethod,
                                       verbose_name="Método de Pago",
                                       on_delete=models.CASCADE
                                       )
    currency = models.ForeignKey(Currency, verbose_name="Moneda",
                                 on_delete=models.CASCADE
                                 )
    bank = models.ForeignKey(Bank, verbose_name="Banco",
                             on_delete=models.CASCADE
                             )
    purchase_status = models.ForeignKey(PurchaseStatus,
                                        verbose_name="Estado de la Compra",
                                        on_delete=models.CASCADE
                                        )
    payment_status = models.ForeignKey(PaymentStatus,
                                       verbose_name="Estado del Pago",
                                       on_delete=models.CASCADE
                                       )


# class BillDetail(models.Model):
#     """ """
#     purchase_bill = models.ForeignKey(PurchaseBill,
#                                       verbose_name="Factura de la Compra",
#                                       on_delete=models.CASCADE
#                                       )
#     product = models.ForeignKey(Product, on_delete=)
