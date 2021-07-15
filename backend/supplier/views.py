from io import StringIO
from django.core.paginator import Page
from django.db.models import query
from django.db.models.query import QuerySet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status, generics
import product
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, IsAdminUser, BasePermission
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters

from core.models import Supplier, SupplierEmails, SupplierProducts
from supplier import serializers


class IsAdminOrReadOnly(BasePermission):
    """Object-level permission to only allow admin users to edit an object"""

    def has_permission(self, request, view):
        # Read permissions are allowed to any request, therefore GET, HEAD and
        # OPTIONS requests are always allowed.
        if request.method in SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


class JWTAuthenticationSafe(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None


class BaseProductAttrViewSet(viewsets.GenericViewSet,
                             mixins.ListModelMixin,
                             mixins.CreateModelMixin):
    """Base viewset for user owned product attributes"""
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        # assigned_only = bool(
        #     int(self.request.query_params.get('assigned_only', 0))
        # )
        queryset = self.queryset
        # if assigned_only:
        #     queryset = queryset.filter(product__isnull=False)

        return queryset.order_by('-id').distinct()

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)


class StandardResultsSetPagination(PageNumberPagination):
    """Custom standard pagination class"""
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })


class SupplierEmailsViewSet(viewsets.ModelViewSet):
    """Manage supplier emails in the database"""
    serializer_class = serializers.SupplierEmailsSerializer
    search_fields = ['name', ]
    filter_backends = (filters.SearchFilter,)
    queryset = SupplierEmails.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the emails for all suppliers"""
        email = self.request.query_params.get('email')
        supplier = self.request.query_params.get('supplier')
        order_by = self.request.query_params.get('order_by')
        is_Main = self.request.query_params.get('is_Main')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if email and supplier:
            supplier_ids = self._params_to_ints(supplier)
            queryset = queryset.filter(supplier_id__in=supplier_ids)
            queryset = queryset.filter(email__iexact=email)
        elif is_Main and supplier:
            supplier_ids = self._params_to_ints(supplier)
            queryset = queryset.filter(supplier_id__in=supplier_ids)
            queryset = queryset.filter(is_Main__iexact=is_Main)
        elif email:
            queryset = queryset.filter(email__iexact=email)
        elif supplier:
            supplier_ids = self._params_to_ints(supplier)
            queryset = queryset.filter(supplier_id__in=supplier_ids)
        elif is_Main:
            queryset = queryset.filter(is_Main__iexact=is_Main)

        # only admin users can view all suppliers, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('email')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('email')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.SupplierEmailsDetailSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new supplier email"""
        serializer.save(user=self.request.user)


class SupplierViewSet(viewsets.ModelViewSet):
    """Manage suppliers in the database"""
    serializer_class = serializers.SupplierSerializer
    search_fields = ['name', ]
    filter_backends = (filters.SearchFilter,)
    queryset = Supplier.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the products for all users"""
        name = self.request.query_params.get('name')
        rif = self.request.query_params.get('rif')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if name:
            queryset = queryset.filter(name__iexact=name)
        elif rif:
            queryset = queryset.filter(rif__iexact=rif)
        elif order_by:
            queryset = queryset.order_by('id')

        # only admin users can view all suppliers, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('name')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('name')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'upload_image':
            return serializers.SupplierDetailImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new supplier"""
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an the rif image to a supplier"""
        supplier = self.get_object()
        serializer = self.get_serializer(
            supplier,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class SupplierProductsViewSet(viewsets.ModelViewSet):
    """Manage suppliers in the database"""
    serializer_class = serializers.SupplierProductsSerializer
    search_fields = ['name', ]
    filter_backends = (filters.SearchFilter,)
    queryset = SupplierProducts.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the products for all users"""
        product = self.request.query_params.get('product')
        supplier = self.request.query_params.get('supplier')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if product and supplier:
            product_ids = self._params_to_ints(product)
            queryset = queryset.filter(product_id__in=product_ids)
            supplier_ids = self._params_to_ints(supplier)
            queryset = queryset.filter(supplier_id__in=supplier_ids)
        elif product:
            product_ids = self._params_to_ints(product)
            queryset = queryset.filter(product_id__in=product_ids)
        elif supplier:
            supplier_ids = self._params_to_ints(supplier)
            queryset = queryset.filter(supplier_id__in=supplier_ids)
        elif order_by:
            queryset = queryset.order_by('id')

        return queryset

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.SupplierProductDetailSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new supplier"""
        serializer.save(user=self.request.user)
