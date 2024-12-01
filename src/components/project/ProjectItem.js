// src/components/ProjectItem.js
import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { formatDate } from '../../utils/DateUtils';
import { useNavigate } from 'react-router-dom';

const ProjectItem = ({ proyecto, confirmarYBorrarProyecto }) => {
  const navigate = useNavigate();

  return (
    <Card
      key={proyecto.id_proyecto}
      className="mb-3"
      style={{
        backgroundColor: 'var(--gris-1)',
        border: '1px solid var(--gris-2)',
      }}
    >
      <Card.Body>
        <Card.Title style={{ color: 'var(--azul-1)' }}>
          {proyecto.titulo}
        </Card.Title>
        <Table striped bordered hover size="sm" style={{ cursor: 'pointer' }}>
          <tbody onClick={() => navigate(`/project-details/${proyecto.id_proyecto}`)}>
            <tr>
              <td>ID</td>
              <td>{proyecto.id_proyecto}</td>
            </tr>
            <tr>
              <td>Descripción</td>
              <td>{proyecto.descripcion}</td>
            </tr>
            <tr>
              <td>Fecha de creación</td>
              <td>{formatDate(proyecto.fecha_creacion)}</td>
            </tr>
            <tr>
              <td>Ciclo</td>
              <td>{proyecto.ciclo}</td>
            </tr>
            <tr>
              <td>Curso</td>
              <td>{proyecto.curso}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="info"
          onClick={() => navigate(`/edit-project/${proyecto.id_proyecto}`)}
          className="me-2"
          style={{ backgroundColor: 'var(--azul-2)', border: 'none' }}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          onClick={() => confirmarYBorrarProyecto(proyecto.id_proyecto)}
          style={{ backgroundColor: 'var(--naranja)', border: 'none' }}
        >
          Borrar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;
