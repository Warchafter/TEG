from django.urls import path, include
from rest_framework.routers import DefaultRouter

from bill import views


router = DefaultRouter()
router.register('banks', views.BankViewSet)
router.register('payment-methods', views.PaymentMethodViewSet)
router.register('currencies', views.CurrencyViewSet)
router.register('purchase-status', views.PurchaseStatusViewSet)
router.register('payment-status', views.PaymentStatusViewSet)
router.register('delivery-status', views.DeliveryStatusViewSet)
router.register('bill-client-submission', views.BillClientSubmissionViewSet)
router.register('purchase-bills', views.PurchaseBillViewSet)
router.register('bill-details', views.BillDetailViewSet)
router.register('bill-product-characteristics',
                views.BillProductCharacteristicsViewSet)
router.register('bill-payment-details', views.BillPaymentDetailViewSet)

app_name = 'bill'

urlpatterns = [
    path('', include(router.urls)),
]
