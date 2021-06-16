from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user import views


router = DefaultRouter()
router.register('specializations', views.SpecializationView)

app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.ManageUserView.as_view(), name='me'),
    path('testme/', views.UserDetailViewProtect.as_view(), name='testme'),
    path('', include(router.urls))
]
