import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const API_BASE = "http://127.0.0.1:5000/api/finanzas"; // ruta de api

export default function FinanzasDashboard() {
  // Estados
  const [finanzas, setFinanzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  // Form para crear/editar
  const [form, setForm] = useState({
    id_finanza: null,
    id_contratacion: "",
    monto: "",
    tipo: "",
    descripcion: "",
    fecha_registro: new Date().toISOString().slice(0, 16),
  });

  // Datos usuario fake (configuración)
  const [userConfig, setUserConfig] = useState({
    nombre: "Francisco Antonio",
    email: "francisco@example.com",
  });

  // Fetch finanzas
  async function fetchFinanzas() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(API_BASE);
      setFinanzas(data);
    } catch (e) {
      setError("Error obteniendo finanzas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFinanzas();
  }, []);

  // Handle form change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Submit create/update
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (form.id_finanza) {
        // Update
        await axios.put(`${API_BASE}/${form.id_finanza}`, {
          id_contratacion: Number(form.id_contratacion),
          monto: Number(form.monto),
          tipo: form.tipo,
          descripcion: form.descripcion,
          fecha_registro: form.fecha_registro,
        });
        alert("Finanza actualizada");
      } else {
        // Create
        await axios.post(API_BASE, {
          id_contratacion: Number(form.id_contratacion),
          monto: Number(form.monto),
          tipo: form.tipo,
          descripcion: form.descripcion,
          fecha_registro: form.fecha_registro,
        });
        alert("Finanza creada");
      }
      setForm({
        id_finanza: null,
        id_contratacion: "",
        monto: "",
        tipo: "",
        descripcion: "",
        fecha_registro: new Date().toISOString().slice(0, 16),
      });
      fetchFinanzas();
      setActiveTab("dashboard");
    } catch (err) {
      alert("Error guardando finanza: " + err.message);
    }
  }

  // Editar finanza
  function editFinanza(f) {
    setForm({
      id_finanza: f.id_finanza,
      id_contratacion: f.id_contratacion,
      monto: f.monto,
      tipo: f.tipo,
      descripcion: f.descripcion || "",
      fecha_registro: f.fecha_registro.slice(0, 16),
    });
    setActiveTab("dashboard");
  }

  // Eliminar finanza
  async function deleteFinanza(id) {
    if (!window.confirm("¿Seguro quieres eliminar esta finanza?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      alert("Finanza eliminada");
      fetchFinanzas();
    } catch (e) {
      alert("Error eliminando finanza");
    }
  }

  // Reportes: calcular datos para gráficas
  // Ingresos y egresos para Doughnut
  const ingresos = finanzas
    .filter((f) => f.tipo.toLowerCase() === "ingreso")
    .reduce((acc, cur) => acc + Number(cur.monto), 0);
  const egresos = finanzas
    .filter((f) => f.tipo.toLowerCase() === "egreso")
    .reduce((acc, cur) => acc + Number(cur.monto), 0);

  // Por mes (bar chart)
  const finanzasPorMes = {};
  finanzas.forEach((f) => {
    const mes = new Date(f.fecha_registro).toLocaleString("es-ES", { month: "short", year: "numeric" });
    if (!finanzasPorMes[mes]) finanzasPorMes[mes] = 0;
    finanzasPorMes[mes] += Number(f.monto);
  });
  const meses = Object.keys(finanzasPorMes).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const montosPorMes = meses.map((m) => finanzasPorMes[m]);

  // Cambiar tema
  function toggleDarkMode() {
    setDarkMode((d) => !d);
  }

  // Configuración: manejar inputs
  function handleUserConfigChange(e) {
    const { name, value } = e.target;
    setUserConfig((u) => ({ ...u, [name]: value }));
  }

  function resetConfig() {
    setUserConfig({
      nombre: "Francisco Antonio",
      email: "francisco@example.com",
    });
  }

  // Recomendador de Paquetes
const [numPersonas, setNumPersonas] = useState(0);
const [numCamaras, setNumCamaras] = useState(0);
const [paquete, setPaquete] = useState(null);

function calcularPaquete() {
  let resultado;

  if (numCamaras >= 3 && numPersonas >= 5) {
    resultado = {
      nombre: "Producción Premium",
      descripcion: "Incluye 3+ cámaras, drones, edición avanzada y cobertura completa para eventos grandes.",
    };
  } else if (numCamaras >= 2 && numPersonas >= 3) {
    resultado = {
      nombre: "Producción Avanzada",
      descripcion: "Ideal para eventos medianos. Dos cámaras, edición profesional y cobertura multicámara.",
    };
  } else if (numCamaras >= 1 && numPersonas >= 1) {
    resultado = {
      nombre: "Producción Básica",
      descripcion: "Una cámara, edición básica. Recomendado para eventos pequeños o individuales.",
    };
  } else {
    resultado = {
      nombre: "Paquete no disponible",
      descripcion: "Por favor, selecciona al menos una cámara y una persona.",
    };
  }

  setPaquete(resultado);
}


  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="px-6 py-8 text-2xl font-bold border-b border-gray-300 dark:border-gray-700">
          Finanzas App
        </div>
        <nav className="flex flex-col flex-grow px-4 py-6 space-y-4">
          {["dashboard", "reportes",  "Recomendador","configuracion"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-2 rounded-md font-semibold hover:bg-blue-500 hover:text-white transition ${
                activeTab === tab ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab === "dashboard" && "Dashboard"}
              {tab === "reportes" && "Reportes"}
              {tab === "Recomendador" && "Recomendador"}
              {tab === "configuracion" && "Configuración"}
            </button>
          ))}
          <button
            onClick={toggleDarkMode}
            className="mt-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-grow p-6 overflow-auto">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard - Finanzas</h1>

            {/* Tabla de finanzas */}
            {loading ? (
              <p>Cargando finanzas...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-md">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">ID Contratación</th>
                      <th className="px-4 py-2">Monto</th>
                      <th className="px-4 py-2">Tipo</th>
                      <th className="px-4 py-2">Descripción</th>
                      <th className="px-4 py-2">Fecha Registro</th>
                      <th className="px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finanzas.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          No hay finanzas registradas
                        </td>
                      </tr>
                    )}
                    {finanzas.map((f) => (
                      <tr
                        key={f.id_finanza}
                        className="border-t border-gray-300 dark:border-gray-700"
                      >
                        <td className="px-4 py-2">{f.id_finanza}</td>
                        <td className="px-4 py-2">{f.id_contratacion}</td>
                        <td className="px-4 py-2">{f.monto}</td>
                        <td className="px-4 py-2 capitalize">{f.tipo}</td>
                        <td className="px-4 py-2">{f.descripcion}</td>
                        <td className="px-4 py-2">{new Date(f.fecha_registro).toLocaleString()}</td>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            onClick={() => editFinanza(f)}
                            className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteFinanza(f.id_finanza)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Formulario para crear/editar */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-xl bg-white dark:bg-gray-800 p-6 rounded-md shadow"
            >
              <h2 className="text-xl font-semibold mb-4">
                {form.id_finanza ? "Editar finanza" : "Nueva finanza"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="id_contratacion">
                    ID Contratación
                  </label>
                  <input
                    type="number"
                    name="id_contratacion"
                    id="id_contratacion"
                    value={form.id_contratacion}
                    onChange={handleChange}
                
                    className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold" htmlFor="monto">
                    Monto
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="monto"
                    id="monto"
                    value={form.monto}
                    onChange={handleChange}
                    required
                    className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold" htmlFor="tipo">
                    Tipo
                  </label>
                  <select
                    name="tipo"
                    id="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    required
                    className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="" disabled>
                      Selecciona tipo
                    </option>
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold" htmlFor="fecha_registro">
                    Fecha Registro
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_registro"
                    id="fecha_registro"
                    value={form.fecha_registro}
                    onChange={handleChange}
                    required
                    className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-1 font-semibold" htmlFor="descripcion">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Opcional"
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
              >
                {form.id_finanza ? "Actualizar" : "Crear"}
              </button>
            </form>
          </>
        )}

        {/* Reportes */}
        {activeTab === "reportes" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Reportes</h1>

            <div className="max-w-4xl mx-auto space-y-10">
              <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Ingresos vs Egresos</h2>
                <Doughnut
                  data={{
                    labels: ["Ingresos", "Egresos"],
                    datasets: [
                      {
                        label: "Montos",
                        data: [ingresos, egresos],
                        backgroundColor: ["#3b82f6", "#ef4444"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "bottom" },
                    },
                  }}
                />
              </section>

              <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Distribución Mensual</h2>
                <Bar
                  data={{
                    labels: meses,
                    datasets: [
                      {
                        label: "Monto",
                        data: montosPorMes,
                        backgroundColor: "#3b82f6",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: { beginAtZero: true },
                    },
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </section>
            </div>
          </>
        )}


        {/* Recomendador */}
{activeTab === "Recomendador" && (
  <>
    <h1 className="text-3xl font-bold mb-6">Recomendador de Paquetes</h1>

    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">Selecciona tus necesidades</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Cantidad de personas</label>
            <input
              type="number"
              value={numPersonas}
              onChange={(e) => setNumPersonas(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej. 5"
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Cantidad de cámaras</label>
            <input
              type="number"
              value={numCamaras}
              onChange={(e) => setNumCamaras(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej. 2"
              min="0"
            />
          </div>
        </div>

        <button
          onClick={calcularPaquete}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Recomendar Paquete
        </button>
      </section>

      {paquete && (
        <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Paquete recomendado:</h3>
          <p className="text-gray-700 dark:text-gray-200">
            <span className="font-bold">Nombre:</span> {paquete.nombre}
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            <span className="font-bold">Descripción:</span> {paquete.descripcion}
          </p>
        </section>
      )}
    </div>
  </>
)}



        {/* Configuración */}
        {activeTab === "configuracion" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Configuración</h1>

            <section className="max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
              <div>
                <label className="block font-semibold mb-1" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={userConfig.nombre}
                  onChange={handleUserConfigChange}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userConfig.email}
                  onChange={handleUserConfigChange}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <button
                  onClick={resetConfig}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded font-semibold transition"
                >
                  Restablecer configuración
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}