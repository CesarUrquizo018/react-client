import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Row, Col, Button } from 'react-bootstrap';
import { formatDate } from '../../utils/DateUtils';
import { FaStar } from 'react-icons/fa'; // Icono de estrella para puntaje

// Componente para mostrar el puntaje promedio como estrellas
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        color={i <= rating ? '#ffc107' : '#e4e5e9'} // Amarillo para estrellas activas, gris para inactivas
      />
    );
  }
  return <div>{stars}</div>;
}

function ProjectCard({ proyecto, handleOpenModal }) {
  // Calcular el puntaje promedio si hay calificaciones
  const averageRating =
    proyecto.calificaciones && proyecto.calificaciones.length > 0
      ? proyecto.calificaciones.reduce((sum, cal) => sum + cal.puntaje, 0) /
        proyecto.calificaciones.length
      : 0;

  return (
    <Card
      key={proyecto.id_proyecto}
      className="mb-3"
      style={{ backgroundColor: 'var(--gris-1)', border: 'none' }}
    >
      <Card.Body className="p-4">
        {/* Primera fila con el título, descripción y botones */}
        <Row className="align-items-center mb-3">
          <Col md={8}>
            <Card.Title style={{ color: 'var(--azul-1)' }}>
              {proyecto.titulo}
            </Card.Title>
            <Card.Text>{proyecto.descripcion}</Card.Text>
          </Col>
          <Col md={4} className="text-md-end">
            <Button
              variant="outline-primary"
              as={Link}
              to={`/project-details/${proyecto.id_proyecto}`}
              className="me-2"
            >
              Ver Detalles
            </Button>
            <Button
              style={{
                backgroundColor: 'var(--azul-2)',
                borderColor: 'var(--azul-2)',
              }}
              onClick={() => handleOpenModal(proyecto)}
            >
              ENVIAR SOLICITUD
            </Button>
          </Col>
        </Row>

        {/* Segunda fila con los datos del proyecto y puntaje */}
        <Row className="mb-3">
          <Col md={9}>
            <Table bordered hover size="sm">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{proyecto.id_proyecto}</td>
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
                <tr>
                  <td>Creador</td>
                  <td>{proyecto.creador?.nombre}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col
            md={3}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <h6>Puntaje promedio:</h6>
            <StarRating rating={averageRating} />
            <small>({averageRating.toFixed(1)} de 5)</small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
