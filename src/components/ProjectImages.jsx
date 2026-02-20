import React from "react";

export default function ProjectImages({ images }) {
  return (
    <div className="project-images">
      {images.map((img, index) => (
        <div key={index} className="project-img-wrapper">
          <img src={img} alt={`Project preview ${index + 1}`} />
          <div className="overlay">Preview {index + 1}</div>
        </div>
      ))}
    </div>
  );
}