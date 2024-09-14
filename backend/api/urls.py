from django.urls import path
from . import views

urlpatterns = [
    path("cards/",views.CardListCreate.as_view(), name="card-list"),
    path("cards/<int:pk>/",views.CardDetail.as_view(), name="card-detail"),
]