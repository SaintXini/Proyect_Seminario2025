import React from "react";
import "./MainContent.css";
import videoBg from '../assets/iphilgoody_7132704107214802218.mp4';

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

const MainContent = () => {
  return (
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
  );
};

export default MainContent;