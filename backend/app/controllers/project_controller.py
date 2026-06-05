from flask import request, jsonify
from app.services.project_service import ProjectService


class ProjectController:
    """Controlador para proyectos"""
    
    @staticmethod
    def create():
        """Crear proyecto"""
        data = request.get_json()
        return ProjectService.create_project(data)
    
    @staticmethod
    def get_all():
        """Obtener todos los proyectos"""
        return ProjectService.get_all_projects()
    
    @staticmethod
    def get(project_id):
        """Obtener proyecto por ID"""
        return ProjectService.get_project(project_id)
    
    @staticmethod
    def update(project_id):
        """Actualizar proyecto"""
        data = request.get_json()
        return ProjectService.update_project(project_id, data)
    
    @staticmethod
    def delete(project_id):
        """Eliminar proyecto"""
        return ProjectService.delete_project(project_id)
    
    @staticmethod
    def get_by_client(client_name):
        """Obtener proyectos de un cliente"""
        return ProjectService.get_projects_by_client(client_name)
