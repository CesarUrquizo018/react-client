import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const CommentSection = ({ comentarios, nuevoComentario, onChangeComentario, onAgregarComentario }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title style={{ color: 'var(--azul-1)' }}>Comentarios</Card.Title>
        <div>
          {comentarios.map((comentario) => (
            <Card key={comentario.id_comentario} className="mb-3">
              <Card.Body>
                <Card.Text>
                  <strong>{comentario.Usuario?.nombre || 'Usuario desconocido'}:</strong> {comentario.contenido}
                </Card.Text>
                <small className="text-muted">{new Date(comentario.fecha_comentario).toLocaleString()}</small>
              </Card.Body>
            </Card>
          ))}
        </div>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={onChangeComentario}
            />
          </Form.Group>
          <Button
            className="mt-3"
            variant="primary"
            onClick={onAgregarComentario}
            disabled={!nuevoComentario.trim()}
          >
            Enviar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentSection;
