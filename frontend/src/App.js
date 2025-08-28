import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css"; // Usa tu estilo base

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main">
        <h1>Usuarios</h1>
        <ul>
          {usuarios.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>

        <MainContent />
      </div>
    </div>
  );
}

export default App;
