from app import db
from app.models.project import Project
from datetime import datetime


class ProjectService:
    """Servicio para operaciones de proyecto"""
    
    @staticmethod
    def create_project(data):
        """Crear nuevo proyecto"""
        try:
            new_project = Project(
                name=data.get('name'),
                client=data.get('client'),
                status=data.get('status', 'En progreso'),
                progress=data.get('progress', 0),
                budget=data.get('budget', 0),
                description=data.get('description'),
                start_date=datetime.fromisoformat(data['start_date']) if 'start_date' in data else None,
                end_date=datetime.fromisoformat(data['end_date']) if 'end_date' in data else None
            )
            db.session.add(new_project)
            db.session.commit()
            return {'message': 'Proyecto creado', 'project': new_project.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_projects():
        """Obtener todos los proyectos"""
        try:
            projects = Project.query.all()
            return {'projects': [p.to_dict() for p in projects]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_project(project_id):
        """Obtener proyecto por ID"""
        project = Project.query.get(project_id)
        if not project:
            return {'error': 'Proyecto no encontrado'}, 404
        return {'project': project.to_dict()}, 200
    
    @staticmethod
    def update_project(project_id, data):
        """Actualizar proyecto"""
        project = Project.query.get(project_id)
        if not project:
            return {'error': 'Proyecto no encontrado'}, 404
        
        try:
            project.name = data.get('name', project.name)
            project.client = data.get('client', project.client)
            project.status = data.get('status', project.status)
            project.progress = data.get('progress', project.progress)
            project.budget = data.get('budget', project.budget)
            project.description = data.get('description', project.description)
            
            if 'start_date' in data:
                project.start_date = datetime.fromisoformat(data['start_date']) if data['start_date'] else None
            if 'end_date' in data:
                project.end_date = datetime.fromisoformat(data['end_date']) if data['end_date'] else None
            
            project.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Proyecto actualizado', 'project': project.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_project(project_id):
        """Eliminar proyecto"""
        project = Project.query.get(project_id)
        if not project:
            return {'error': 'Proyecto no encontrado'}, 404
        
        try:
            db.session.delete(project)
            db.session.commit()
            return {'message': 'Proyecto eliminado'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_projects_by_client(client_name):
        """Obtener proyectos de un cliente específico"""
        try:
            projects = Project.query.filter_by(client=client_name).all()
            return {'projects': [p.to_dict() for p in projects]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
