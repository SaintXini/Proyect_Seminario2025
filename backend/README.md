# Sistema de Gestión de Proyectos - Flask Backend & React Frontend

## 📋 Descripción

Sistema completo de gestión de proyectos con arquitectura MVC en Flask, Base de datos PostgreSQL, Autenticación JWT, y React como frontend.

## 🏗️ Arquitectura

### Backend (Flask - MVC)
- **Models**: Usuarios, Proyectos, Clientes, Inventario, Inversiones, Calendario, Notificaciones
- **Controllers**: Manejan la lógica de solicitudes
- **Services**: Contienen la lógica de negocio
- **Routes**: Endpoints REST API con protección JWT
- **Middleware**: Autenticación y Autorización basada en roles

### Frontend (React)
- **Context API**: Gestión de autenticación
- **React Router**: Navegación y rutas protegidas
- **Axios**: Cliente HTTP con interceptores JWT
- **Tailwind CSS**: Estilos responsivos

## 🚀 Instalación y Configuración

### Requisitos Previos
- Python 3.8+
- Node.js 14+
- PostgreSQL (Supabase o local)
- Git

### Backend Setup

1. **Navegar al directorio del backend**
```bash
cd backend
```

2. **Crear ambiente virtual**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar variables de entorno**
```bash
# Copiar .env.example a .env y actualizar con tus credenciales
cp .env.example .env
```

**Variables necesarias en .env:**
```
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET_KEY=tu-clave-jwt-super-segura
SECRET_KEY=tu-clave-secreta
FLASK_ENV=production
FLASK_DEBUG=False
PORT=5000
```

5. **Ejecutar migraciones (si es necesario)**
```bash
flask db upgrade
```

6. **Poblar base de datos con datos iniciales**
```bash
python seed.py
```

7. **Iniciar servidor Backend**
```bash
python run.py
```

El backend estará disponible en: `http://localhost:5000`

### Frontend Setup

1. **Navegar al directorio del frontend**
```bash
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno (opcional)**
```bash
# Crear .env si es necesario
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

4. **Iniciar servidor Frontend (desarrollo)**
```bash
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## 🔐 Autenticación

### Credenciales de Prueba (después del seed)

**Administrador:**
- Email: `admin@example.com`
- Contraseña: `admin123`

**Cliente:**
- Email: `cliente@example.com`
- Contraseña: `cliente123`

### Flujo de Autenticación

1. Usuario inicia sesión con email y contraseña
2. Backend valida credenciales y genera tokens JWT:
   - `access_token` (24 horas) - para solicitudes autenticadas
   - `refresh_token` (30 días) - para renovar access_token
3. Frontend guarda tokens en localStorage
4. Todas las solicitudes incluyen `Authorization: Bearer <access_token>`
5. Si el token expira, se intenta renovar automáticamente con refresh_token

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Renovar token
- `GET /api/auth/me` - Obtener usuario actual (requiere auth)
- `PUT /api/auth/profile` - Actualizar perfil (requiere auth)

### Proyectos (Admin: CRUD completo, Cliente: solo lectura)
- `GET /api/projects` - Listar proyectos
- `POST /api/projects` - Crear proyecto (admin)
- `GET /api/projects/<id>` - Obtener proyecto
- `PUT /api/projects/<id>` - Actualizar proyecto (admin)
- `DELETE /api/projects/<id>` - Eliminar proyecto (admin)

### Clientes (Solo Admin)
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Crear cliente
- `GET /api/clients/<id>` - Obtener cliente
- `PUT /api/clients/<id>` - Actualizar cliente
- `DELETE /api/clients/<id>` - Eliminar cliente

### Inventario (Admin: CRUD completo, Cliente: lectura)
- `GET /api/inventory` - Listar items
- `POST /api/inventory` - Crear item (admin)
- `GET /api/inventory/<id>` - Obtener item
- `PUT /api/inventory/<id>` - Actualizar item (admin)
- `DELETE /api/inventory/<id>` - Eliminar item (admin)

### Inversiones (Todos pueden ver, solo admin puede gestionar)
- `GET /api/investments` - Listar inversiones
- `POST /api/investments` - Crear inversión
- `GET /api/investments/<id>` - Obtener inversión
- `PUT /api/investments/<id>` - Actualizar inversión (admin)
- `DELETE /api/investments/<id>` - Eliminar inversión (admin)

### Calendario (Admin: CRUD, Cliente: lectura)
- `GET /api/calendar/events` - Listar eventos
- `POST /api/calendar/events` - Crear evento (admin)
- `GET /api/calendar/events/<id>` - Obtener evento
- `PUT /api/calendar/events/<id>` - Actualizar evento (admin)
- `DELETE /api/calendar/events/<id>` - Eliminar evento (admin)

### Notificaciones
- `GET /api/notifications` - Listar notificaciones
- `GET /api/notifications/me` - Mis notificaciones
- `GET /api/notifications/me/unread` - Notificaciones no leídas
- `POST /api/notifications/<id>/read` - Marcar como leída
- `PUT /api/notifications/mark-all-read` - Marcar todas como leídas

## 🛡️ Control de Acceso (Roles)

### ADMIN
- ✅ Acceso total al sistema
- ✅ Gestión de proyectos (crear, editar, eliminar)
- ✅ Gestión de clientes
- ✅ Gestión de inventario
- ✅ Gestión de inversiones
- ✅ Gestión de calendario
- ✅ Gestión de usuarios
- ✅ Crear notificaciones

### CLIENTE
- ✅ Ver proyectos asignados
- ✅ Ver perfil
- ✅ Ver inventario
- ✅ Ver inversiones
- ✅ Ver calendario de clientes
- ✅ Ver notificaciones personales
- ❌ No puede crear ni eliminar (excepto inversiones)

## 🗂️ Estructura de Carpetas

```
proyecto_seminario2025.worktrees/
├── backend/
│   ├── app/
│   │   ├── __init__.py (factory function)
│   │   ├── config.py (configuración)
│   │   ├── models/ (ORM models)
│   │   ├── controllers/ (request handlers)
│   │   ├── services/ (business logic)
│   │   ├── routes/ (API endpoints)
│   │   ├── middleware/ (auth, validation)
│   │   └── utils/ (helpers)
│   ├── migrations/ (Alembic)
│   ├── requirements.txt
│   ├── run.py (entrada principal)
│   ├── seed.py (datos iniciales)
│   └── .env (variables de entorno)
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/ (AuthContext)
    │   ├── services/ (api.js)
    │   ├── App.jsx
    │   └── index.js
    ├── package.json
    ├── .env (variables React)
    └── public/
```

## 🔄 Flujo de Datos

### Login
```
LoginForm → API login() → Backend validates → JWT tokens generated
→ Frontend stores tokens → Redirect to dashboard
```

### CRUD de Proyectos
```
AdminDashboard → ProjectController → ProjectService → Project Model
→ Database → Response → Update UI
```

### Protección de Rutas
```
Browser → ProtectedRoute → AuthContext.isAuthenticated?
→ Yes: render component | No: redirect to /login
```

## 📝 Notas Importantes

1. **JWT Tokens**: Los tokens se guardan en localStorage. No olvides de cerrar sesión para limpiar.
2. **CORS**: Configurado para aceptar requests desde el frontend.
3. **Base de Datos**: Usa PostgreSQL. Supabase es una opción gratuita en cloud.
4. **Variables de Entorno**: NUNCA commits las variables reales. Usa .env.example como referencia.
5. **Migraciones**: Si modificas modelos, crea una nueva migración con Flask-Migrate.

## 🐛 Troubleshooting

### Error: "No module named 'app'"
```bash
# Asegúrate de estar en el directorio backend
cd backend
python run.py
```

### Error: "Database connection failed"
```bash
# Verifica que DATABASE_URL sea correcto en .env
# Formato: postgresql://user:password@host:5432/database
```

### Error: "CORS error" en frontend
```bash
# Asegúrate que REACT_APP_API_URL sea correcto
# Por defecto: http://localhost:5000/api
```

### Error: "401 Unauthorized"
```bash
# El token expiró. Logout e intenta de nuevo
# Los tokens se renuevan automáticamente si tienes refresh_token válido
```

## 📦 Deployment

### Backend (Render, Heroku, Railway)
1. Configurar variables de entorno en la plataforma
2. Conectar repositorio Git
3. Configurar comando de inicio: `python run.py`
4. Base de datos: Usar Supabase PostgreSQL

### Frontend (Vercel, Netlify)
1. Configurar `REACT_APP_API_URL` con la URL del backend en producción
2. Conectar repositorio Git
3. Build command: `npm build`

## 👥 Roles en la Aplicación

- **Admin** (rol='admin'): Control total del sistema
- **Cliente** (rol='client'): Acceso limitado a funciones específicas

## 📚 Tecnologías Utilizadas

### Backend
- Python 3.8+
- Flask 3.1.2
- SQLAlchemy 2.0
- PostgreSQL
- JWT (Flask-JWT-Extended)
- CORS (Flask-CORS)

### Frontend
- React 19
- React Router 7
- Axios 1.11
- Tailwind CSS 3.4
- Context API
- Lucide React (icons)

## 📄 Licencia

Este proyecto es parte del seminario 2025.

## 🤝 Contribuir

Para contribuir al proyecto, por favor:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**¡Listo para usar! 🎉**

Para preguntas o problemas, consulta la documentación de Flask y React.
