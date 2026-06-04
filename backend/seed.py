"""Script para poblar la base de datos con datos iniciales"""
import os
import sys
from datetime import datetime, timedelta

# Agregar el directorio actual al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models.user import User
from app.models.project import Project
from app.models.client import Client
from app.models.inventory_item import InventoryItem
from app.models.investment import Investment
from app.models.calendar_event import CalendarEvent
from app.models.notification import Notification
from app.models.finance import Finance
from app.models.meeting import Meeting
from app.models.recommendation import Recommendation


def seed_database():
    """Poblar la base de datos con datos iniciales"""
    
    app = create_app('development')
    
    with app.app_context():
        db.create_all()
        
        # Verificar si ya existen datos
        if User.query.first():
            print("La base de datos ya contiene datos. Limpiando...")
            Notification.query.delete()
            Recommendation.query.delete()
            Meeting.query.delete()
            Finance.query.delete()
            CalendarEvent.query.delete()
            Investment.query.delete()
            InventoryItem.query.delete()
            Project.query.delete()
            Client.query.delete()
            User.query.delete()
            db.session.commit()
        
        print("Iniciando seed de base de datos...")
        
        # Crear usuarios
        print("Creando usuarios...")
        admin_user = User(
            name='Administrador',
            email='admin@example.com',
            telefono='+502 1234-5678',
            company='Mi Empresa',
            role='admin'
        )
        admin_user.set_password('admin123')
        
        client_user = User(
            name='Juan Cliente',
            email='cliente@example.com',
            telefono='+502 9876-5432',
            company='Empresa Cliente',
            role='client'
        )
        client_user.set_password('cliente123')
        
        db.session.add(admin_user)
        db.session.add(client_user)
        db.session.commit()
        
        # Crear clientes
        print("Creando clientes...")
        clients_data = [
            {
                'name': 'Universidad Nacional',
                'contact': 'Dr. Carlos Méndez',
                'email': 'cmendez@uni.edu.gt',
                'phone': '+502 2345-6789',
                'status': 'Activo',
                'since': '2024-01',
                'projects_count': 1,
                'total_budget': 25000
            },
            {
                'name': 'TechCorp',
                'contact': 'Ana Rodríguez',
                'email': 'ana.r@techcorp.com',
                'phone': '+502 3456-7890',
                'status': 'Activo',
                'since': '2024-03',
                'projects_count': 1,
                'total_budget': 15000
            },
            {
                'name': 'Ministerio de Educación',
                'contact': 'Lic. Roberto García',
                'email': 'rgarcia@mineduc.gob.gt',
                'phone': '+502 4567-8901',
                'status': 'Activo',
                'since': '2024-02',
                'projects_count': 1,
                'total_budget': 8000
            }
        ]
        
        for client_data in clients_data:
            client = Client(**client_data)
            db.session.add(client)
        db.session.commit()
        
        # Crear proyectos
        print("Creando proyectos...")
        projects_data = [
            {
                'name': 'Documental Institucional',
                'client': 'Universidad Nacional',
                'status': 'En progreso',
                'progress': 65,
                'budget': 25000,
                'description': 'Documental sobre la historia de la universidad'
            },
            {
                'name': 'Video Corporativo',
                'client': 'TechCorp',
                'status': 'En progreso',
                'progress': 40,
                'budget': 15000,
                'description': 'Video de presentación corporativa'
            },
            {
                'name': 'Cápsula Educativa',
                'client': 'Ministerio de Educación',
                'status': 'Planificación',
                'progress': 20,
                'budget': 8000,
                'description': 'Serie de cápsulas educativas'
            }
        ]
        
        for project_data in projects_data:
            project = Project(**project_data)
            db.session.add(project)
        db.session.commit()
        
        # Crear items de inventario
        print("Creando items de inventario...")
        inventory_data = [
            {
                'name': 'Cámara Sony A7III',
                'category': 'Cámaras',
                'status': 'Disponible',
                'quantity': 1,
                'last_maintenance': datetime.now() - timedelta(days=30)
            },
            {
                'name': 'Kit de Iluminación LED',
                'category': 'Iluminación',
                'status': 'En uso',
                'quantity': 1,
                'borrower': 'Proyecto Documental'
            },
            {
                'name': 'Micrófono Shotgun',
                'category': 'Audio',
                'status': 'Disponible',
                'quantity': 2,
                'last_maintenance': datetime.now() - timedelta(days=15)
            },
            {
                'name': 'Trípode Manfrotto',
                'category': 'Accesorios',
                'status': 'Mantenimiento',
                'quantity': 1,
                'expected_return': datetime.now() + timedelta(days=5)
            }
        ]
        
        for item_data in inventory_data:
            item = InventoryItem(**item_data)
            db.session.add(item)
        db.session.commit()
        
        # Crear inversiones
        print("Creando inversiones...")
        investments_data = [
            {
                'item': 'Sistema de Audio Profesional',
                'priority': 'Alta',
                'estimated': 5000,
                'notes': 'Necesario para mejorar calidad',
                'status': 'Pendiente'
            },
            {
                'item': 'Drone DJI Mini 3 Pro',
                'priority': 'Media',
                'estimated': 3500,
                'notes': 'Para tomas aéreas',
                'status': 'Pendiente'
            },
            {
                'item': 'Estabilizador Gimbal',
                'priority': 'Media',
                'estimated': 1800,
                'notes': 'Reemplazo de equipo antiguo',
                'status': 'Aprobada'
            }
        ]
        
        for inv_data in investments_data:
            investment = Investment(**inv_data)
            db.session.add(investment)
        db.session.commit()
        
        # Crear eventos de calendario
        print("Creando eventos de calendario...")
        now = datetime.now()
        events_data = [
            {
                'title': 'Reunión de revisión',
                'date': 5,
                'month': now.month,
                'year': now.year,
                'event_type': 'meeting',
                'calendar_type': 'clients',
                'client': 'Universidad Nacional',
                'description': 'Reunión de revisión del proyecto'
            },
            {
                'title': 'Grabación Cliente A',
                'date': 8,
                'month': now.month,
                'year': now.year,
                'event_type': 'production',
                'calendar_type': 'clients',
                'client': 'Universidad Nacional'
            },
            {
                'title': 'Mantenimiento Equipos',
                'date': 12,
                'month': now.month,
                'year': now.year,
                'event_type': 'maintenance',
                'calendar_type': 'company',
                'description': 'Mantenimiento preventivo de equipos'
            }
        ]
        
        for event_data in events_data:
            event = CalendarEvent(**event_data)
            db.session.add(event)
        db.session.commit()
        
        # Crear notificaciones
        print("Creando notificaciones...")
        notification = Notification(
            user_id=admin_user.id,
            message='Bienvenido al sistema de gestión',
            notification_type='info',
            is_read=False
        )
        db.session.add(notification)
        db.session.commit()
        
        # Crear datos financieros
        print("Creando registros financieros...")
        now = datetime.now()
        finances_data = [
            {
                'project_id': 1,
                'type': 'ingreso',
                'amount': 25000,
                'description': 'Pago inicial - Universidad Nacional',
                'category': 'servicios',
                'date': now - timedelta(days=30)
            },
            {
                'project_id': 1,
                'type': 'gasto',
                'amount': 5000,
                'description': 'Equipo de grabación',
                'category': 'equipo',
                'date': now - timedelta(days=25)
            },
            {
                'project_id': 1,
                'type': 'gasto',
                'amount': 2000,
                'description': 'Personal técnico',
                'category': 'personal',
                'date': now - timedelta(days=20)
            },
            {
                'project_id': 2,
                'type': 'ingreso',
                'amount': 15000,
                'description': 'Pago inicial - TechCorp',
                'category': 'servicios',
                'date': now - timedelta(days=15)
            },
            {
                'project_id': 2,
                'type': 'gasto',
                'amount': 3000,
                'description': 'Edición y post-producción',
                'category': 'producción',
                'date': now - timedelta(days=10)
            }
        ]
        
        for finance_data in finances_data:
            finance = Finance(**finance_data)
            db.session.add(finance)
        db.session.commit()
        
        # Crear reuniones
        print("Creando reuniones...")
        meetings_data = [
            {
                'title': 'Reunión de Inicio',
                'description': 'Reunión inicial con el cliente para definir requisitos',
                'client_id': client_user.id,
                'admin_id': admin_user.id,
                'meeting_date': now + timedelta(days=2),
                'duration_minutes': 60,
                'status': 'confirmada',
                'meeting_type': 'inicio',
                'location': 'Oficina Central',
                'notes': 'Traer propuestas iniciales'
            },
            {
                'title': 'Reunión de Revisión Avance',
                'description': 'Revisión del avance del proyecto',
                'client_id': client_user.id,
                'admin_id': admin_user.id,
                'meeting_date': now + timedelta(days=8),
                'duration_minutes': 45,
                'status': 'pendiente',
                'meeting_type': 'seguimiento',
                'location': 'Virtual - Zoom'
            },
            {
                'title': 'Reunión de Entrega',
                'description': 'Entrega de productos finales',
                'client_id': client_user.id,
                'admin_id': admin_user.id,
                'meeting_date': now + timedelta(days=15),
                'duration_minutes': 90,
                'status': 'pendiente',
                'meeting_type': 'entrega',
                'location': 'Oficina Central',
                'notes': 'Traer archivos finales en USB y nube'
            }
        ]
        
        for meeting_data in meetings_data:
            meeting = Meeting(**meeting_data)
            db.session.add(meeting)
        db.session.commit()
        
        # Crear recomendaciones
        print("Creando recomendaciones...")
        recommendations_data = [
            {
                'title': 'Actualizar Equipo de Audio',
                'description': 'Se recomienda adquirir un sistema de audio profesional para mejorar la calidad de grabación',
                'type': 'mejora',
                'priority': 'alta',
                'status': 'activa',
                'category': 'equipo',
                'icon': 'mic-2',
                'action_required': True
            },
            {
                'title': 'Realizar Mantenimiento Preventivo',
                'description': 'El equipo de iluminación requiere mantenimiento preventivo para evitar fallos',
                'type': 'advertencia',
                'priority': 'alta',
                'status': 'activa',
                'category': 'operación',
                'icon': 'alert-circle',
                'action_required': True
            },
            {
                'title': 'Optimizar Presupuesto de Personal',
                'description': 'Se sugiere reorganizar la asignación de personal para reducir costos en un 15%',
                'type': 'sugerencia',
                'priority': 'media',
                'status': 'activa',
                'category': 'presupuesto',
                'icon': 'trending-down',
                'action_required': False
            },
            {
                'title': 'Expandir Servicios a Clientes Existentes',
                'description': 'Oportunidad de ofrecer servicios adicionales a clientes actuales',
                'type': 'oportunidad',
                'priority': 'media',
                'status': 'activa',
                'category': 'negocio',
                'icon': 'target',
                'action_required': False
            },
            {
                'title': 'Capacitación en Nuevas Herramientas',
                'description': 'Se recomienda capacitar al equipo en las últimas herramientas de edición',
                'type': 'sugerencia',
                'priority': 'baja',
                'status': 'activa',
                'category': 'personal',
                'icon': 'book',
                'action_required': False
            }
        ]
        
        for rec_data in recommendations_data:
            recommendation = Recommendation(**rec_data)
            db.session.add(recommendation)
        db.session.commit()
        
        print("✓ Seed completado exitosamente!")
        print(f"  - {len(clients_data)} clientes creados")
        print(f"  - {len(projects_data)} proyectos creados")
        print(f"  - {len(inventory_data)} items de inventario creados")
        print(f"  - {len(investments_data)} inversiones creadas")
        print(f"  - {len(events_data)} eventos de calendario creados")
        print(f"  - {len(finances_data)} registros financieros creados")
        print(f"  - {len(meetings_data)} reuniones creadas")
        print(f"  - {len(recommendations_data)} recomendaciones creadas")
        print("\nCredenciales de prueba:")
        print("  Admin:")
        print("    Email: admin@example.com")
        print("    Contraseña: admin123")
        print("  Cliente:")
        print("    Email: cliente@example.com")
        print("    Contraseña: cliente123")


if __name__ == '__main__':
    seed_database()
