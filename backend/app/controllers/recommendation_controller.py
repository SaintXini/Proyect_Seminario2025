from flask import request, jsonify
from app import db
from app.models.recommendation import Recommendation


class RecommendationController:
    """Controlador de Recomendaciones"""

    @staticmethod
    def get_all():
        """Obtener todas las recomendaciones"""
        try:
            recommendations = Recommendation.query.all()
            return jsonify([r.to_dict() for r in recommendations]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def get_active():
        """Obtener recomendaciones activas"""
        try:
            recommendations = Recommendation.query.filter_by(status='activa').all()
            return jsonify([r.to_dict() for r in recommendations]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def get(recommendation_id):
        """Obtener recomendación por ID"""
        try:
            recommendation = Recommendation.query.get(recommendation_id)
            if not recommendation:
                return jsonify({'error': 'No encontrado'}), 404
            return jsonify(recommendation.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def create():
        """Crear recomendación"""
        try:
            data = request.get_json()
            if not data or not data.get('title') or not data.get('description'):
                return jsonify({'error': 'Datos incompletos'}), 400
            
            recommendation = Recommendation(
                title=data.get('title'),
                description=data.get('description'),
                type=data.get('type', 'sugerencia'),
                priority=data.get('priority', 'media'),
                status=data.get('status', 'activa'),
                category=data.get('category'),
                related_entity=data.get('related_entity'),
                related_id=data.get('related_id'),
                icon=data.get('icon'),
                action_required=data.get('action_required', False)
            )
            db.session.add(recommendation)
            db.session.commit()
            return jsonify(recommendation.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def update(recommendation_id):
        """Actualizar recomendación"""
        try:
            recommendation = Recommendation.query.get(recommendation_id)
            if not recommendation:
                return jsonify({'error': 'No encontrado'}), 404
            
            data = request.get_json()
            if data.get('title'):
                recommendation.title = data['title']
            if data.get('description'):
                recommendation.description = data['description']
            if data.get('type'):
                recommendation.type = data['type']
            if data.get('priority'):
                recommendation.priority = data['priority']
            if data.get('status'):
                recommendation.status = data['status']
            if data.get('category'):
                recommendation.category = data['category']
            if 'action_required' in data:
                recommendation.action_required = data['action_required']
            
            db.session.commit()
            return jsonify(recommendation.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def delete(recommendation_id):
        """Eliminar recomendación"""
        try:
            recommendation = Recommendation.query.get(recommendation_id)
            if not recommendation:
                return jsonify({'error': 'No encontrado'}), 404
            
            db.session.delete(recommendation)
            db.session.commit()
            return jsonify({'message': 'Eliminado correctamente'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
