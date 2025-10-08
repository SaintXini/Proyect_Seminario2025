from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from .models import User, Equipment, Event, OccupiedDate
from .serializers import (
    CustomTokenObtainPairSerializer, 
    UserSerializer, 
    EquipmentSerializer, 
    EventSerializer, 
    OccupiedDateSerializer
)

# Vista personalizada para login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Registro de usuarios
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Usuario registrado exitosamente',
            'user_id': user.id,
            'user_type': user.user_type
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Panel de administración - Dashboard
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    if request.user.user_type != 'admin':
        return Response({'error': 'Acceso denegado'}, status=status.HTTP_403_FORBIDDEN)
    
    # Estadísticas del dashboard
    total_clients = User.objects.filter(user_type='client').count()
    total_events = Event.objects.count()
    pending_events = Event.objects.filter(status='pending').count()
    total_equipment = Equipment.objects.count()
    
    return Response({
        'total_clients': total_clients,
        'total_events': total_events,
        'pending_events': pending_events,
        'total_equipment': total_equipment,
    })

# Gestión de clientes (solo admin)
class ClientListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.user_type != 'admin':
            return User.objects.none()
        return User.objects.filter(user_type='client')

# Gestión de equipos
class EquipmentListCreateView(generics.ListCreateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

class EquipmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

# Gestión de eventos
class EventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.user_type == 'admin':
            return Event.objects.all().order_by('-event_date')
        return Event.objects.filter(client=self.request.user).order_by('-event_date')
    
    def perform_create(self, serializer):
        if self.request.user.user_type == 'client':
            serializer.save(client=self.request.user)
        else:
            serializer.save()

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.user_type == 'admin':
            return Event.objects.all()
        return Event.objects.filter(client=self.request.user)

# Gestión de fechas ocupadas (solo admin)
class OccupiedDateListCreateView(generics.ListCreateAPIView):
    queryset = OccupiedDate.objects.all()
    serializer_class = OccupiedDateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return OccupiedDate.objects.all().order_by('date')

class OccupiedDateDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OccupiedDate.objects.all()
    serializer_class = OccupiedDateSerializer
    permission_classes = [IsAuthenticated]

# Vista para obtener fechas ocupadas (pública para el calendario)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_occupied_dates(request):
    occupied_dates = OccupiedDate.objects.values_list('date', flat=True)
    event_dates = Event.objects.filter(status__in=['confirmed', 'pending']).values_list('event_date', flat=True)
    
    all_occupied = list(occupied_dates) + list(event_dates)
    unique_dates = list(set(all_occupied))
    
    return Response({
        'occupied_dates': [str(date) for date in unique_dates]
    })