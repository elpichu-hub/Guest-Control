"""guest_registry URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from main import views as main_views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_views.home, name='home'),
    path('guest-log/<int:pk>/', main_views.guest_log, name='guest-log'),
    path('house-residents/<str:unit>/', main_views.house_residents, name='house-residents'),
    path('guest-list-for-house/<str:unit>/', main_views.guest_list_for_house, name='guest-list-for-house'),

    path('react',  TemplateView.as_view(template_name='index.html'), name='react'),
    
    path('react/list/house/', main_views.HouseListAPIView.as_view(), name='react-list-house'),
    path('react/list/resident/', main_views.ResidentListAPIView.as_view(), name='react-list-resident'),
    path('react/list/guest/', main_views.GuestListAPIView.as_view(), name='react-list-guest'),
    path('react/create/guestlog/', main_views.GuestLogAPICreateView.as_view(), name='create-guestlog'),
    path('react/list/guestlog/', main_views.GuestLogAPIListView.as_view(), name='react-list-guestlog'),
 
]
