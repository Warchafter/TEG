from rest_framework import serializers

from core.models import Supplier, SupplierBankAccounts, SupplierEmails, SupplierEmployees, SupplierPhones, SupplierProducts


class SupplierBankAccountsSerializer(serializers.ModelSerializer):
    """Serializer for supplier type objects"""

    class Meta:
        model = SupplierBankAccounts
        fields = ('id', 'account_number', 'bank_type', 'description')
        read_only_fields = ('id',)

class SupplierEmployeesSerializer(serializers.ModelSerializer):
    """Serializer for supplier employees objects"""

    class Meta:
        model = SupplierEmployees
        fields = ('id',)
        read_only_fields = ('id', 'first_name', 'last_name', 'rif', 'supplier')


class SupplierPhonesSerializer(serializers.ModelSerializer):
    """Serializer for supplier phones objects"""

    class Meta:
        model = SupplierPhones
        fields = ('id', 'phone_number', 'description', 'is_Main')
        read_only_fields = ('id',)


class SupplierEmailsSerializer(serializers.ModelSerializer):
    """Serializer for supplier emails objects"""

    class Meta:
        model = SupplierEmails
        fields = ('id', 'email', 'description', 'is_Main')
        read_only_fields = ('id',)


class SupplierProductsSerializer(serializers.ModelSerializer):
    """Serializer for supplier products objects"""

    class Meta:
        model = SupplierProducts
        fields = ('id', 'product', 'supplier', 'price', 'stock')
        read_only_fields = ('id',)


class SupplierSerializer(serializers.ModelSerializer):
    """Serializer for supplier objects"""

    class Meta:
        model = Supplier
        fields = ('id', 'rif', 'rif_image', 'address', 'bank_accounts')
        read_only_fields = ('id',)