from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Autenticación
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register, name='register'),
    
    # Dashboard admin
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    
    # Clientes
    path('admin/clients/', views.ClientListView.as_view(), name='client_list'),
    
    # Equipos
    path('equipment/', views.EquipmentListCreateView.as_view(), name='equipment_list'),
    path('equipment/<int:pk>/', views.EquipmentDetailView.as_view(), name='equipment_detail'),
    
    # Eventos
    path('events/', views.EventListCreateView.as_view(), name='event_list'),
    path('events/<int:pk>/', views.EventDetailView.as_view(), name='event_detail'),
    
    # Fechas ocupadas
    path('occupied-dates/', views.OccupiedDateListCreateView.as_view(), name='occupied_dates'),
    path('occupied-dates/<int:pk>/', views.OccupiedDateDetailView.as_view(), name='occupied_date_detail'),
    path('calendar/occupied-dates/', views.get_occupied_dates, name='get_occupied_dates'),
]