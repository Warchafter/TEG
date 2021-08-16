from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from core.models import Specialization, User


class UserCreateSerializer(UserCreateSerializer):
    """Serializer for the users object"""

    class Meta(UserCreateSerializer.Meta):
        model = get_user_model()
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validates and authenticates the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('No se ha podido autenticar con las credenciales proveidas')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs


class SpecializationSerializer(serializers.ModelSerializer):
    """ """
    class Meta:
        model = Specialization
        fields = ('id', 'name')
        read_only_fields = ('id',)


class CurrentUserSerializer(serializers.ModelSerializer):
    """ """
    specialization = SpecializationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'name', 'business_name', 'business_type',
            'specialization', 'rif', 'rif_address', 'rif_validated', 'is_active',
            'is_staff', 'roles'
        )
        read_only_fields = ('id,', 'is_active', 'is_staff')


class CurrentUserRIFImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading rif images to user"""

    class Meta:
        model = User
        fields = ('id', 'rif')
        read_only_fields = ('id',)


class VerifyUserRIFImageSerializer(serializers.ModelSerializer):
    """Serializer for verifying the rif image of a user"""

    class Meta:
        model = User
        fields = ('id', 'rif_validated')
        read_only_fields = ('id',)
