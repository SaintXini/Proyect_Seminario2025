from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import sys
from flask import request, jsonify
from werkzeug.security import generate_password_hash

from models.proyectos import Proyecto
from models.CategoriaPortafolio import CategoriaPortafolio
from datetime import datetime

from models.paquetes import Paquete
from decimal import Decimal

from models.contrataciones import Contratacion
from models.usuarios import Usuario
from models.paquetes import Paquete
from datetime import datetime


from models.eventos import Evento
from datetime import datetime

from models.finanzas import Finanza
from datetime import datetime

from models.contactos import Contacto
from models.citas import Cita



from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
import jwt

import os
from flask_cors import CORS
from flask_bcrypt import Bcrypt


# Clave secreta para firmar JWT, la puedes poner en tu .env
SECRET_KEY = os.getenv('SECRET_KEY', 'tgofilms')



# Asegurar path correcto
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Cargar variables de entorno
load_dotenv()

from models import db
from models.usuarios import Usuario



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Permitir CORS solo para localhost:3000
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
bcrypt = Bcrypt(app)
db.init_app(app)

@app.route('/')
def index():
    return 'Conexión a la base de datos exitosa.'


@app.route('/usuarios')
def get_usuarios():
    usuarios = Usuario.query.all()
    return {"usuarios": [u.nombre for u in usuarios]}

#para agregar login 

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data.get('name')
    correo = data.get('email')
    password = data.get('password')
    telefono=data.get('telefono')

    # Verificar duplicado
    if Usuario.query.filter_by(correo=correo).first():
        return jsonify({'message': 'El correo ya existe'}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')

    nuevo_usuario = Usuario(nombre=nombre, correo=correo,telefono=telefono, password=password)
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado correctamente'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('email')
    password = data.get('password')
    rol=data.get('rol')

    # Buscar usuario en tu base de datos real (SQLAlchemy, etc.)
    user = Usuario.query.filter_by(correo=correo).first()

    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    if not (user.password, password):
        return jsonify({'message': 'Contraseña incorrecta'}), 401

    return jsonify({
        'message': 'Login exitoso',
        'user': {
            'correo': user.correo,
            'password': user.nombre,
            'rol':user.rol
        }
    }), 200


# Crear proyecto
@app.route('/proyectos', methods=['POST'])
def crear_proyecto():
    data = request.get_json()
    try:
        fecha = datetime.strptime(data['fecha'], '%Y-%m-%d').date()
        nuevo_proyecto = Proyecto(
            titulo=data['titulo'],
            descripcion=data.get('descripcion'),
            fecha=fecha,
            id_categoria=data['id_categoria'],
            url_media=data.get('url_media')
        )
        db.session.add(nuevo_proyecto)
        db.session.commit()
        return jsonify({"mensaje": "Proyecto creado", "id": nuevo_proyecto.id_proyecto}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Leer todos los proyectos
@app.route('/proyectos', methods=['GET'])
def obtener_proyectos():
    proyectos = Proyecto.query.all()
    resultado = []
    for p in proyectos:
        resultado.append({
            "id_proyecto": p.id_proyecto,
            "titulo": p.titulo,
            "descripcion": p.descripcion,
            "fecha": p.fecha.strftime('%Y-%m-%d'),
            "id_categoria": p.id_categoria,
            "url_media": p.url_media
        })
    return jsonify(resultado)


# Leer proyecto por ID
@app.route('/proyectos/<int:id>', methods=['GET'])
def obtener_proyecto(id):
    proyecto = Proyecto.query.get_or_404(id)
    resultado = {
        "id_proyecto": proyecto.id_proyecto,
        "titulo": proyecto.titulo,
        "descripcion": proyecto.descripcion,
        "fecha": proyecto.fecha.strftime('%Y-%m-%d'),
        "id_categoria": proyecto.id_categoria,
        "url_media": proyecto.url_media
    }
    return jsonify(resultado)


# Actualizar proyecto
@app.route('/proyectos/<int:id>', methods=['PUT'])
def actualizar_proyecto(id):
    proyecto = Proyecto.query.get_or_404(id)
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se enviaron datos JSON"}), 400

    proyecto.titulo = data.get('titulo', proyecto.titulo)
    proyecto.descripcion = data.get('descripcion', proyecto.descripcion)
    if 'fecha' in data:
        proyecto.fecha = datetime.strptime(data['fecha'], '%Y-%m-%d').date()
    proyecto.id_categoria = data.get('id_categoria', proyecto.id_categoria)
    proyecto.url_media = data.get('url_media', proyecto.url_media)

    db.session.commit()
    return jsonify({"mensaje": "Proyecto actualizado"})


# Eliminar proyecto
@app.route('/proyectos/<int:id>', methods=['DELETE'])
def eliminar_proyecto(id):
    proyecto = Proyecto.query.get_or_404(id)
    db.session.delete(proyecto)
    db.session.commit()
    return jsonify({"mensaje": "Proyecto eliminado"})



# Crear paquete
@app.route('/paquetes', methods=['POST'])
def crear_paquete():
    data = request.get_json()
    try:
        nuevo_paquete = Paquete(
            nombre=data['nombre'],
            descripcion=data.get('descripcion'),
            precio=Decimal(data['precio']),
            duracion=data['duracion'],
            estado=data.get('estado', 'Activo')
        )
        db.session.add(nuevo_paquete)
        db.session.commit()
        return jsonify({"mensaje": "Paquete creado", "id": nuevo_paquete.id_paquete}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Obtener todos los paquetes
@app.route('/paquetes', methods=['GET'])
def obtener_paquetes():
    paquetes = Paquete.query.all()
    resultado = []
    for p in paquetes:
        resultado.append({
            "id_paquete": p.id_paquete,
            "nombre": p.nombre,
            "descripcion": p.descripcion,
            "precio": float(p.precio),
            "duracion": p.duracion,
            "estado": p.estado
        })
    return jsonify(resultado)


# Obtener paquete por ID
@app.route('/paquetes/<int:id>', methods=['GET'])
def obtener_paquete(id):
    paquete = Paquete.query.get_or_404(id)
    resultado = {
        "id_paquete": paquete.id_paquete,
        "nombre": paquete.nombre,
        "descripcion": paquete.descripcion,
        "precio": float(paquete.precio),
        "duracion": paquete.duracion,
        "estado": paquete.estado
    }
    return jsonify(resultado)


# Actualizar paquete
@app.route('/paquetes/<int:id>', methods=['PUT'])
def actualizar_paquete(id):
    paquete = Paquete.query.get_or_404(id)
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se enviaron datos JSON"}), 400

    paquete.nombre = data.get('nombre', paquete.nombre)
    paquete.descripcion = data.get('descripcion', paquete.descripcion)
    if 'precio' in data:
        paquete.precio = Decimal(data['precio'])
    paquete.duracion = data.get('duracion', paquete.duracion)
    paquete.estado = data.get('estado', paquete.estado)

    db.session.commit()
    return jsonify({"mensaje": "Paquete actualizado"})


# Eliminar paquete
@app.route('/paquetes/<int:id>', methods=['DELETE'])
def eliminar_paquete(id):
    paquete = Paquete.query.get_or_404(id)
    db.session.delete(paquete)
    db.session.commit()
    return jsonify({"mensaje": "Paquete eliminado"})


# Crear contratación
@app.route('/contrataciones', methods=['POST'])
def crear_contratacion():
    data = request.get_json()
    try:
        nueva = Contratacion(
            id_usuario=data['id_usuario'],
            id_paquete=data['id_paquete'],
            fecha_contratacion=datetime.strptime(data.get('fecha_contratacion', ''), '%Y-%m-%d').date() if data.get('fecha_contratacion') else None,
            estado=data.get('estado', 'Pendiente')
        )
        if nueva.fecha_contratacion is None:
            nueva.fecha_contratacion = datetime.today().date()

        # Validar que usuario y paquete existan
        if not Usuario.query.get(nueva.id_usuario):
            return jsonify({"error": "Usuario no encontrado"}), 404
        if not Paquete.query.get(nueva.id_paquete):
            return jsonify({"error": "Paquete no encontrado"}), 404

        db.session.add(nueva)
        db.session.commit()
        return jsonify({"mensaje": "Contratación creada", "id": nueva.id_contratacion}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Obtener todas las contrataciones
@app.route('/contrataciones', methods=['GET'])
def obtener_contrataciones():
    contrataciones = Contratacion.query.all()
    resultado = []
    for c in contrataciones:
        resultado.append({
            "id_contratacion": c.id_contratacion,
            "id_usuario": c.id_usuario,
            "usuario_nombre": c.usuario.nombre,
            "id_paquete": c.id_paquete,
            "paquete_nombre": c.paquete.nombre,
            "fecha_contratacion": c.fecha_contratacion.isoformat(),
            "estado": c.estado
        })
    return jsonify(resultado)


# Obtener contratación por ID
@app.route('/contrataciones/<int:id>', methods=['GET'])
def obtener_contratacion(id):
    c = Contratacion.query.get_or_404(id)
    resultado = {
        "id_contratacion": c.id_contratacion,
        "id_usuario": c.id_usuario,
        "usuario_nombre": c.usuario.nombre,
        "id_paquete": c.id_paquete,
        "paquete_nombre": c.paquete.nombre,
        "fecha_contratacion": c.fecha_contratacion.isoformat(),
        "estado": c.estado
    }
    return jsonify(resultado)


# Actualizar contratación
@app.route('/contrataciones/<int:id>', methods=['PUT'])
def actualizar_contratacion(id):
    c = Contratacion.query.get_or_404(id)
    data = request.get_json()
    c.estado = data.get('estado', c.estado)
    # También puedes permitir actualizar otros campos si quieres

    db.session.commit()
    return jsonify({"mensaje": "Contratación actualizada"})


# Eliminar contratación
@app.route('/contrataciones/<int:id>', methods=['DELETE'])
def eliminar_contratacion(id):
    c = Contratacion.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"mensaje": "Contratación eliminada"})


# Crear evento
@app.route('/eventos', methods=['POST'])
def crear_evento():
    data = request.get_json()
    try:
        fecha_inicio = datetime.strptime(data['fecha_inicio'], '%Y-%m-%dT%H:%M:%S')
        fecha_fin = datetime.strptime(data['fecha_fin'], '%Y-%m-%dT%H:%M:%S')

        # Validar que usuario exista
        usuario = Usuario.query.get(data['id_usuario'])
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404

        evento = Evento(
            titulo=data['titulo'],
            descripcion=data.get('descripcion'),
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            ubicacion=data.get('ubicacion'),
            id_usuario=data['id_usuario']
        )
        db.session.add(evento)
        db.session.commit()
        return jsonify({"mensaje": "Evento creado", "id": evento.id_evento}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Obtener todos los eventos
@app.route('/eventos', methods=['GET'])
def obtener_eventos():
    eventos = Evento.query.all()
    resultado = []
    for e in eventos:
        resultado.append({
            "id_evento": e.id_evento,
            "titulo": e.titulo,
            "descripcion": e.descripcion,
            "fecha_inicio": e.fecha_inicio.isoformat(),
            "fecha_fin": e.fecha_fin.isoformat(),
            "ubicacion": e.ubicacion,
            "id_usuario": e.id_usuario,
            "usuario_nombre": e.usuario.nombre
        })
    return jsonify(resultado)

# Obtener evento por ID
@app.route('/eventos/<int:id>', methods=['GET'])
def obtener_evento(id):
    e = Evento.query.get_or_404(id)
    resultado = {
        "id_evento": e.id_evento,
        "titulo": e.titulo,
        "descripcion": e.descripcion,
        "fecha_inicio": e.fecha_inicio.isoformat(),
        "fecha_fin": e.fecha_fin.isoformat(),
        "ubicacion": e.ubicacion,
        "id_usuario": e.id_usuario,
        "usuario_nombre": e.usuario.nombre
    }
    return jsonify(resultado)

# Actualizar evento
@app.route('/eventos/<int:id>', methods=['PUT'])
def actualizar_evento(id):
    e = Evento.query.get_or_404(id)
    data = request.get_json()
    if 'titulo' in data:
        e.titulo = data['titulo']
    if 'descripcion' in data:
        e.descripcion = data['descripcion']
    if 'fecha_inicio' in data:
        e.fecha_inicio = datetime.strptime(data['fecha_inicio'], '%Y-%m-%dT%H:%M:%S')
    if 'fecha_fin' in data:
        e.fecha_fin = datetime.strptime(data['fecha_fin'], '%Y-%m-%dT%H:%M:%S')
    if 'ubicacion' in data:
        e.ubicacion = data['ubicacion']
    if 'id_usuario' in data:

        
        # Verificar si nuevo usuario existe
        usuario = Usuario.query.get(data['id_usuario'])
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404
        e.id_usuario = data['id_usuario']

    db.session.commit()
    return jsonify({"mensaje": "Evento actualizado"})

# Eliminar evento
@app.route('/eventos/<int:id>', methods=['DELETE'])
def eliminar_evento(id):
    e = Evento.query.get_or_404(id)
    db.session.delete(e)
    db.session.commit()
    return jsonify({"mensaje": "Evento eliminado"})

# Crear finanza
@app.route('/api/finanzas', methods=['POST'])
def crear_finanza():
    data = request.get_json()
    try:
        # Validar que la contratacion exista
        contratacion = Contratacion.query.get(data['id_contratacion'])
        if not contratacion:
            return jsonify({"error": "Contratación no encontrada"}), 404

        finanza = Finanza(
            id_contratacion=data['id_contratacion'],
            monto=data['monto'],
            tipo=data['tipo'],
            descripcion=data.get('descripcion'),
            fecha_registro=datetime.strptime(data['fecha_registro'], '%Y-%m-%dT%H:%M:%S') if 'fecha_registro' in data else datetime.utcnow()
        )
        db.session.add(finanza)
        db.session.commit()
        return jsonify({"mensaje": "Finanza creada", "id": finanza.id_finanza}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Obtener todas las finanzas
@app.route('/api/finanzas', methods=['GET'])
def obtener_finanzas():
    finanzas = Finanza.query.all()
    resultado = []
    for f in finanzas:
        resultado.append({
            "id_finanza": f.id_finanza,
            "id_contratacion": f.id_contratacion,
            "monto": str(f.monto),
            "tipo": f.tipo,
            "descripcion": f.descripcion,
            "fecha_registro": f.fecha_registro.isoformat()
        })
    return jsonify(resultado)

# Obtener finanza por ID
@app.route('/api/finanzas/<int:id>', methods=['GET'])
def obtener_finanza(id):
    f = Finanza.query.get_or_404(id)
    resultado = {
        "id_finanza": f.id_finanza,
        "id_contratacion": f.id_contratacion,
        "monto": str(f.monto),
        "tipo": f.tipo,
        "descripcion": f.descripcion,
        "fecha_registro": f.fecha_registro.isoformat()
    }
    return jsonify(resultado)

# Actualizar finanza
@app.route('/api/finanzas/<int:id>', methods=['PUT'])
def actualizar_finanza(id):
    f = Finanza.query.get_or_404(id)
    data = request.get_json()
    if 'id_contratacion' in data:
        contratacion = Contratacion.query.get(data['id_contratacion'])
        if not contratacion:
            return jsonify({"error": "Contratación no encontrada"}), 404
        f.id_contratacion = data['id_contratacion']
    if 'monto' in data:
        f.monto = data['monto']
    if 'tipo' in data:
        f.tipo = data['tipo']
    if 'descripcion' in data:
        f.descripcion = data['descripcion']
    if 'fecha_registro' in data:
        f.fecha_registro = datetime.strptime(data['fecha_registro'], '%Y-%m-%dT%H:%M:%S')

    db.session.commit()
    return jsonify({"mensaje": "Finanza actualizada"})

# Eliminar finanza
@app.route('/api/finanzas/<int:id>', methods=['DELETE'])
def eliminar_finanza(id):
    f = Finanza.query.get_or_404(id)
    db.session.delete(f)
    db.session.commit()
    return jsonify({"mensaje": "Finanza eliminada"})

# Crear contacto
@app.route('/contactos', methods=['POST'])
def crear_contacto():
    data = request.get_json()
    usuario = Usuario.query.get(data['id_usuario'])
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    contacto = Contacto(
        id_usuario=data['id_usuario'],
        asunto=data['asunto'],
        mensaje=data['mensaje'],
        estado=data.get('estado', 'Pendiente')
    )
    db.session.add(contacto)
    db.session.commit()
    return jsonify({"mensaje": "Contacto creado", "id": contacto.id_contacto}), 201

# Obtener todos los contactos
@app.route('/contactos', methods=['GET'])
def obtener_contactos():
    contactos = Contacto.query.all()
    resultado = []
    for c in contactos:
        resultado.append({
            "id_contacto": c.id_contacto,
            "id_usuario": c.id_usuario,
            "asunto": c.asunto,
            "mensaje": c.mensaje,
            "fecha_envio": c.fecha_envio.isoformat(),
            "estado": c.estado
        })
    return jsonify(resultado)

# Obtener contacto por ID
@app.route('/contactos/<int:id>', methods=['GET'])
def obtener_contacto(id):
    c = Contacto.query.get_or_404(id)
    resultado = {
        "id_contacto": c.id_contacto,
        "id_usuario": c.id_usuario,
        "asunto": c.asunto,
        "mensaje": c.mensaje,
        "fecha_envio": c.fecha_envio.isoformat(),
        "estado": c.estado
    }
    return jsonify(resultado)

# Actualizar contacto
@app.route('/contactos/<int:id>', methods=['PUT'])
def actualizar_contacto(id):
    c = Contacto.query.get_or_404(id)
    data = request.get_json()

    if 'id_usuario' in data:
        usuario = Usuario.query.get(data['id_usuario'])
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404
        c.id_usuario = data['id_usuario']

    if 'asunto' in data:
        c.asunto = data['asunto']
    if 'mensaje' in data:
        c.mensaje = data['mensaje']
    if 'estado' in data:
        c.estado = data['estado']

    db.session.commit()
    return jsonify({"mensaje": "Contacto actualizado"})

# Eliminar contacto
@app.route('/contactos/<int:id>', methods=['DELETE'])
def eliminar_contacto(id):
    c = Contacto.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"mensaje": "Contacto eliminado"})


# Crear una cita
@app.route('/citas', methods=['POST'])
def crear_cita():
    data = request.get_json()
    id_usuario = data.get('id_usuario')
    fecha_hora_str = data.get('fecha_hora')  # formato esperado: "YYYY-MM-DD HH:MM:SS"
    duracion = data.get('duracion')
    servicio = data.get('servicio')
    id_empleado = data.get('id_empleado')

    if not all([id_usuario, fecha_hora_str, servicio]):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    try:
        fecha_hora = datetime.strptime(fecha_hora_str, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return jsonify({'error': 'Formato de fecha_hora inválido, use YYYY-MM-DD HH:MM:SS'}), 400

    # Verificar que el usuario y empleado existan
    usuario = Usuario.query.get(id_usuario)
    if not usuario:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    if id_empleado:
        empleado = Usuario.query.get(id_empleado)
        if not empleado or empleado.tipo_usuario != 'empleado':
            return jsonify({'error': 'Empleado no válido'}), 404
    else:
        empleado = None

    # Validar que no haya cita para ese empleado en ese horario (aunque la BD ya lo impide, mejor manejar error antes)
    if empleado:
        cita_duplicada = Cita.query.filter_by(fecha_hora=fecha_hora, id_empleado=id_empleado).first()
        if cita_duplicada:
            return jsonify({'error': 'El empleado ya tiene una cita en ese horario'}), 409

    nueva_cita = Cita(
        id_usuario=id_usuario,
        fecha_hora=fecha_hora,
        duracion=duracion,
        servicio=servicio,
        estado='pendiente',
        id_empleado=id_empleado
    )
    db.session.add(nueva_cita)
    db.session.commit()

    return jsonify({'mensaje': 'Cita creada', 'id': nueva_cita.id}), 201


# Listar citas (con filtro opcional por usuario o empleado)
@app.route('/citas', methods=['GET'])
def listar_citas():
    id_usuario = request.args.get('id_usuario')
    id_empleado = request.args.get('id_empleado')

    query = Cita.query

    if id_usuario:
        query = query.filter_by(id_usuario=id_usuario)
    if id_empleado:
        query = query.filter_by(id_empleado=id_empleado)

    citas = query.all()

    resultado = []
    for cita in citas:
        resultado.append({
            'id': cita.id,
            'id_usuario': cita.id_usuario,
            'fecha_hora': cita.fecha_hora.strftime('%Y-%m-%d %H:%M:%S'),
            'duracion': cita.duracion,
            'servicio': cita.servicio,
            'estado': cita.estado,
            'id_empleado': cita.id_empleado
        })

    return jsonify(resultado), 200


# Cambiar estado de una cita (confirmar, cancelar, realizada)
@app.route('/citas/<int:id_cita>/estado', methods=['PUT'])
def actualizar_estado_cita(id_cita):
    data = request.get_json()
    nuevo_estado = data.get('estado')

    if nuevo_estado not in ['pendiente', 'confirmada', 'cancelada', 'realizada']:
        return jsonify({'error': 'Estado inválido'}), 400

    cita = Cita.query.get(id_cita)
    if not cita:
        return jsonify({'error': 'Cita no encontrada'}), 404

    cita.estado = nuevo_estado
    db.session.commit()

    return jsonify({'mensaje': f'Estado actualizado a {nuevo_estado}'}), 200


if __name__ == '__main__':
    app.run (debug=True, host='0.0.0.0', port=5000)
    