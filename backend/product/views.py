from django.db.models import query
from django.db.models.query import QuerySet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, IsAdminUser, BasePermission

from core.models import Product, ProductFamily, ProductType, PresentationType
from product import serializers


class IsAdminOrReadOnly(BasePermission):
    """Object-level permission to only allow admin users to edit an object"""

    def has_permission(self, request, view):
        # Read permissions are allowed to any request, therefore GET, HEAD and
        # OPTIONS requests are always allowed.
        if request.method in SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


class BaseProductAttrViewSet(viewsets.GenericViewSet,
                             mixins.ListModelMixin,
                             mixins.CreateModelMixin):
    """Base viewset for user owned product attributes"""
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        assigned_only = bool(
            int(self.requeest.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset

        return queryset.filter(
            user=self.request.user
        ).order_by('-name').distinct()

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)


class ProductFamiliyViewSet(BaseProductAttrViewSet):
    """Manage product families in the database"""
    permission_classes = (IsAdminUser,)
    queryset = ProductFamily.objects.all()
    serializer_class = serializers.ProductFamilySerializer


class ProductTypeViewSet(BaseProductAttrViewSet):
    """Manage product types in the database"""
    queryset = ProductType.objects.all()
    serializer_class = serializers.ProductTypeSerializer


# class ProductPresentationViewSet(BaseProductAttrViewSet):
#     """Manage product presentation in the database"""
#     queryset = .objects.a
