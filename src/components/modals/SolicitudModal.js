// src/components/SolicitudModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function SolicitudModal({
  showModal,
  handleCloseModal,
  mensaje,
  setMensaje,
  enviarSolicitud,
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: 'var(--azul-1)', color: 'var(--gris-1)' }}
      >
        <Modal.Title>Enviar Solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="mensaje">
            <Form.Label style={{ color: 'var(--azul-1)' }}>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              style={{ borderColor: 'var(--azul-2)' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseModal}
          style={{ backgroundColor: 'var(--gris-2)', border: 'none' }}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => enviarSolicitud()}
          style={{
            backgroundColor: 'var(--azul-2)',
            borderColor: 'var(--azul-2)',
          }}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SolicitudModal;
