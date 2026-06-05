from flask import request, jsonify
from app.services.client_service import ClientService


class ClientController:
    """Controlador para clientes"""
    
    @staticmethod
    def create():
        """Crear cliente"""
        data = request.get_json()
        return ClientService.create_client(data)
    
    @staticmethod
    def get_all():
        """Obtener todos los clientes"""
        return ClientService.get_all_clients()
    
    @staticmethod
    def get(client_id):
        """Obtener cliente por ID"""
        return ClientService.get_client(client_id)
    
    @staticmethod
    def update(client_id):
        """Actualizar cliente"""
        data = request.get_json()
        return ClientService.update_client(client_id, data)
    
    @staticmethod
    def delete(client_id):
        """Eliminar cliente"""
        return ClientService.delete_client(client_id)
