"""
Script para poblar la base de datos con datos de prueba
Ejecutar con: python seed_data.py
"""

import os
import sys
from datetime import datetime, timedelta
from app import create_app, db
from app.models.user import User
from app.models.project import Project
from app.models.client import Client
from app.models.inventory_item import InventoryItem
from app.models.investment import Investment
from app.models.calendar_event import CalendarEvent
from app.models.notification import Notification


def seed_database():
    """Populate database with initial data"""
    app = create_app(os.getenv('FLASK_ENV', 'development'))
    
    with app.app_context():
        # Clear existing data
        print("🗑️  Limpiando datos existentes...")
        db.drop_all()
        db.create_all()
        
        # ==================== USUARIOS ====================
        print("\n👥 Creando usuarios...")
        
        admin_user = User(
            name='Administrador Principal',
            email='admin@example.com',
            telefono='+34 600 123 456',
            company='Empresa Principal',
            role='admin',
            is_active=True
        )
        admin_user.set_password('admin123')
        
        client_user = User(
            name='Cliente Ejemplo',
            email='cliente@example.com',
            telefono='+34 600 789 012',
            company='Empresa Cliente',
            role='client',
            is_active=True
        )
        client_user.set_password('cliente123')
        
        another_client = User(
            name='Otro Cliente',
            email='otro@example.com',
            telefono='+34 600 345 678',
            company='Otra Empresa',
            role='client',
            is_active=True
        )
        another_client.set_password('otro123')
        
        db.session.add_all([admin_user, client_user, another_client])
        db.session.commit()
        
        print(f"✅ Usuarios creados: admin (admin@example.com), cliente (cliente@example.com)")
        
        # ==================== CLIENTES ====================
        print("\n🏢 Creando clientes...")
        
        clients_data = [
            {
                'name': 'Acme Corporation',
                'contact': 'John Smith',
                'email': 'contact@acme.com',
                'phone': '+34 91 123 4567',
                'status': 'Activo',
                'since': '2023-01',
                'projects_count': 3,
                'total_budget': 50000
            },
            {
                'name': 'TechStart Inc',
                'contact': 'Sarah Johnson',
                'email': 'info@techstart.com',
                'phone': '+34 93 456 7890',
                'status': 'Activo',
                'since': '2023-06',
                'projects_count': 2,
                'total_budget': 35000
            },
            {
                'name': 'Global Solutions',
                'contact': 'Michael Brown',
                'email': 'support@global.com',
                'phone': '+34 88 789 0123',
                'status': 'Activo',
                'since': '2024-01',
                'projects_count': 1,
                'total_budget': 25000
            },
            {
                'name': 'Innovation Labs',
                'contact': 'Emma Davis',
                'email': 'hello@innovationlabs.com',
                'phone': '+34 95 234 5678',
                'status': 'Inactivo',
                'since': '2023-03',
                'projects_count': 0,
                'total_budget': 0
            }
        ]
        
        created_clients = []
        for client_data in clients_data:
            client = Client(**client_data)
            db.session.add(client)
            created_clients.append(client)
        db.session.commit()
        
        print(f"✅ {len(created_clients)} clientes creados")
        
        # ==================== PROYECTOS ====================
        print("\n📹 Creando proyectos...")
        
        projects_data = [
            {
                'name': 'Video de bienvenida',
                'client': created_clients[0].name,
                'status': 'En progreso',
                'progress': 65,
                'budget': 15000,
                'description': 'Video corporativo de bienvenida para empleados nuevos',
                'start_date': datetime.utcnow() - timedelta(days=30),
                'end_date': datetime.utcnow() + timedelta(days=15)
            },
            {
                'name': 'Cobertura evento anual',
                'client': created_clients[0].name,
                'status': 'En edición',
                'progress': 90,
                'budget': 20000,
                'description': 'Grabación y edición del evento anual de la empresa',
                'start_date': datetime.utcnow() - timedelta(days=15),
                'end_date': datetime.utcnow() + timedelta(days=5)
            },
            {
                'name': 'Cápsula informativa Q4',
                'client': created_clients[1].name,
                'status': 'En progreso',
                'progress': 45,
                'budget': 12000,
                'description': 'Serie de cápsulas informativas para Q4',
                'start_date': datetime.utcnow() - timedelta(days=20),
                'end_date': datetime.utcnow() + timedelta(days=20)
            },
            {
                'name': 'Campaña de marketing digital',
                'client': created_clients[1].name,
                'status': 'Completado',
                'progress': 100,
                'budget': 18000,
                'description': 'Contenido multimedia para campaña digital',
                'start_date': datetime.utcnow() - timedelta(days=60),
                'end_date': datetime.utcnow() - timedelta(days=10)
            },
            {
                'name': 'Producción corporativa',
                'client': created_clients[2].name,
                'status': 'En progreso',
                'progress': 30,
                'budget': 25000,
                'description': 'Producción de contenido corporativo completo',
                'start_date': datetime.utcnow() - timedelta(days=10),
                'end_date': datetime.utcnow() + timedelta(days=45)
            }
        ]
        
        created_projects = []
        for project_data in projects_data:
            project = Project(**project_data)
            db.session.add(project)
            created_projects.append(project)
        db.session.commit()
        
        print(f"✅ {len(created_projects)} proyectos creados")
        
        # ==================== INVENTARIO ====================
        print("\n📦 Creando items de inventario...")
        
        inventory_data = [
            {
                'name': 'Sony A6700',
                'category': 'Cámaras',
                'status': 'En uso',
                'quantity': 2,
                'borrower': 'Juan García',
                'last_maintenance': datetime.utcnow() - timedelta(days=15),
                'expected_return': datetime.utcnow() + timedelta(days=3)
            },
            {
                'name': 'Canon EOS R5',
                'category': 'Cámaras',
                'status': 'Disponible',
                'quantity': 1,
                'borrower': None,
                'last_maintenance': datetime.utcnow() - timedelta(days=30),
                'expected_return': None
            },
            {
                'name': 'Lighting Kit Professional',
                'category': 'Iluminación',
                'status': 'Disponible',
                'quantity': 3,
                'borrower': None,
                'last_maintenance': datetime.utcnow() - timedelta(days=20),
                'expected_return': None
            },
            {
                'name': 'Rode Wireless GO II',
                'category': 'Audio',
                'status': 'En uso',
                'quantity': 2,
                'borrower': 'María López',
                'last_maintenance': datetime.utcnow() - timedelta(days=5),
                'expected_return': datetime.utcnow() + timedelta(days=1)
            },
            {
                'name': 'Tripod Heavy Duty',
                'category': 'Accesorios',
                'status': 'Mantenimiento',
                'quantity': 2,
                'borrower': 'Taller',
                'last_maintenance': datetime.utcnow() - timedelta(days=2),
                'expected_return': datetime.utcnow() + timedelta(days=7)
            },
            {
                'name': 'Memory Cards SD 128GB',
                'category': 'Consumibles',
                'status': 'Stock bajo',
                'quantity': 5,
                'borrower': None,
                'last_maintenance': None,
                'expected_return': None
            }
        ]
        
        inventory_items = []
        for item_data in inventory_data:
            item = InventoryItem(**item_data)
            db.session.add(item)
            inventory_items.append(item)
        db.session.commit()
        
        print(f"✅ {len(inventory_items)} items de inventario creados")
        
        # ==================== INVERSIONES ====================
        print("\n💰 Creando solicitudes de inversión...")
        
        investments_data = [
            {
                'item': 'Drone profesional DJI Inspire 3',
                'priority': 'Alta',
                'estimated': 15000,
                'notes': 'Para grabaciones aéreas de eventos corporativos',
                'status': 'Aprobada'
            },
            {
                'item': 'Estudio de postproducción con servidor',
                'priority': 'Alta',
                'estimated': 50000,
                'notes': 'Mejorar capacidad de edición y renderizado',
                'status': 'Pendiente'
            },
            {
                'item': 'Microfonos de condensador studio',
                'priority': 'Media',
                'estimated': 5000,
                'notes': 'Mejorar calidad de audio en grabaciones',
                'status': 'Pendiente'
            },
            {
                'item': 'Lighting led de estudio',
                'priority': 'Media',
                'estimated': 8000,
                'notes': 'Iluminación más eficiente y controlable',
                'status': 'Rechazada'
            },
            {
                'item': 'Backup externo SSD 8TB',
                'priority': 'Baja',
                'estimated': 2000,
                'notes': 'Sistema de backup redundante',
                'status': 'Completada'
            }
        ]
        
        investments = []
        for investment_data in investments_data:
            investment = Investment(**investment_data)
            db.session.add(investment)
            investments.append(investment)
        db.session.commit()
        
        print(f"✅ {len(investments)} solicitudes de inversión creadas")
        
        # ==================== EVENTOS DE CALENDARIO ====================
        print("\n📅 Creando eventos de calendario...")
        
        now = datetime.utcnow()
        
        events_data = [
            {
                'title': 'Reunión de revisión - Acme Corp',
                'date': (now + timedelta(days=3)).day,
                'month': (now + timedelta(days=3)).month,
                'year': (now + timedelta(days=3)).year,
                'event_type': 'meeting',
                'calendar_type': 'clients',
                'client': 'Acme Corporation',
                'description': 'Revisión de progreso del proyecto de video de bienvenida'
            },
            {
                'title': 'Grabación evento anual',
                'date': (now + timedelta(days=5)).day,
                'month': (now + timedelta(days=5)).month,
                'year': (now + timedelta(days=5)).year,
                'event_type': 'recording',
                'calendar_type': 'clients',
                'client': 'Acme Corporation',
                'description': 'Cobertura del evento anual de Acme Corporation'
            },
            {
                'title': 'Entrega de proyecto Q4',
                'date': (now + timedelta(days=7)).day,
                'month': (now + timedelta(days=7)).month,
                'year': (now + timedelta(days=7)).year,
                'event_type': 'deadline',
                'calendar_type': 'clients',
                'client': 'TechStart Inc',
                'description': 'Entrega de cápsulas informativas a TechStart Inc'
            },
            {
                'title': 'Mantenimiento de equipo',
                'date': (now + timedelta(days=2)).day,
                'month': (now + timedelta(days=2)).month,
                'year': (now + timedelta(days=2)).year,
                'event_type': 'maintenance',
                'calendar_type': 'company',
                'description': 'Mantenimiento programado de cámaras y tripodes'
            },
            {
                'title': 'Reunión interna de producción',
                'date': (now + timedelta(days=4)).day,
                'month': (now + timedelta(days=4)).month,
                'year': (now + timedelta(days=4)).year,
                'event_type': 'planning',
                'calendar_type': 'company',
                'description': 'Planning de proyectos para el próximo mes'
            }
        ]
        
        calendar_events = []
        for event_data in events_data:
            event = CalendarEvent(**event_data)
            db.session.add(event)
            calendar_events.append(event)
        db.session.commit()
        
        print(f"✅ {len(calendar_events)} eventos de calendario creados")
        
        # ==================== RESUMEN ====================
        print("\n" + "="*50)
        print("✅ BASE DE DATOS POBLADA EXITOSAMENTE")
        print("="*50)
        print("\n📊 DATOS CREADOS:")
        print(f"   • Usuarios: 3 (1 admin, 2 clientes)")
        print(f"   • Clientes: {len(created_clients)}")
        print(f"   • Proyectos: {len(created_projects)}")
        print(f"   • Items de inventario: {len(inventory_items)}")
        print(f"   • Solicitudes de inversión: {len(investments)}")
        print(f"   • Eventos de calendario: {len(calendar_events)}")
        
        print("\n🔐 CREDENCIALES DE PRUEBA:")
        print("   Admin:")
        print("      Email: admin@example.com")
        print("      Password: admin123")
        print("\n   Cliente:")
        print("      Email: cliente@example.com")
        print("      Password: cliente123")
        
        print("\n" + "="*50)


if __name__ == '__main__':
    seed_database()
