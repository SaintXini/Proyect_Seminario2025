import React from "react";
import { useNavigate } from "react-router-dom";
import { videos } from "../data/videosData";

import "./VideoGallery.css";

const VideoGallery = () => {
  const navigate = useNavigate();

  const handleVideoClick = (index) => {
    navigate(`/video/${index}`);
  };

  return (
    <div className="gallery-container">
      {videos.map((video, index) => (
        <div key={index} className="video-card" onClick={() => handleVideoClick(index)}>
          <video
            src={video.src}
            muted
            loop
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
          />
          <div className="video-info">
            <span className="company">{video.company}</span>
            <span className="title">{video.title}</span>
            <span className="director">{video.director}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
