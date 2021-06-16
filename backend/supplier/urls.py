from django.urls import path, include
from rest_framework.routers import DefaultRouter

from supplier import views


router = DefaultRouter()
router.register('suppliers', views.SupplierViewSet)
router.register('supplier-emails', views.SupplierEmailsViewSet)
router.register('supplier-products', views.SupplierProductsViewSet)

app_name = 'supplier'

urlpatterns = [
    path('', include(router.urls)),
]
