from rest_framework import serializers

from core.models import Bank, BillDetail, BillPaymentDetail, BillProductCharacteristics, ProductCharacteristics, PaymentMethod, Currency, PurchaseBill, PurchaseStatus, PaymentStatus, SupplierProducts
from product.serializers import ProductDetailSerializer, ProductCharacteristicSerializer
from supplier.serializers import SupplierProductDetailSerializer, SupplierProductsSerializer


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


class PurchaseBillSerializer(serializers.ModelSerializer):
    """Serializer for purchase bill objects"""

    payment_method = PaymentMethodSerializer
    currency = CurrencySerializer
    bank = BankSerializer
    purchase_status = PurchaseStatusSerializer
    payment_status = PaymentStatusSerializer

    class Meta:
        model = PurchaseBill
        fields = (
            'id', 'purchase_order_date', 'purchase_payment_date',
            'payment_method', 'currency', 'bank', 'purchase_status',
            'payment_status'
        )
        read_only_fields = ('id', 'purchase_order_date')


class PurchaseBillDetailSerializer(PurchaseBillSerializer):
    """Serializer for the purchase bill detail"""

    payment_method = PaymentMethodSerializer(many=False, read_only=True)
    currency = CurrencySerializer(many=False, read_only=True)
    bank = BankSerializer(many=False, read_only=True)
    purchase_status = PurchaseStatusSerializer(many=False, read_only=True)
    payment_status = PaymentStatusSerializer(many=False, read_only=True)


class BillDetailSerializer(serializers.ModelSerializer):
    """Serializer for bill detail objects"""

    purchase_bill = PurchaseBillSerializer
    product = SupplierProductsSerializer

    class Meta:
        model = BillDetail
        fields = ('id', 'purchase_bill', 'product', 'quantity')
        read_only_fields = ('id',)


class BillDetailDetailSerializer(BillDetailSerializer):
    """Serializer for bill detail detail"""

    purchase_bill = PurchaseBillDetailSerializer(many=False, read_only=True)
    product = SupplierProductDetailSerializer(many=False, read_only=True)


class BillProductCharacteristicsSerializer(serializers.ModelSerializer):
    """Serializer for bill product characteristics objects"""

    characteristic_sel = ProductCharacteristicSerializer
    bill_detail = BillDetailSerializer

    class Meta:
        model = BillProductCharacteristics
        fields = ('id', 'characteristic_sel', 'bill_detail')
        read_only_fields = ('id',)


class BillProductCharacteristicsDetailSerializer(BillProductCharacteristicsSerializer):
    """Serializer for bill product characteristics detail"""

    characteristic_sel = ProductCharacteristicSerializer(
        many=False, read_only=True)
    bill_detail = BillDetailDetailSerializer(many=False, read_only=True)


class BillPaymentDetailSerializer(serializers.ModelSerializer):
    """Serializer for bill payment detail objects"""

    purchase_bill = PurchaseBillSerializer

    class Meta:
        model = BillPaymentDetail
        fields = (
            'id', 'purchase_bill', 'payment_receipt_number',
            'payment_receipt_image'
        )
        read_only_fields = ('id',)


class BillPaymentDetailDetailSerializer(BillPaymentDetailSerializer):
    """Serializer for bill payment detail detail"""

    purchase_bill = PurchaseBillDetailSerializer(many=False, read_only=True)


class BillPaymentDetailImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to bill payment detail objects"""

    class Meta:
        model = BillPaymentDetail
        fields = ('id', 'payment_receipt_image')
        read_only_fields = ('id',)
