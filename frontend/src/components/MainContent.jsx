import { useEffect, useState } from "react";
import axios from "axios";
import "./MainContent.css";

const MainContent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="main-content">
      {projects.map((item, index) => (
        <div key={index} className="card">
          <img src={item.image} alt={item.title} />
          <h2>{item.title}</h2>
          <p className="date">{item.date}</p>
          <p className="excerpt">{item.excerpt}</p>
        </div>
      ))}
    </main>
  );
};

export default MainContent;
