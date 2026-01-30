import { useState } from "react";
import projectImg from "../assets/project1.jpg";

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card">
        <img src={projectImg} alt={project.name} />
        <div className="card-content">
          <h3>{project.name}</h3>
          <p>{project.description.slice(0, 80)}...</p>
          <button onClick={() => setOpen(true)}>View Case Study</button>
        </div>
      </div>

      {open && (
        <div className="modal">
          <div className="modal-box">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
