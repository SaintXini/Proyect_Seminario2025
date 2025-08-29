import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import MainContent from "./components/MainContent";
import VideoGallery from "./components/Portafolio/components/VideoGallery";
import VideoPage from "./components/Portafolio/components/VideoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/portafolio" element={<VideoGallery />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
