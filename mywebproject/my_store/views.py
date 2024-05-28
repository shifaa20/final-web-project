from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Book, User, Order
from serializers import BookSerializer, UserSerializer, OrderSerializer  

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
