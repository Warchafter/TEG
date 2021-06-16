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

from core.models import CharacteristicTypes, Product, Brand, ProductCharacteristics
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


class JWTAuthenticationSafe(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None


class RifValidated(BasePermission):
    """ """

    def has_permission(self, request, view):
        return request.user.rif_validated


# class PurchaseBillViewSet(viewsets.ModelViewSet):
#     """ """
#     authentication_classes = (JWTAuthentication, )
#     permission_classes = (RifValidated,)
#     search_fields =

#     def get_queryset(self):


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


class BrandViewSet(BaseProductAttrViewSet):
    """Manage brands in the database"""
    queryset = Brand.objects.all()
    serializer_class = serializers.BrandSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """Manage products in the database"""
    serializer_class = serializers.ProductSerializer
    search_fields = ['title', ]
    filter_backends = (filters.SearchFilter,)
    queryset = Product.objects.all()
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
        brand = self.request.query_params.get('brand')
        status = self.request.query_params.get('status')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if brand and status:
            brand_ids = self._params_to_ints(brand)
            queryset = queryset.filter(
                status='publicado',
                brand__is__in=brand_ids
            ).order_by('id')
        elif brand:
            brand_ids = self._params_to_ints(brand)
            queryset = queryset.filter(
                brand__id__in=brand_ids
            ).order_by('id')

        # only admin users can view all products, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('title')
        else:
            if order_by:
                return queryset.filter(
                    status='publicado'
                ).order_by('id')
            else:
                return queryset.order_by('title')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.ProductDetailSerializer
        if self.action == 'upload_image':
            return serializers.ProductImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new product"""
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a product"""
        product = self.get_object()
        serializer = self.get_serializer(
            product,
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


class CharacteristicTypeView(BaseProductAttrViewSet):
    """Manage characteristic types in the database"""
    queryset = CharacteristicTypes.objects.all()
    serializer_class = serializers.CharacteristicTypeSerializer


class ProductCharacteristicView(viewsets.ModelViewSet):
    """Manage product characteristic types in the database"""
    queryset = ProductCharacteristics.objects.all()
    serializer_class = serializers.ProductCharacteristicSerializer
    permission_classes = (IsAdminOrReadOnly,)
    authentication_classes = (JWTAuthenticationSafe,)

    def _params_to_ints(self, qs):  # qs short for querystring
        """Convert a list of string IDs to a list of integers"""
        # The return function below does the following steps:
        # our_string = '1,2,3'
        # our_string_list = ['1', '2', '3']
        # out_integer_list = [1,2,3]
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Function to get all characteristics of a single product"""
        product = self.request.query_params.get('product')
        name = self.request.query_params.get('name')
        value = self.request.query_params.get('value')
        queryset = self.queryset

        if product and name:
            product_ids = self._params_to_ints(product)
            queryset = queryset.filter(product_id__in=product_ids)
            queryset = queryset.filter(name__iexact=name)
        elif product:
            product_ids = self._params_to_ints(product)
            queryset = queryset.filter(product_id__in=product_ids)
        elif name:
            queryset = queryset.filter(
                name__iexact=name)
        elif value:
            queryset = queryset.filter(value__iexact=value)

        return queryset


# class ProductCharacteristicView(BaseProductAttrViewSet):
#     queryset = ProductCharacteristics.objects.all()
#     serializer_class = serializers.ProductCharacteristicSerializer

    # def get_queryset(self):
    #     """
    #     Optionally restricts the returned product characteristics to a given
    #     product, by filtering against a 'product' query parameter in the URL.
    #     """
    #     queryset = ProductCharacteristics.objects.all()
    #     product = self.request.query_params.get('product')
    #     if product:
    #         queryset = queryset.filter(product__product=product)
    #     return queryset
