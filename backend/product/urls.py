from django.urls import path, include
from rest_framework.routers import DefaultRouter

from product import views


router = DefaultRouter()
router.register('products', views.ProductViewSet)
router.register('brands', views.BrandViewSet)
router.register('product-characteristics', views.ProductCharacteristicView)
router.register('characteristic-types', views.CharacteristicTypeView)

app_name = 'product'

urlpatterns = [
    path('', include(router.urls)),
]
