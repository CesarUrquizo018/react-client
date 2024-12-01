import React from 'react';
import { Card, Button } from 'react-bootstrap';

const OtroCard = ({ otros, onEdit, onAdd }) => {
  return (
    <Card className="shadow mt-4">
      <Card.Header className="bg-warning text-dark">Otros Recursos</Card.Header>
      <Card.Body>
        {otros.length > 0 ? (
          otros.map((otro) => (
            <Card key={otro.id_otro} className="mb-3">
              <Card.Body>
                <Card.Text>{otro.NombreOtro}</Card.Text>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onEdit(otro, 'otro')}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-muted">No hay otros recursos registrados.</p>
        )}
        <Button variant="primary" onClick={() => onAdd('otro')}>
          Añadir Otro Recurso
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OtroCard;
