from django.urls import path
from . import views

urlpatterns = [
    path("flashcards/",views.CardListCreate.as_view(), name="card-list"),
    path("flashcards/<int:pk>/",views.CardDetail.as_view(), name="card-detail"),
]