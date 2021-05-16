from rest_framework import serializers

from core.models import PresentationType, ProductType, ProductFamily


class ProductTypeSerializer(serializers.ModelSerializer):
    """Serializer for product family objects"""

    class Meta:
        model = ProductFamily
        fields = ('id', 'name', 'product_family')
        read_only_fields = ('id',)


class ProductFamilySerializer(serializers.ModelSerializer):
    """Serializer for product type objects"""

    class Meta:
        model = ProductType
        fields = ('id', 'name')
        read_only_fields = ('id',)


class ProductPresentationTypeSerializer(serializers.ModelSerializer):
    """Serializer for product type objects"""

    class Meta:
        model = PresentationType
        fields = ('id', 'name')
        read_only_fields = ('id',)
