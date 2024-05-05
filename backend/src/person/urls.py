from person import views
from django.urls import path


urlpatterns = [
    path('api/user', views.user, name='user'),
    path('api/login', views.user_login, name='login'),
]