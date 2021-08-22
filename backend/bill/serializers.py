from rest_framework import serializers

from core.models import Bank, BillClientSubmission, BillDetail, BillPaymentDetail, BillProductCharacteristics, ProductCharacteristics, PaymentMethod, Currency, PurchaseBill, PurchaseStatus, PaymentStatus, DeliveryStatus, SupplierProducts
from product.serializers import ProductDetailSerializer, ProductCharacteristicSerializer, ProductCharacteristicDetailSerializer
from supplier.serializers import SupplierProductDetailSerializer, SupplierProductsSerializer
from user.serializers import CurrentUserSerializer


class BankSerializer(serializers.ModelSerializer):
    """Serializer for bank objects"""

    class Meta:
        model = Bank
        fields = ('id', 'name')
        read_only_fields = ('id',)


class PaymentMethodSerializer(serializers.ModelSerializer):
    """Serializer for methods of payment objects"""

    class Meta:
        model = PaymentMethod
        fields = ('id', 'name')
        read_only_fields = ('id',)


class CurrencySerializer(serializers.ModelSerializer):
    """Serializer for currency objects"""

    class Meta:
        model = Currency
        fields = ('id', 'name')
        read_only_fields = ('id',)


class PurchaseStatusSerializer(serializers.ModelSerializer):
    """Serializer for status of purchases objects"""

    class Meta:
        model = PurchaseStatus
        fields = ('id', 'name')
        read_only_fields = ('id',)


class PaymentStatusSerializer(serializers.ModelSerializer):
    """Serializer for status of payments objects"""

    class Meta:
        model = PaymentStatus
        fields = ('id', 'name')
        read_only_fields = ('id',)


class DeliveryStatusSerializer(serializers.ModelSerializer):
    """Serializer for status of delivery option objects"""

    class Meta:
        model = DeliveryStatus
        fields = ('id', 'name')
        read_only_fields = ('id',)


class BillClientSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for the client bill submission objetcs"""

    class Meta:
        model = BillClientSubmission
        fields = ('id', 'bill_name_receiver', 'product_requirements',
                  'submission_date', 'handling_date', 'has_been_handled')
        read_only_fields = ('id',)


class PurchaseBillSerializer(serializers.ModelSerializer):
    """Serializer for purchase bill objects"""

    class Meta:
        model = PurchaseBill
        fields = (
            'id', 'purchase_order_date', 'purchase_payment_date', 'employee_in_charge', 'bill_client_submission',
            'payment_method', 'currency', 'bank',
            'purchase_status', 'payment_status', 'delivery_status'
        )
        read_only_fields = ('id',)
        ordering = ('id',)


class PurchaseBillListSerializer(PurchaseBillSerializer):
    """Serializer for purchase bill list"""
    payment_method = PaymentMethodSerializer(many=False, read_only=True)
    currency = CurrencySerializer(many=False, read_only=True)
    bank = BankSerializer(many=False, read_only=True)
    purchase_status = PurchaseStatusSerializer(many=False, read_only=True)
    payment_status = PaymentStatusSerializer(many=False, read_only=True)
    delivery_status = DeliveryStatusSerializer(many=False, read_only=True)
    employee_in_charge = CurrentUserSerializer(many=False, read_only=True)
    bill_client_submission = BillClientSubmissionSerializer(
        many=False, read_only=True)


class PurchaseBillDetailSerializer(PurchaseBillSerializer):
    """Serializer for the purchase bill detail"""

    payment_method = PaymentMethodSerializer(many=False, read_only=True)
    currency = CurrencySerializer(many=False, read_only=True)
    bank = BankSerializer(many=False, read_only=True)
    purchase_status = PurchaseStatusSerializer(many=False, read_only=True)
    payment_status = PaymentStatusSerializer(many=False, read_only=True)
    delivery_status = DeliveryStatusSerializer(many=False, read_only=True)
    employee_in_charge = CurrentUserSerializer(many=False, read_only=True)
    bill_client_submission = BillClientSubmissionSerializer(
        many=False, read_only=True)


class BillDetailSerializer(serializers.ModelSerializer):
    """Serializer for bill detail objects"""

    class Meta:
        model = BillDetail
        fields = ('id', 'purchase_bill', 'product', 'quantity', 'price')
        read_only_fields = ('id',)


class BillDetailListSerializer(BillDetailSerializer):

    purchase_bill = PurchaseBillDetailSerializer(many=False, read_only=True)
    product = SupplierProductDetailSerializer(many=False, read_only=True)


class BillDetailDetailSerializer(BillDetailSerializer):
    """Serializer for bill detail detail"""

    purchase_bill = PurchaseBillDetailSerializer(many=False, read_only=True)
    product = SupplierProductDetailSerializer(many=False, read_only=True)


class BillProductCharacteristicsSerializer(serializers.ModelSerializer):
    """Serializer for bill product characteristics objects"""

    class Meta:
        model = BillProductCharacteristics
        fields = ('id', 'characteristic_sel', 'bill_detail')
        read_only_fields = ('id',)


class BillProductCharacteristicsListSerializer(BillProductCharacteristicsSerializer):
    """Serialzier for bill product characteristic list"""

    characteristic_sel = ProductCharacteristicDetailSerializer(
        many=True, read_only=True)
    bill_detail = BillDetailDetailSerializer(many=False, read_only=True)


class BillProductCharacteristicsDetailSerializer(BillProductCharacteristicsSerializer):
    """Serializer for bill product characteristics detail"""

    characteristic_sel = ProductCharacteristicSerializer(
        many=True, read_only=True)
    bill_detail = BillDetailDetailSerializer(many=False, read_only=True)


class BillPaymentDetailSerializer(serializers.ModelSerializer):
    """Serializer for bill payment detail objects"""

    purchase_bill = PurchaseBillSerializer
    user = CurrentUserSerializer(many=False, read_only=True)

    class Meta:
        model = BillPaymentDetail
        fields = (
            'id', 'purchase_bill', 'payment_receipt_number',
            'payment_receipt_image', 'user'
        )
        read_only_fields = ('id', 'payment_receipt_image', 'user')
        ordering = ('id',)


class BillPaymentDetailListSerializer(BillPaymentDetailSerializer):
    """Serializer for bill payment detail list"""

    purchase_bill = PurchaseBillDetailSerializer(many=False, read_only=True)


class BillPaymentDetailDetailSerializer(BillPaymentDetailSerializer):
    """Serializer for bill payment detail detail"""

    purchase_bill = PurchaseBillDetailSerializer(many=False, read_only=True)


class BillPaymentDetailImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to bill payment detail objects"""

    class Meta:
        model = BillPaymentDetail
        fields = ('id', 'payment_receipt_image')
        read_only_fields = ('id',)
