import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import MainContent from "./components/MainContent";
import VideoGallery from "./components/Portafolio/components/VideoGallery";
import VideoPage from "./components/Portafolio/components/VideoPage";
import PortafolioSlider from "./components/PortafolioSlider/PortfolioSlider";
import "./App.css";

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/portafolio" element={<VideoGallery />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/foto" element={<PortafolioSlider />} />
      </Routes>
    </>
  );
}

export default App;
