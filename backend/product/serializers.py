from django.db.models.fields.related import ManyToManyField
from rest_framework import serializers

from core.models import CharacteristicTypes, Product, Brand, ProductCharacteristics, CharacteristicTypes


class CharacteristicTypeSerializer(serializers.ModelSerializer):
    """Serializer for characteristic type objects"""

    class Meta:
        model = CharacteristicTypes
        fields = ('id', 'name')
        read_only_fields = ('id',)


class BrandSerializer(serializers.ModelSerializer):
    """Serializer for brand type objects"""

    class Meta:
        model = Brand
        fields = ('id', 'name')
        read_only_fields = ('id',)


class ProductSerializer(serializers.ModelSerializer):
    """Serialize a product"""
    # brand = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=Brand.objects.all()
    # )
    brand = BrandSerializer

    class Meta:
        model = Product
        fields = (
            'id', 'title', 'brand',
            'description', 'product_image', 'status'
        )
        read_only_field = ('id',)


class ProductDetailSerializer(ProductSerializer):
    """Serialize a product detail"""
    brand = BrandSerializer(many=True, read_only=True)


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to products"""

    class Meta:
        model = Product
        fields = ('id', 'image')
        read_only_fields = ('id',)


class ProductCharacteristicSerializer(serializers.ModelSerializer):
    """Serialize a product characteristics"""
    product = serializers.PrimaryKeyRelatedField(
        many=False, read_only=True
    )
    # product = ProductSerializer()
    characteristic_type = CharacteristicTypeSerializer()

    class Meta:
        model = ProductCharacteristics
        fields = (
            'id', 'product', 'characteristic_type', 'name', 'value'
        )
        read_only_fields = ('id',)
