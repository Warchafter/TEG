from io import StringIO
from django.core.paginator import Page
from django.db.models import query
from django.db.models.query import QuerySet
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status, generics
import product
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, IsAdminUser, BasePermission
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters

from core.models import Bank, BillClientSubmission, BillDetail, BillPaymentDetail, BillProductCharacteristics, CharacteristicTypes, DeliveryStatus, PaymentMethod, Currency, PurchaseBill, PurchaseStatus, PaymentStatus
from bill import serializers


class IsAdminOrReadOnly(BasePermission):
    """Object-level permission to only allow admin users to edit an object"""

    def has_permission(self, request, view):
        # Read permissions are allowed to any request, therefore GET, HEAD and
        # OPTIONS requests are always allowed.
        if request.method in SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


class IsClientOrReadOnly(BasePermission):
    """Object-level permission to only allow clients or above users to edit an object"""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return request.user.roles == 'user'


class IsAuthenticatedOrReadOnly(BasePermission):
    """Object-level permission to allow al authenticated users to edit an object"""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif request.user.roles == 'user':
            return True

        return request.user.is_staff


class IsStaffOrReadOnly(BasePermission):
    """Object-level permission to only allow staff or above users to edit an object"""

    def has_permission(self, request, view):
        is_admin = super().has_permission(request, view)

        return request.method in SAFE_METHODS or is_admin


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


class SmallResultsSetPagination(PageNumberPagination):
    """Custom smaller pagination class"""
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })


class BankViewSet(BaseProductAttrViewSet):
    """Manage banks in the database"""
    queryset = Bank.objects.all()
    serializer_class = serializers.BankSerializer


class PaymentMethodViewSet(BaseProductAttrViewSet):
    """Manage payment methods in the database"""
    queryset = PaymentMethod.objects.all()
    serializer_class = serializers.PaymentMethodSerializer


class CurrencyViewSet(BaseProductAttrViewSet):
    """Manage currencies in the database"""
    queryset = Currency.objects.all()
    serializer_class = serializers.CurrencySerializer


class PurchaseStatusViewSet(BaseProductAttrViewSet):
    """Manage purchase status in the database"""
    queryset = PurchaseStatus.objects.all()
    serializer_class = serializers.PurchaseStatusSerializer


class PaymentStatusViewSet(BaseProductAttrViewSet):
    """Manage payment status in the database"""
    queryset = PaymentStatus.objects.all()
    serializer_class = serializers.PaymentStatusSerializer


class DeliveryStatusViewSet(BaseProductAttrViewSet):
    """Manage delivery status in the database"""
    queryset = DeliveryStatus.objects.all()
    serializer_class = serializers.DeliveryStatusSerializer


class BillClientSubmissionViewSet(viewsets.ModelViewSet):
    """Manage client bill submissions in the database"""
    serializer_class = serializers.BillClientSubmissionSerializer
    search_fields = ['purchase_order_date', ]
    filter_backends = (filters.SearchFilter,)
    queryset = BillClientSubmission.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the client bill submissions for all users"""
        bill_name_receiver = self.request.query_params.get(
            'bill_name_receiver')
        user = self.request.query_params.get(
            'user'
        )
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if bill_name_receiver:
            queryset = queryset.filter(
                bill_name_receiver__iexact=bill_name_receiver).order_by('id')
        if user:
            user_ids = self._params_to_ints(
                user)
            queryset = queryset.filter(
                user_id__in=user_ids)

        # only admin users can view all objects, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')

    def perform_create(self, serializer):
        """Create a new client bill submission"""
        serializer.save(user=self.request.user)


class PurchaseBillViewSet(viewsets.ModelViewSet):
    """Manage purchase bills in the database"""
    serializer_class = serializers.PurchaseBillSerializer
    search_fields = ['purchase_order_date', ]
    filter_backends = (filters.SearchFilter,)
    queryset = PurchaseBill.objects.all()
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
        """Retrieve the purchase bills for all users"""
        purchase_order_date = self.request.query_params.get(
            'purchase_order_date')
        purchase_payment_date = self.request.query_params.get(
            'purchase_payment_date')
        bill_client_submission = self.request.query_params.get(
            'bill_client_submission'
        )
        payment_method = self.request.query_params.get('payment_method')
        currency = self.request.query_params.get('currency')
        bank = self.request.query_params.get('bank')
        purchase_status = self.request.query_params.get('purchase_status')
        payment_status = self.request.query_params.get('payment_status')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if purchase_order_date:
            queryset = queryset.filter(
                purchase_order_date__iexact=purchase_order_date).order_by('id')
        if purchase_payment_date:
            queryset = queryset.filter(
                purchase_payment_date__iexact=purchase_payment_date).order_by('id')
        if bill_client_submission:
            bill_client_submission_ids = self._params_to_ints(
                bill_client_submission)
            queryset = queryset.filter(
                bill_client_submission_id__in=bill_client_submission_ids)
        if payment_method:
            payment_method_ids = self._params_to_ints(payment_method)
            queryset = queryset.filter(
                payment_method_id__in=payment_method_ids)
        if currency:
            currency_ids = self._params_to_ints(currency)
            queryset = queryset.filter(currency_id__in=currency_ids)
        if bank:
            bank_ids = self._params_to_ints(bank)
            queryset = queryset.filter(bank_id__in=bank_ids)
        if purchase_status:
            purchase_status_ids = self._params_to_ints(purchase_status)
            queryset = queryset.filter(
                purchase_status_id__in=purchase_status_ids)
        if payment_status:
            payment_status_ids = self._params_to_ints(payment_status)
            queryset = queryset.filter(
                payment_status_id__in=payment_status_ids)

        # only admin users can view all objects, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.PurchaseBillDetailSerializer
        if self.action == 'list':
            return serializers.PurchaseBillListSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new purchase bill"""
        serializer.save(user=self.request.user)


class BillDetailViewSet(viewsets.ModelViewSet):
    """Manage bill details in the database"""
    serializer_class = serializers.BillDetailSerializer
    search_fields = ['purchase_bill', ]
    filter_backends = (filters.SearchFilter,)
    queryset = BillDetail.objects.all()
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
        """Retrieve the bill details for all users"""
        purchase_bill = self.request.query_params.get('purchase_bill')
        product = self.request.query_params.get('product')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if purchase_bill:
            purchase_bill_ids = self._params_to_ints(purchase_bill)
            queryset = queryset.filter(
                purchase_bill_id__in=purchase_bill_ids)
        if product:
            product_ids = self._params_to_ints(product)
            queryset = queryset.filter(product_id__in=product_ids)

        # only admin users can view all objects, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.BillDetailDetailSerializer
        if self.action == 'list':
            return serializers.BillDetailListSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new purchase bill"""
        serializer.save(user=self.request.user)


class BillProductCharacteristicsViewSet(viewsets.ModelViewSet):
    """Manage bill details in the database"""
    serializer_class = serializers.BillProductCharacteristicsSerializer
    search_fields = ['bill_detail', ]
    filter_backends = (filters.SearchFilter,)
    queryset = BillProductCharacteristics.objects.all()
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
        """Retrieve the bill details for all users"""
        characteristic_sel = self.request.query_params.get(
            'characteristic_sel')
        bill_detail = self.request.query_params.get('bill_detail')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if characteristic_sel:
            characteristic_sel_ids = self._params_to_ints(characteristic_sel)
            queryset = queryset.filter(
                characteristic_sel_id__in=characteristic_sel_ids)
        if bill_detail:
            bill_detail_ids = self._params_to_ints(bill_detail)
            queryset = queryset.filter(bill_detail_id__in=bill_detail_ids)

        # only admin users can view all objects, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.BillProductCharacteristicsDetailSerializer
        if self.action == 'list':
            return serializers.BillProductCharacteristicsListSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new bill detail"""
        serializer.save(user=self.request.user)


class BillPaymentDetailViewSet(viewsets.ModelViewSet):
    """Manage bill payment details in the database"""
    serializer_class = serializers.BillPaymentDetailSerializer
    search_fields = ['purchase_bill', ]
    filter_backends = (filters.SearchFilter,)
    queryset = BillPaymentDetail.objects.all()
    authentication_classes = (JWTAuthentication,)
    # permission_classes = (IsStaffOrReadOnly,)
    pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the bill details for all users"""
        id = self.request.query_params.get('id')
        purchase_bill = self.request.query_params.get('purchase_bill')
        payment_receipt_number = self.request.query_params.get(
            'payment_receipt_number')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if id:
            id_ids = self._params_to_ints(id)
            queryset = queryset.filter(
                id__in=id_ids
            )
        if purchase_bill:
            purchase_bill_ids = self._params_to_ints(purchase_bill)
            queryset = queryset.filter(
                purchase_bill_id__in=purchase_bill_ids)
        if payment_receipt_number:
            payment_receipt_number_ids = self._params_to_ints(
                payment_receipt_number)
            queryset = queryset.filter(
                payment_receipt_number__in=payment_receipt_number_ids)

        # only admin users can view all objects, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')
        else:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'upload_image':
            return serializers.BillPaymentDetailImageSerializer
        elif self.action == 'retrieve':
            return serializers.BillPaymentDetailDetailSerializer
        elif self.action == 'list':
            return serializers.BillPaymentDetailListSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new bill detail"""
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a bill payment detail
        """
        bill_payment_detail = self.get_object()
        serializer = self.get_serializer(
            bill_payment_detail,
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
