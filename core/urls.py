from django.urls import path
from .views import register_view, login_view, logout_view, profile_view, home_view, waitlist_view, classify_device

urlpatterns = [
    path('', home_view, name='home'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('waitlist/', waitlist_view, name='waitlist'),
    path('classify-device/', classify_device, name='classify_device')
]