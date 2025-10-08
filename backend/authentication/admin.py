# authentication/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.db.models import Count, Sum
from .models import User, Equipment, Event, OccupiedDate

# Configuración global del admin
admin.site.site_header = "🎬 SISTEMA DE EVENTOS"
admin.site.site_title = "Panel de Control"
admin.site.index_title = "Dashboard Principal - Gestión de Eventos"

# ADMIN DE USUARIOS - DISEÑO INTUITIVO
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = [
        'avatar_display', 'username', 'full_name_display', 
        'email', 'user_type_badge', 'contact_info', 
        'status_display', 'joined_date'
    ]
    list_filter = [
        ('user_type', admin.ChoicesFieldListFilter),
        ('is_active', admin.BooleanFieldListFilter), 
        ('is_staff', admin.BooleanFieldListFilter),
        ('date_joined', admin.DateFieldListFilter),
    ]
    search_fields = ['username', 'first_name', 'last_name', 'email', 'phone']
    list_per_page = 20
    
    # Organización intuitiva de campos
    fieldsets = (
        ('👤 INFORMACIÓN PERSONAL', {
            'fields': ('username', ('first_name', 'last_name'), 'email'),
            'classes': ('wide',)
        }),
        ('📱 CONTACTO', {
            'fields': ('phone', 'address'),
            'classes': ('wide',)
        }),
        ('🔐 ACCESO Y PERMISOS', {
            'fields': ('password', 'user_type', ('is_active', 'is_staff', 'is_superuser')),
            'classes': ('wide',)
        }),
        ('👥 GRUPOS Y PERMISOS', {
            'fields': ('groups', 'user_permissions'),
            'classes': ('collapse',)
        }),
        ('📅 FECHAS IMPORTANTES', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',)
        }),
    )
    
    # Campos al crear usuario
    add_fieldsets = (
        ('✨ CREAR NUEVO USUARIO', {
            'fields': (
                'username', 
                ('first_name', 'last_name'),
                'email', 'phone', 
                'password1', 'password2',
                'user_type'
            ),
            'classes': ('wide',)
        }),
    )
    
    # Métodos para mostrar datos de forma atractiva
    def avatar_display(self, obj):
        if obj.user_type == 'admin':
            return format_html('👑')
        return format_html('👤')
    avatar_display.short_description = ''
    
    def full_name_display(self, obj):
        name = obj.get_full_name() or obj.username
        return format_html(
            '<strong style="color: #2c3e50;">{}</strong>',
            name
        )
    full_name_display.short_description = 'Nombre Completo'
    
    def user_type_badge(self, obj):
        if obj.user_type == 'admin':
            return format_html(
                '<span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 15px; font-size: 11px; font-weight: bold;">👑 ADMINISTRADOR</span>'
            )
        else:
            return format_html(
                '<span style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 4px 12px; border-radius: 15px; font-size: 11px; font-weight: bold;">👤 CLIENTE</span>'
            )
    user_type_badge.short_description = 'Tipo de Usuario'
    
    def contact_info(self, obj):
        if obj.phone:
            return format_html(
                '📞 <a href="tel:{}" style="color: #27ae60; text-decoration: none;">{}</a>',
                obj.phone, obj.phone
            )
        return format_html('<span style="color: #bdc3c7;">Sin teléfono</span>')
    contact_info.short_description = 'Teléfono'
    
    def status_display(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #27ae60; font-weight: bold;">🟢 ACTIVO</span>')
        return format_html('<span style="color: #e74c3c; font-weight: bold;">🔴 INACTIVO</span>')
    status_display.short_description = 'Estado'
    
    def joined_date(self, obj):
        return format_html(
            '<span style="color: #7f8c8d; font-size: 12px;">📅 {}</span>',
            obj.date_joined.strftime('%d/%m/%Y')
        )
    joined_date.short_description = 'Fecha de Registro'

# ADMIN DE EQUIPOS - MÁS VISUAL
@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = [
        'equipment_icon', 'name', 'category_display', 
        'available', 'price_per_day', 'quantity_available', 'actions_column'
    ]
    list_filter = [
        ('category', admin.ChoicesFieldListFilter),
        ('available', admin.BooleanFieldListFilter),
        ('created_at', admin.DateFieldListFilter),
    ]
    search_fields = ['name', 'description']
    list_editable = ['available', 'price_per_day', 'quantity_available']
    list_per_page = 25
    
    # Organización clara de campos
    fieldsets = (
        ('🎬 INFORMACIÓN DEL EQUIPO', {
            'fields': ('name', 'category', 'description'),
            'classes': ('wide',)
        }),
        ('💰 PRECIO Y DISPONIBILIDAD', {
            'fields': (('price_per_day', 'quantity_available'), 'available'),
            'classes': ('wide',)
        }),
    )
    
    # Métodos visuales
    def equipment_icon(self, obj):
        icons = {
            'audio': '🎵',
            'video': '📹',
            'lighting': '💡',
            'staging': '🎪',
            'other': '📦'
        }
        return format_html('<span style="font-size: 18px;">{}</span>', 
                          icons.get(obj.category, '📦'))
    equipment_icon.short_description = ''
    
    def category_display(self, obj):
        colors = {
            'audio': '#e74c3c',
            'video': '#3498db',
            'lighting': '#f39c12',
            'staging': '#2ecc71',
            'other': '#9b59b6'
        }
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">{}</span>',
            colors.get(obj.category, '#95a5a6'),
            obj.get_category_display().upper()
        )
    category_display.short_description = 'Categoría'
    
    def price_display_info(self, obj):
        return format_html(
            '<strong style="color: #27ae60; font-size: 14px;">Q{}</strong>',
            obj.price_per_day
        )
    price_display_info.short_description = 'Precio Info'
    
    def stock_info_display(self, obj):
        return format_html(
            '<span style="background: #95a5a6; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px;">📦 {} unidades</span>',
            obj.quantity_available
        )
    stock_info_display.short_description = 'Stock Info'
    
    def actions_column(self, obj):
        return format_html(
            '<a href="{}" style="background: #3498db; color: white; padding: 4px 8px; border-radius: 8px; text-decoration: none; font-size: 11px;">✏️ Editar</a>',
            reverse('admin:authentication_equipment_change', args=[obj.pk])
        )
    actions_column.short_description = 'Acciones'

# ADMIN DE EVENTOS - DASHBOARD STYLE
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        'event_icon', 'title', 'client_info', 'date_display', 
        'time_range', 'status_badge', 'revenue_display', 'equipment_summary'
    ]
    list_filter = [
        ('status', admin.ChoicesFieldListFilter),
        ('event_date', admin.DateFieldListFilter),
        ('created_at', admin.DateFieldListFilter),
    ]
    search_fields = ['title', 'client__username', 'client__first_name', 'location']
    date_hierarchy = 'event_date'
    list_per_page = 20
    
    # Organización intuitiva
    fieldsets = (
        ('🎊 DETALLES DEL EVENTO', {
            'fields': ('title', 'client', 'description', 'location'),
            'classes': ('wide',)
        }),
        ('📅 PROGRAMACIÓN', {
            'fields': (('event_date', 'start_time', 'end_time'),),
            'classes': ('wide',)
        }),
        ('🎬 EQUIPOS Y ESTADO', {
            'fields': ('equipment', ('status', 'total_price')),
            'classes': ('wide',)
        }),
        ('📝 INFORMACIÓN ADICIONAL', {
            'fields': ('notes',),
            'classes': ('collapse', 'wide')
        }),
    )
    
    filter_horizontal = ['equipment']
    
    # Métodos visuales
    def event_icon(self, obj):
        icons = {
            'pending': '⏳',
            'confirmed': '✅',
            'in_progress': '🔄',
            'completed': '🎉',
            'cancelled': '❌'
        }
        return format_html(
            '<span style="font-size: 18px;">{}</span>',
            icons.get(obj.status, '📅')
        )
    event_icon.short_description = ''
    
    def client_info(self, obj):
        url = reverse('admin:authentication_user_change', args=[obj.client.pk])
        name = obj.client.get_full_name() or obj.client.username
        return format_html(
            '<a href="{}" style="color: #3498db; text-decoration: none; font-weight: bold;">👤 {}</a><br><small style="color: #7f8c8d;">📧 {}</small>',
            url, name, obj.client.email or 'Sin email'
        )
    client_info.short_description = 'Cliente'
    
    def date_display(self, obj):
        return format_html(
            '<strong style="color: #2c3e50;">📅 {}</strong>',
            obj.event_date.strftime('%d/%m/%Y')
        )
    date_display.short_description = 'Fecha'
    
    def time_range(self, obj):
        return format_html(
            '<span style="background: #ecf0f1; padding: 2px 8px; border-radius: 8px; font-size: 12px; color: #2c3e50;">🕐 {} - {}</span>',
            obj.start_time.strftime('%H:%M'),
            obj.end_time.strftime('%H:%M')
        )
    time_range.short_description = 'Horario'
    
    def status_badge(self, obj):
        colors = {
            'pending': '#f39c12',
            'confirmed': '#27ae60',
            'in_progress': '#3498db',
            'completed': '#9b59b6',
            'cancelled': '#e74c3c'
        }
        icons = {
            'pending': '⏳ PENDIENTE',
            'confirmed': '✅ CONFIRMADO',
            'in_progress': '🔄 EN PROGRESO',
            'completed': '🎉 COMPLETADO',
            'cancelled': '❌ CANCELADO'
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">{}</span>',
            colors.get(obj.status, '#95a5a6'),
            icons.get(obj.status, obj.get_status_display().upper())
        )
    status_badge.short_description = 'Estado'
    
    def revenue_display(self, obj):
        return format_html(
            '<strong style="color: #27ae60; font-size: 16px;">💰 Q{}</strong>',
            obj.total_price
        )
    revenue_display.short_description = 'Ingresos'
    
    def equipment_summary(self, obj):
        count = obj.equipment.count()
        if count > 0:
            return format_html(
                '<span style="background: #34495e; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px;">🎬 {} equipos</span>',
                count
            )
        return format_html('<span style="color: #bdc3c7;">Sin equipos</span>')
    equipment_summary.short_description = 'Equipos'

# ADMIN DE FECHAS OCUPADAS
@admin.register(OccupiedDate)
class OccupiedDateAdmin(admin.ModelAdmin):
    list_display = ['date_icon', 'date_display', 'reason', 'duration_type', 'admin_who_blocked']
    list_filter = [
        ('all_day', admin.BooleanFieldListFilter),
        ('date', admin.DateFieldListFilter),
    ]
    search_fields = ['reason', 'created_by__username']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('🚫 BLOQUEO DE FECHA', {
            'fields': ('date', 'reason', 'created_by'),
            'classes': ('wide',)
        }),
        ('⏰ CONFIGURACIÓN DE HORARIO', {
            'fields': ('all_day', ('start_time', 'end_time')),
            'classes': ('wide',)
        }),
    )
    
    def date_icon(self, obj):
        return format_html('<span style="font-size: 18px;">🚫</span>')
    date_icon.short_description = ''
    
    def date_display(self, obj):
        return format_html(
            '<strong style="color: #e74c3c;">📅 {}</strong>',
            obj.date.strftime('%d/%m/%Y')
        )
    date_display.short_description = 'Fecha Bloqueada'
    
    def duration_type(self, obj):
        if obj.all_day:
            return format_html(
                '<span style="background: #e74c3c; color: white; padding: 2px 8px; border-radius: 8px; font-size: 10px; font-weight: bold;">🚫 TODO EL DÍA</span>'
            )
        return format_html(
            '<span style="background: #f39c12; color: white; padding: 2px 8px; border-radius: 8px; font-size: 10px; font-weight: bold;">⏰ PARCIAL</span>'
        )
    duration_type.short_description = 'Tipo de Bloqueo'
    
    def admin_who_blocked(self, obj):
        return format_html(
            '<span style="color: #8e44ad; font-weight: bold;">👑 {}</span>',
            obj.created_by.get_full_name() or obj.created_by.username
        )
    admin_who_blocked.short_description = 'Bloqueado por'


# Personalizar títulos y configuraciones adicionales
admin.site.empty_value_display = '(Ninguno)'