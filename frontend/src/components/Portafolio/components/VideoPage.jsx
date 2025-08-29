import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import videos from "../data/videosData";
import "./VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos[id];

  if (!video) {
    return <div className="video-page">Video no encontrado</div>;
  }

  return (
    <div className="video-page">
      <div className="video-wrapper">
        <video src={video.src} autoPlay controls className="video-player" />
      </div>

      <div className="video-info-bar">
        <span className="director">DIRECTOR<br />{video.director}</span>
        <span className="title">{video.company}<br />{video.title}</span>
        <span className="controls">
          <button onClick={() => navigate(-1)}>⬅ Atrás</button>
        </span>
      </div>
    </div>
  );
};

export default VideoPage;
