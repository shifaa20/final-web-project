from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..my_store.views import BookViewSet, UserViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'users', UserViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]