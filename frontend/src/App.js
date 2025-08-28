import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import Sidebar from "./components/SideBar/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import "./App.css";
=======
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css"; // Usa tu estilo base
>>>>>>> origin/main

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
<<<<<<< HEAD
      <MainContent />

      <div className="user-list">
=======
      <div className="main">
        <h1>Usuarios</h1>
>>>>>>> origin/main
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
