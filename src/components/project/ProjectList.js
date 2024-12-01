// src/components/ProjectList.js
import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = ({ proyectos, confirmarYBorrarProyecto }) => (
  <>
    {proyectos.map((proyecto) => (
      <ProjectItem
        key={proyecto.id_proyecto}
        proyecto={proyecto}
        confirmarYBorrarProyecto={confirmarYBorrarProyecto}
      />
    ))}
  </>
);

export default ProjectList;
