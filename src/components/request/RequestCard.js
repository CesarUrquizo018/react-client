// src/components/RequestCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { formatDate } from '../../utils/DateUtils';

const RequestCard = ({ solicitud, onAccept, onReject }) => (
  <Card className="mb-3" style={{ borderColor: 'var(--azul-2)' }}>
    <Card.Body>
      <Card.Title style={{ color: 'var(--azul-1)' }}>Solicitud ID: {solicitud.id_solicitud}</Card.Title>
      <Card.Text>
        <strong>Proyecto:</strong> {solicitud.proyecto ? solicitud.proyecto.titulo : 'Sin título'}
      </Card.Text>
      <Card.Text><strong>Mensaje:</strong> {solicitud.mensaje}</Card.Text>
      <Card.Text><strong>Fecha de Solicitud:</strong> {formatDate(solicitud.fecha_solicitud)}</Card.Text>
      <Card.Text>
        <strong>Estado:</strong> {solicitud.id_estado === 2 ? 'Aceptado' : solicitud.id_estado === 3 ? 'Rechazado' : 'En espera'}
      </Card.Text>
      {solicitud.id_estado === 1 && (
        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={() => onAccept(solicitud.id_solicitud)}
          >
            Aceptar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onReject(solicitud.id_solicitud)}
          >
            Rechazar
          </Button>
        </div>
      )}
    </Card.Body>
  </Card>
);

export default RequestCard;
