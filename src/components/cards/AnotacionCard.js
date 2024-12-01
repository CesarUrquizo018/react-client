import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AnotacionCard = ({ anotaciones, onEdit, onAdd }) => {
  return (
    <Card className="shadow mt-4">
      <Card.Header className="bg-primary text-white">Anotaciones</Card.Header>
      <Card.Body>
        {anotaciones.length > 0 ? (
          anotaciones.map((anotacion) => (
            <Card key={anotacion.id_anotacion} className="mb-3">
              <Card.Body>
                <Card.Text>
                  <strong>{anotacion.Usuario?.nombre || 'Usuario desconocido'}:</strong> {anotacion.ContenidoAnotacion}
                </Card.Text>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onEdit(anotacion)}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-muted">No hay anotaciones registradas.</p>
        )}
        <Button variant="primary" onClick={onAdd}>
          Añadir Anotación
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AnotacionCard;
