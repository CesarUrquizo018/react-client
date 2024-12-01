import React from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { formatDate } from '../../utils/DateUtils';

const ProjectCard = ({ proyecto, onCardClick, onEditProject, onDeleteProject }) => {
  return (
    <Card
      className="mb-4 shadow-sm"
      style={{ cursor: onCardClick ? 'pointer' : 'default', height: '100%' }}
      onClick={onCardClick ? () => onCardClick(proyecto.id_proyecto) : undefined}
    >
      <Card.Body>
        <Card.Title style={{ color: 'var(--azul-1)' }}>{proyecto.titulo}</Card.Title>
        <Card.Text>{proyecto.descripcion}</Card.Text>
        <Table borderless size="sm" className="mt-3">
          <tbody>
            <tr>
              <td><strong>ID:</strong></td>
              <td>{proyecto.id_proyecto}</td>
            </tr>
            <tr>
              <td><strong>Fecha de Creación:</strong></td>
              <td>{formatDate(proyecto.fecha_creacion)}</td>
            </tr>
            <tr>
              <td><strong>Ciclo:</strong></td>
              <td>{proyecto.ciclo}</td>
            </tr>
            <tr>
              <td><strong>Curso:</strong></td>
              <td>{proyecto.curso}</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          {onEditProject && (
            <Button
              variant="info"
              className="me-2"
              onClick={(e) => {
                e.stopPropagation(); // Previene que el clic en el botón active el clic de la tarjeta
                onEditProject(proyecto.id_proyecto);
              }}
            >
              <FaEdit /> Editar
            </Button>
          )}
          {onDeleteProject && (
            <Button
              variant="danger"
              onClick={(e) => {
                e.stopPropagation(); // Previene que el clic en el botón active el clic de la tarjeta
                onDeleteProject(proyecto.id_proyecto);
              }}
            >
              <FaTrashAlt /> Eliminar
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
