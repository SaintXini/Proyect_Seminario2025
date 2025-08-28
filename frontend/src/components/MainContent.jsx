import React from "react";
import "./MainContent.css";

// Datos de ejemplo (puedes reemplazar por datos desde backend)
const items = [
  {
    title: "New Film Release",
    date: "August 2025",
    excerpt: "Our latest film just dropped. Explore behind the scenes.",
    image: "https://source.unsplash.com/800x400/?film"
  },
  {
    title: "Award-Winning Campaign",
    date: "July 2025",
    excerpt: "We just won Best Commercial at the Ad Awards.",
    image: "https://source.unsplash.com/800x400/?camera"
  }
];

const MainContent = () => {
  return (
    <main className="main-content">
      {items.map((item, index) => (
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
