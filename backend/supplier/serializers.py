from rest_framework import serializers

from core.models import Supplier, SupplierEmails, SupplierProducts
from product.serializers import BrandSerializer, ProductSerializer, ProductDetailSerializer


# class SupplierBankAccountsSerializer(serializers.ModelSerializer):
#
#     """Serializer for supplier type objects"""

#     class Meta:
#         model = SupplierBankAccounts
#         fields = ('id', 'account_number', 'bank_type', 'description')
#         read_only_fields = ('id',)

# class SupplierEmployeesSerializer(serializers.ModelSerializer):
#     """Serializer for supplier employees objects"""

#     class Meta:
#         model = SupplierEmployees
#         fields = ('id',)
#         read_only_fields = ('id', 'first_name', 'last_name', 'rif', 'supplier')


# class SupplierPhonesSerializer(serializers.ModelSerializer):
#     """Serializer for supplier phones objects"""

#     class Meta:
#         model = SupplierPhones
#         fields = ('id', 'phone_number', 'description', 'is_Main')
#         read_only_fields = ('id',)


class SupplierSerializer(serializers.ModelSerializer):
    """Serializer for supplier objects"""

    class Meta:
        model = Supplier
        fields = ('id', 'name', 'rif', 'image', 'address')
        read_only_fields = ('id',)


class SupplierDetailSerializer(SupplierSerializer):
    """Serializer a supplier detail"""


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading rif images to suppliers"""

    class Meta:
        model = Supplier
        fields = ('id', 'image')
        read_only_fields = ('id',)


class SupplierEmailsSerializer(serializers.ModelSerializer):
    """Serializer for supplier emails objects"""
    supplier = SupplierSerializer

    class Meta:
        model = SupplierEmails
        fields = ('id', 'supplier', 'email', 'description', 'is_Main')
        read_only_fields = ('id',)


class SupplierEmailsDetailSerializer(SupplierEmailsSerializer):
    """Serializer for supplier email detail"""
    supplier = SupplierSerializer(many=False, read_only=True)


class SupplierProductsSerializer(serializers.ModelSerializer):
    """Serializer for supplier products objects"""

    class Meta:
        model = SupplierProducts
        fields = ('id', 'product', 'supplier', 'price', 'stock')
        read_only_fields = ('id',)


class SupplierProductDetailSerializer(SupplierProductsSerializer):
    """Serializer for supplier product detail"""
    product = ProductDetailSerializer(many=False, read_only=True)
    supplier = SupplierSerializer(many=False, read_only=True)
