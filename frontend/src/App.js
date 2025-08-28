import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/")  // Puedes cambiar el puerto aquí si tu backend usa otro
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <MainContent />

      <div className="user-list">
        <h1>Usuarios</h1>
        <ul>
          {usuarios.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
