from app import app, db, User, Project, Client, InventoryItem, Investment, CalendarEvent
from werkzeug.security import generate_password_hash

print("📌 Iniciando inserción de datos...")

# --------------------------
# EJECUTAR DENTRO DE FLASK
# --------------------------
with app.app_context():

    db.session.query(CalendarEvent).delete()
    db.session.query(Investment).delete()
    db.session.query(InventoryItem).delete()
    db.session.query(Project).delete()
    db.session.query(Client).delete()
    db.session.query(User).delete()
    db.session.commit()

    # ============================
    # USERS
    # ============================
    user1 = User(
        name="Martín López",
        email="martin@example.com",
        password=generate_password_hash("admin123"),
        telefono="123456789",
        company="The Great One",
        rol="admin"
    )
    db.session.add(user1)

    user2 = User(
        name="Cliente Demo",
        email="cliente@example.com",
        password=generate_password_hash("cliente123"),
        telefono="987654321",
        company="Cliente S.A.",
        rol="client"
    )
    db.session.add(user2)

    # ============================
    # CLIENTES
    # ============================
    client1 = Client(
        name="Coca-Cola",
        contact="Juan Pérez",
        email="juan@cocacola.com",
        phone="555-1234",
        since="2021",
        status="Activo",
        projects_count=3,
        total_budget=95000
    )
    db.session.add(client1)

    client2 = Client(
        name="Nike",
        contact="Laura Gómez",
        email="lgomez@nike.com",
        phone="555-6789",
        since="2022",
        status="Activo",
        projects_count=2,
        total_budget=75000
    )
    db.session.add(client2)

    # ============================
    # PROYECTOS
    # ============================
    project1 = Project(
        name="Campaña Verano Coca-Cola",
        client="Coca-Cola",
        status="En progreso",
        progress=45,
        budget=30000
    )
    db.session.add(project1)

    project2 = Project(
        name="Nuevo Comercial Nike Running",
        client="Nike",
        status="Planeación",
        progress=10,
        budget=45000
    )
    db.session.add(project2)

    project3 = Project(
        name="Rebranding Coca-Cola 2025",
        client="Coca-Cola",
        status="Pendiente",
        progress=0,
        budget=20000
    )
    db.session.add(project3)

    # ============================
    # INVENTARIO
    # ============================
    item1 = InventoryItem(
        name="Cámara Sony A7 IV",
        category="Cámaras",
        status="Disponible",
        quantity=2,
        borrower="",
        last_maintenance="2024-10-01"
    )
    db.session.add(item1)

    item2 = InventoryItem(
        name="Luz LED Godox SL60W",
        category="Iluminación",
        status="Prestado",
        quantity=4,
        borrower="Equipo Producción",
        last_maintenance="2024-09-15"
    )
    db.session.add(item2)

    item3 = InventoryItem(
        name="Micrófono Shure SM7B",
        category="Audio",
        status="Disponible",
        quantity=3,
        borrower="",
        last_maintenance="2024-11-10"
    )
    db.session.add(item3)

    # ============================
    # INVERSIONES (FINANZAS)
    # ============================
    investment1 = Investment(
        item="Nueva cámara RED Komodo",
        priority="Alta",
        estimated=12000,
        notes="Se necesita para proyectos premium 2025"
    )
    db.session.add(investment1)

    investment2 = Investment(
        item="Renovar drones DJI",
        priority="Media",
        estimated=5000,
        notes="Drones actuales desgastados"
    )
    db.session.add(investment2)

    investment3 = Investment(
        item="Actualizar PCs de edición",
        priority="Alta",
        estimated=8000,
        notes="Mejorar velocidad de render"
    )
    db.session.add(investment3)

    # ============================
    # CALENDARIO
    # ============================
    event1 = CalendarEvent(
        title="Rodaje Comercial Coca-Cola",
        date=15,
        month=11,
        year=2024,
        type="production",
        calendar_type="clients",
        client="Coca-Cola"
    )
    db.session.add(event1)

    event2 = CalendarEvent(
        title="Reunión Creativa Nike",
        date=22,
        month=11,
        year=2024,
        type="meeting",
        calendar_type="clients",
        client="Nike"
    )
    db.session.add(event2)

    event3 = CalendarEvent(
        title="Junta interna de presupuesto",
        date=10,
        month=12,
        year=2024,
        type="internal",
        calendar_type="company",
        client=""
    )
    db.session.add(event3)

    # GUARDAR TODO
    db.session.commit()

print("✅ Datos insertados correctamente.")
