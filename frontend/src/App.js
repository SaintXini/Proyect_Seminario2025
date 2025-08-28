import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users/")
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
