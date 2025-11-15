from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://martin:hLhe9bUCCjR6ybcPJAf6P3falLL0WI4a@dpg-d4bvc7ogjchc73d1j6eg-a.oregon-postgres.render.com/thegreatone_db_u58j'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'tu-clave-secreta-super-segura'

db = SQLAlchemy(app)

# ==================== MODELOS ====================

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    telefono = db.Column(db.String(20))
    company = db.Column(db.String(100))
    rol = db.Column(db.String(20), nullable=False, default='client')  # 'admin' o 'client'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'telefono': self.telefono,
            'company': self.company,
            'rol': self.rol,
            'created_at': self.created_at.isoformat()
        }


class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    client = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), default='En progreso')
    progress = db.Column(db.Integer, default=0)
    budget = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'client': self.client,
            'status': self.status,
            'progress': self.progress,
            'budget': self.budget
        }


class Client(db.Model):
    __tablename__ = 'clients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(100))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    status = db.Column(db.String(20), default='Activo')
    since = db.Column(db.String(20))
    projects_count = db.Column(db.Integer, default=0)
    total_budget = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'contact': self.contact,
            'email': self.email,
            'phone': self.phone,
            'status': self.status,
            'since': self.since,
            'projectsCount': self.projects_count,
            'totalBudget': self.total_budget
        }


class InventoryItem(db.Model):
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Disponible')
    quantity = db.Column(db.Integer, default=1)
    borrower = db.Column(db.String(100))
    last_maintenance = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'status': self.status,
            'quantity': self.quantity,
            'borrower': self.borrower,
            'lastMaintenance': self.last_maintenance
        }


class Investment(db.Model):
    __tablename__ = 'investments'
    
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(20), default='Media')
    estimated = db.Column(db.Integer, default=0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'item': self.item,
            'priority': self.priority,
            'estimated': self.estimated,
            'notes': self.notes
        }


class CalendarEvent(db.Model):
    __tablename__ = 'calendar_events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.Integer, nullable=False)  # Día del mes (1-31)
    month = db.Column(db.Integer, nullable=False)  # Mes (1-12)
    year = db.Column(db.Integer, nullable=False)  # Año
    type = db.Column(db.String(50), default='production')
    calendar_type = db.Column(db.String(20), nullable=False)  # 'clients' o 'company'
    client = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date,
            'month': self.month,
            'year': self.year,
            'type': self.type,
            'calendar_type': self.calendar_type,
            'client': self.client
        }


# ==================== RUTAS DE AUTENTICACIÓN ====================

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Verificar si el usuario ya existe
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'El correo ya está registrado'}), 400
        
        # Crear nuevo usuario
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            name=data.get('name', ''),
            email=data['email'],
            password=hashed_password,
            telefono=data.get('telefono', ''),
            company=data.get('company', ''),
            rol=data.get('rol', 'client')
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'message': 'Usuario registrado exitosamente',
            'user': new_user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({'error': 'Credenciales inválidas'}), 401
        
        return jsonify({
            'message': 'Login exitoso',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE PROYECTOS ====================

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = Project.query.all()
        return jsonify([p.to_dict() for p in projects]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        data = request.get_json()
        new_project = Project(
            name=data['name'],
            client=data['client'],
            status=data.get('status', 'En progreso'),
            progress=data.get('progress', 0),
            budget=data.get('budget', 0)
        )
        
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify(new_project.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/projects/<int:id>', methods=['PUT'])
def update_project(id):
    try:
        project = Project.query.get_or_404(id)
        data = request.get_json()
        
        project.name = data.get('name', project.name)
        project.client = data.get('client', project.client)
        project.status = data.get('status', project.status)
        project.progress = data.get('progress', project.progress)
        project.budget = data.get('budget', project.budget)
        
        db.session.commit()
        return jsonify(project.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    try:
        project = Project.query.get_or_404(id)
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Proyecto eliminado'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE CLIENTES ====================

@app.route('/api/clients', methods=['GET'])
def get_clients():
    try:
        clients = Client.query.all()
        return jsonify([c.to_dict() for c in clients]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/clients', methods=['POST'])
def create_client():
    try:
        data = request.get_json()
        new_client = Client(
            name=data['name'],
            contact=data.get('contact', ''),
            email=data.get('email', ''),
            phone=data.get('phone', ''),
            status=data.get('status', 'Activo'),
            since=data.get('since', ''),
            projects_count=data.get('projectsCount', 0),
            total_budget=data.get('totalBudget', 0)
        )
        
        db.session.add(new_client)
        db.session.commit()
        
        return jsonify(new_client.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/clients/<int:id>', methods=['PUT'])
def update_client(id):
    try:
        client = Client.query.get_or_404(id)
        data = request.get_json()
        
        client.name = data.get('name', client.name)
        client.contact = data.get('contact', client.contact)
        client.email = data.get('email', client.email)
        client.phone = data.get('phone', client.phone)
        client.status = data.get('status', client.status)
        client.since = data.get('since', client.since)
        
        db.session.commit()
        return jsonify(client.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/clients/<int:id>', methods=['DELETE'])
def delete_client(id):
    try:
        client = Client.query.get_or_404(id)
        db.session.delete(client)
        db.session.commit()
        return jsonify({'message': 'Cliente eliminado'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE INVENTARIO ====================

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    try:
        items = InventoryItem.query.all()
        return jsonify([i.to_dict() for i in items]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/inventory', methods=['POST'])
def create_inventory_item():
    try:
        data = request.get_json()
        new_item = InventoryItem(
            name=data['name'],
            category=data.get('category', ''),
            status=data.get('status', 'Disponible'),
            quantity=data.get('quantity', 1),
            borrower=data.get('borrower', ''),
            last_maintenance=data.get('lastMaintenance', '')
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify(new_item.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/inventory/<int:id>', methods=['PUT'])
def update_inventory_item(id):
    try:
        item = InventoryItem.query.get_or_404(id)
        data = request.get_json()
        
        item.name = data.get('name', item.name)
        item.category = data.get('category', item.category)
        item.status = data.get('status', item.status)
        item.quantity = data.get('quantity', item.quantity)
        item.borrower = data.get('borrower', item.borrower)
        item.last_maintenance = data.get('lastMaintenance', item.last_maintenance)
        
        db.session.commit()
        return jsonify(item.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/inventory/<int:id>', methods=['DELETE'])
def delete_inventory_item(id):
    try:
        item = InventoryItem.query.get_or_404(id)
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item eliminado'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE INVERSIONES ====================

@app.route('/api/investments', methods=['GET'])
def get_investments():
    try:
        investments = Investment.query.all()
        return jsonify([i.to_dict() for i in investments]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/investments', methods=['POST'])
def create_investment():
    try:
        data = request.get_json()
        new_investment = Investment(
            item=data['item'],
            priority=data.get('priority', 'Media'),
            estimated=data.get('estimated', 0),
            notes=data.get('notes', '')
        )
        
        db.session.add(new_investment)
        db.session.commit()
        
        return jsonify(new_investment.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/investments/<int:id>', methods=['PUT'])
def update_investment(id):
    try:
        investment = Investment.query.get_or_404(id)
        data = request.get_json()
        
        investment.item = data.get('item', investment.item)
        investment.priority = data.get('priority', investment.priority)
        investment.estimated = data.get('estimated', investment.estimated)
        investment.notes = data.get('notes', investment.notes)
        
        db.session.commit()
        return jsonify(investment.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/investments/<int:id>', methods=['DELETE'])
def delete_investment(id):
    try:
        investment = Investment.query.get_or_404(id)
        db.session.delete(investment)
        db.session.commit()
        return jsonify({'message': 'Inversión eliminada'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE CALENDARIO ====================

@app.route('/api/calendar/events', methods=['GET'])
def get_calendar_events():
    try:
        calendar_type = request.args.get('type', 'clients')
        month = request.args.get('month', type=int)
        year = request.args.get('year', type=int)
        
        query = CalendarEvent.query.filter_by(calendar_type=calendar_type)
        
        if month and year:
            query = query.filter_by(month=month, year=year)
        
        events = query.all()
        return jsonify([e.to_dict() for e in events]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/calendar/events', methods=['POST'])
def create_calendar_event():
    try:
        data = request.get_json()
        new_event = CalendarEvent(
            title=data['title'],
            date=data['date'],
            month=data.get('month', datetime.now().month),
            year=data.get('year', datetime.now().year),
            type=data.get('type', 'production'),
            calendar_type=data.get('calendar_type', 'clients'),
            client=data.get('client', '')
        )
        
        db.session.add(new_event)
        db.session.commit()
        
        return jsonify(new_event.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/calendar/events/<int:id>', methods=['PUT'])
def update_calendar_event(id):
    try:
        event = CalendarEvent.query.get_or_404(id)
        data = request.get_json()
        
        event.title = data.get('title', event.title)
        event.date = data.get('date', event.date)
        event.type = data.get('type', event.type)
        event.client = data.get('client', event.client)
        
        db.session.commit()
        return jsonify(event.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/calendar/events/<int:id>', methods=['DELETE'])
def delete_calendar_event(id):
    try:
        event = CalendarEvent.query.get_or_404(id)
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Evento eliminado'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== INICIALIZACIÓN ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'Backend funcionando correctamente'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)