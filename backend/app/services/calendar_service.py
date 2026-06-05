from app import db
from app.models.calendar_event import CalendarEvent
from datetime import datetime


class CalendarService:
    """Servicio para operaciones de calendario"""
    
    @staticmethod
    def create_event(data):
        """Crear evento de calendario"""
        try:
            new_event = CalendarEvent(
                title=data.get('title'),
                date=data.get('date'),
                month=data.get('month', datetime.now().month),
                year=data.get('year', datetime.now().year),
                event_type=data.get('type', 'production'),
                calendar_type=data.get('calendar_type', 'clients'),
                client=data.get('client'),
                description=data.get('description')
            )
            db.session.add(new_event)
            db.session.commit()
            return {'message': 'Evento creado', 'event': new_event.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_events(calendar_type=None, month=None, year=None):
        """Obtener eventos de calendario"""
        try:
            query = CalendarEvent.query
            
            if calendar_type:
                query = query.filter_by(calendar_type=calendar_type)
            if month:
                query = query.filter_by(month=month)
            if year:
                query = query.filter_by(year=year)
            
            events = query.all()
            return [e.to_dict() for e in events], 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_event(event_id):
        """Obtener evento por ID"""
        event = CalendarEvent.query.get(event_id)
        if not event:
            return {'error': 'Evento no encontrado'}, 404
        return {'event': event.to_dict()}, 200
    
    @staticmethod
    def update_event(event_id, data):
        """Actualizar evento"""
        event = CalendarEvent.query.get(event_id)
        if not event:
            return {'error': 'Evento no encontrado'}, 404
        
        try:
            event.title = data.get('title', event.title)
            event.date = data.get('date', event.date)
            event.month = data.get('month', event.month)
            event.year = data.get('year', event.year)
            event.event_type = data.get('type', event.event_type)
            event.calendar_type = data.get('calendar_type', event.calendar_type)
            event.client = data.get('client', event.client)
            event.description = data.get('description', event.description)
            
            event.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Evento actualizado', 'event': event.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_event(event_id):
        """Eliminar evento"""
        event = CalendarEvent.query.get(event_id)
        if not event:
            return {'error': 'Evento no encontrado'}, 404
        
        try:
            db.session.delete(event)
            db.session.commit()
            return {'message': 'Evento eliminado'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
