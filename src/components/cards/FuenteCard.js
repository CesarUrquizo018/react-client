import React from 'react';
import { Card, Button } from 'react-bootstrap';

const FuenteCard = ({ fuentes, onEdit, onAdd }) => {
  return (
    <Card className="shadow mt-4">
      <Card.Header className="bg-success text-white">Fuentes</Card.Header>
      <Card.Body>
        {fuentes.length > 0 ? (
          fuentes.map((fuente) => (
            <Card key={fuente.id_fuente} className="mb-3">
              <Card.Body>
                <Card.Text>
                  <strong>Nombre:</strong> {fuente.NombreFuente}
                  <br />
                  <strong>Descripción:</strong> {fuente.DescripcionFuente || 'Sin descripción'}
                  <br />
                  <strong>URL:</strong> <a href={fuente.URLFuente}>{fuente.URLFuente}</a>
                </Card.Text>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onEdit(fuente)}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-muted">No hay fuentes registradas.</p>
        )}
        <Button variant="primary" onClick={onAdd}>
          Añadir Fuente
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FuenteCard;
