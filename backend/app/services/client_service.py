from app import db
from app.models.client import Client
from datetime import datetime


class ClientService:
    """Servicio para operaciones de cliente"""
    
    @staticmethod
    def create_client(data):
        """Crear nuevo cliente"""
        try:
            existing_client = Client.query.filter_by(email=data.get('email')).first()
            if existing_client:
                return {'error': 'El cliente con este email ya existe'}, 400
            
            new_client = Client(
                name=data.get('name'),
                contact=data.get('contact'),
                email=data.get('email'),
                phone=data.get('phone'),
                status=data.get('status', 'Activo'),
                since=data.get('since'),
                projects_count=data.get('projectsCount', 0),
                total_budget=data.get('totalBudget', 0)
            )
            db.session.add(new_client)
            db.session.commit()
            return {'message': 'Cliente creado', 'client': new_client.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_clients():
        """Obtener todos los clientes"""
        try:
            clients = Client.query.all()
            return {'clients': [c.to_dict() for c in clients]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_client(client_id):
        """Obtener cliente por ID"""
        client = Client.query.get(client_id)
        if not client:
            return {'error': 'Cliente no encontrado'}, 404
        return {'client': client.to_dict()}, 200
    
    @staticmethod
    def update_client(client_id, data):
        """Actualizar cliente"""
        client = Client.query.get(client_id)
        if not client:
            return {'error': 'Cliente no encontrado'}, 404
        
        try:
            client.name = data.get('name', client.name)
            client.contact = data.get('contact', client.contact)
            client.email = data.get('email', client.email)
            client.phone = data.get('phone', client.phone)
            client.status = data.get('status', client.status)
            client.since = data.get('since', client.since)
            client.projects_count = data.get('projectsCount', client.projects_count)
            client.total_budget = data.get('totalBudget', client.total_budget)
            
            client.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Cliente actualizado', 'client': client.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_client(client_id):
        """Eliminar cliente"""
        client = Client.query.get(client_id)
        if not client:
            return {'error': 'Cliente no encontrado'}, 404
        
        try:
            db.session.delete(client)
            db.session.commit()
            return {'message': 'Cliente eliminado'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
