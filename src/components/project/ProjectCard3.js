// src/components/cards/ProjectCard3.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDate } from '../../utils/DateUtils';

const ProjectCard3 = ({ proyecto, user }) => {
  return (
    <Card className="shadow p-4 mb-4">
      <Card.Body>
        {/* Título del Proyecto */}
        <h1 className="mb-4 text-center" style={{ color: 'black' }}>
          {proyecto.titulo}
        </h1>
        
        {/* Descripción Centrada */}
        <p className="text-muted text-center">{proyecto.descripcion}</p>
        
        {/* Información del Proyecto */}
        <p>
          <strong>Creado por:</strong> {user.nombre} ({user.email})
        </p>
        <p>
          <strong>Fecha de creación:</strong> {formatDate(proyecto.fecha_creacion)}
        </p>
        <p>
          <strong>Ciclo:</strong> {proyecto.ciclo}
        </p>
        <p>
          <strong>Curso:</strong> {proyecto.curso}
        </p>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard3;
