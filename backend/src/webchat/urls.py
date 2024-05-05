from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter

from webchat import views

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.

urlpatterns = [
    path("msg", views.history, name="room"),
]