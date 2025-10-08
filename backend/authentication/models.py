from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from decimal import Decimal

class User(AbstractUser):
    USER_TYPES = [
        ('admin', 'Administrador'),
        ('client', 'Cliente'),
    ]
    
    user_type = models.CharField(
        max_length=10, 
        choices=USER_TYPES, 
        default='client',
        verbose_name="Tipo de Usuario"
    )
    phone = models.CharField(
        max_length=15, 
        blank=True, 
        null=True,
        verbose_name="Teléfono"
    )
    address = models.TextField(
        blank=True, 
        null=True,
        verbose_name="Dirección"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        name = self.get_full_name()
        if name:
            return f"{name} ({self.get_user_type_display()})"
        return f"{self.username} ({self.get_user_type_display()})"

class Equipment(models.Model):
    CATEGORY_CHOICES = [
        ('audio', 'Audio'),
        ('video', 'Video'),
        ('lighting', 'Iluminación'),
        ('staging', 'Escenario'),
        ('other', 'Otro'),
    ]
    
    name = models.CharField(
        max_length=100,
        verbose_name="Nombre del Equipo"
    )
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        default='other',
        verbose_name="Categoría"
    )
    description = models.TextField(
        blank=True,
        verbose_name="Descripción"
    )
    available = models.BooleanField(
        default=True,
        verbose_name="Disponible"
    )
    price_per_day = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))],
        verbose_name="Precio por Día"
    )
    quantity_available = models.PositiveIntegerField(
        default=1,
        verbose_name="Cantidad Disponible"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Equipo"
        verbose_name_plural = "Equipos"
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} - {self.get_category_display()}"

class Event(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('confirmed', 'Confirmado'),
        ('in_progress', 'En Progreso'),
        ('completed', 'Completado'),
        ('cancelled', 'Cancelado'),
    ]
    
    client = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'user_type': 'client'},
        related_name='events',
        verbose_name="Cliente"
    )
    title = models.CharField(
        max_length=200,
        verbose_name="Título del Evento"
    )
    description = models.TextField(
        blank=True,
        verbose_name="Descripción"
    )
    event_date = models.DateField(
        verbose_name="Fecha del Evento"
    )
    start_time = models.TimeField(
        verbose_name="Hora de Inicio"
    )
    end_time = models.TimeField(
        verbose_name="Hora de Finalización"
    )
    location = models.CharField(
        max_length=200, 
        blank=True,
        verbose_name="Ubicación"
    )
    equipment = models.ManyToManyField(
        Equipment, 
        blank=True, 
        related_name='events',
        verbose_name="Equipos"
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending',
        verbose_name="Estado"
    )
    total_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))],
        verbose_name="Precio Total"
    )
    notes = models.TextField(
        blank=True,
        verbose_name="Notas Adicionales"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ['-event_date', 'start_time']

    def __str__(self):
        return f"{self.title} - {self.event_date} ({self.get_status_display()})"

class OccupiedDate(models.Model):
    date = models.DateField(
        unique=True,
        verbose_name="Fecha"
    )
    reason = models.CharField(
        max_length=200, 
        default="Fecha ocupada",
        verbose_name="Razón"
    )
    all_day = models.BooleanField(
        default=True,
        verbose_name="Todo el Día"
    )
    start_time = models.TimeField(
        null=True, 
        blank=True,
        verbose_name="Hora de Inicio"
    )
    end_time = models.TimeField(
        null=True, 
        blank=True,
        verbose_name="Hora de Finalización"
    )
    created_by = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'user_type': 'admin'},
        verbose_name="Creado por"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Fecha Ocupada"
        verbose_name_plural = "Fechas Ocupadas"
        ordering = ['date']

    def __str__(self):
        return f"Ocupado: {self.date} - {self.reason}"