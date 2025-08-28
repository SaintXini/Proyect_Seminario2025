import { useEffect, useState } from "react";
import axios from "axios";
import "./MainContent.css";
import videoBg from '../assets/iphilgoody_7132704107214802218.mp4';

<<<<<<< HEAD
const reviews = [
  {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  },  
  {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  },
  {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  },
    {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  },
    {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  },
    {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  },
    {
    img: "enlace",
    title: "titulo",
    date: "fecha",
    text: "Tinfo"
  }
];

=======
>>>>>>> origin/main
const MainContent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
<<<<<<< HEAD
    <div className="page">
      {/* Video Superior */}
      <section className="video-section">
        <video src={videoBg} autoPlay loop muted />
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        {reviews.map((review, index) => (
          <div
            className={`review-card ${index % 2 === 1 ? "reverse" : ""}`}
            key={index}
          >
            <img src={review.img} alt={review.title} />
            <div className="review-text">
              <h2>{review.title}</h2>
              <span className="date">{review.date}</span>
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
=======
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
>>>>>>> origin/main
  );
};

export default MainContent;