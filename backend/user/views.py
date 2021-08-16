from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.fields import CurrentUserDefault
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from user.serializers import CurrentUserSerializer, UserCreateSerializer, AuthTokenSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, SAFE_METHODS, IsAdminUser, BasePermission
from core.models import Specialization
from rest_framework import viewsets, mixins, status, generics
from rest_framework.pagination import PageNumberPagination
from core.models import User
from user import serializers
from rest_framework import filters


class IsAdminOrReadOnly(BasePermission):
    """Object-level permission to only allow admin users to edit an object"""

    def has_permission(self, request, view):
        # Read permissions are allowed to any request, therefore GET, HEAD and
        # OPTIONS requests are always allowed.
        if request.method in SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


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


class JWTAuthenticationSafe(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None


class BaseUserAttrViewSet(viewsets.GenericViewSet,
                          mixins.ListModelMixin,
                          mixins.CreateModelMixin):
    """Base viewset for user owned specialization attributes"""
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


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserCreateSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserCreateSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user


class UserDetailViewProtect(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        return self.request.user

    def post(self, request, format=None):
        token_user_email = request.user.email
        token_user_username = request.user.username
        pass


# class SpecializationView(BaseUserAttrViewSet):
#     """ """
#     queryset = Specialization.objects.all()
#     serializer_class = serializers.SpecializationSerializer


class UserViewSet(viewsets.ModelViewSet):
    """Manage purchase bills in the database"""
    serializer_class = serializers.CurrentUserSerializer
    search_fields = ['email', ]
    filter_backends = (filters.SearchFilter,)
    queryset = User.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    # pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the purchase bills for all users"""
        email = self.request.query_params.get(
            'email')
        name = self.request.query_params.get(
            'name')
        # business_name = self.request.query_params.get('business_name')
        # business_type = self.request.query_params.get('business_type')
        # specialization = self.request.query_params.get('specialization')
        # rif = self.request.query_params.get('rif')
        # is_active = self.request.query_params.get('is_active')
        # roles = self.request.query_params.get('roles')
        # order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if email:
            queryset = queryset.filter(
                email__iexact=email)
        if name:
            queryset = queryset.filter(
                name__iexact=name)
        # if business_name:
        #     queryset = queryset.filter(
        #         business_name__iexact=business_name)
        # if payment_method:
        #     payment_method_ids = self._params_to_ints(payment_method)
        #     queryset = queryset.filter(
        #         payment_method_id__in=payment_method_ids)
        # if currency:
        #     currency_ids = self._params_to_ints(currency)
        #     queryset = queryset.filter(currency_id__in=currency_ids)
        # if bank:
        #     bank_ids = self._params_to_ints(bank)
        #     queryset = queryset.filter(bank_id__in=bank_ids)
        # if purchase_status:
        #     purchase_status_ids = self._params_to_ints(purchase_status)
        #     queryset = queryset.filter(
        #         purchase_status_id__in=purchase_status_ids)
        # if payment_status:
        #     payment_status_ids = self._params_to_ints(payment_method)
        #     queryset = queryset.filter(
        #         payment_status_id__in=payment_status_ids)

        # only admin users can view all objects, available or not
        if is_staff:
            return queryset.all().order_by('email')
        else:
            return queryset.all().order_by('name')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.CurrentUserSerializer
        elif self.action == 'list':
            return serializers.UserListSerializer
        elif self.action == 'upload_image':
            return serializers.CurrentUserRIFImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new purchase bill"""
        pass

    @action(methods=['GET'], detail=False, url_path='current')
    def get_current_user(self, request, pk=None):
        serializer = CurrentUserSerializer(request.user)
        print(request.data)
        return Response(serializer.data)

    @action(methods=['POST'], detail=True, url_path='verify-user')
    def verify_rif_image(self, request, pk=None):
        """Verify user RIF image"""
        user = self.get_object()
        serializer = self.get_serializer(
            user,
            date=request.data
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

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a user"""
        user = self.get_object()
        serializer = self.get_serializer(
            user,
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


class SpecializationViewSet(BaseUserAttrViewSet):
    """Manage specializations in the database"""
    queryset = Specialization.objects.all()
    serializer_class = serializers.SpecializationSerializer
