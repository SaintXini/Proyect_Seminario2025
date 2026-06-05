from flask import request, jsonify
from app import db
from app.models.meeting import Meeting
from datetime import datetime


class MeetingController:
    """Controlador de Reuniones"""

    @staticmethod
    def get_all():
        """Obtener todas las reuniones"""
        try:
            meetings = Meeting.query.all()
            return jsonify([m.to_dict() for m in meetings]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def get_by_user(user_id):
        """Obtener reuniones de un usuario"""
        try:
            meetings = Meeting.query.filter(
                (Meeting.client_id == user_id) | (Meeting.admin_id == user_id)
            ).all()
            return jsonify([m.to_dict() for m in meetings]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def get(meeting_id):
        """Obtener reunión por ID"""
        try:
            meeting = Meeting.query.get(meeting_id)
            if not meeting:
                return jsonify({'error': 'No encontrado'}), 404
            return jsonify(meeting.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def create():
        """Crear reunión"""
        try:
            data = request.get_json()
            if not data or not data.get('title') or not data.get('client_id') or not data.get('meeting_date'):
                return jsonify({'error': 'Datos incompletos'}), 400
            
            meeting = Meeting(
                title=data.get('title'),
                description=data.get('description'),
                client_id=data.get('client_id'),
                admin_id=data.get('admin_id'),
                meeting_date=datetime.fromisoformat(data['meeting_date']),
                duration_minutes=data.get('duration_minutes', 60),
                status=data.get('status', 'pendiente'),
                meeting_type=data.get('meeting_type'),
                location=data.get('location'),
                notes=data.get('notes')
            )
            db.session.add(meeting)
            db.session.commit()
            return jsonify(meeting.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def update(meeting_id):
        """Actualizar reunión"""
        try:
            meeting = Meeting.query.get(meeting_id)
            if not meeting:
                return jsonify({'error': 'No encontrado'}), 404
            
            data = request.get_json()
            if data.get('title'):
                meeting.title = data['title']
            if data.get('description'):
                meeting.description = data['description']
            if data.get('meeting_date'):
                meeting.meeting_date = datetime.fromisoformat(data['meeting_date'])
            if data.get('duration_minutes'):
                meeting.duration_minutes = data['duration_minutes']
            if data.get('status'):
                meeting.status = data['status']
            if data.get('meeting_type'):
                meeting.meeting_type = data['meeting_type']
            if data.get('location'):
                meeting.location = data['location']
            if data.get('notes'):
                meeting.notes = data['notes']
            if data.get('admin_id'):
                meeting.admin_id = data['admin_id']
            
            db.session.commit()
            return jsonify(meeting.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def delete(meeting_id):
        """Eliminar reunión"""
        try:
            meeting = Meeting.query.get(meeting_id)
            if not meeting:
                return jsonify({'error': 'No encontrado'}), 404
            
            db.session.delete(meeting)
            db.session.commit()
            return jsonify({'message': 'Eliminado correctamente'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
