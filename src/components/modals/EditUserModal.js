import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

const EditUserModal = ({ show, onClose, usuario, handleInputChange, handleSubmit }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Editar Usuario</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label style={{ color: 'var(--azul-1)' }}>Nombre del Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleInputChange}
                required
                style={{ borderColor: 'var(--azul-2)' }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="codigo">
              <Form.Label style={{ color: 'var(--azul-1)' }}>Código</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={usuario.codigo}
                onChange={handleInputChange}
                required
                style={{ borderColor: 'var(--azul-2)' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label style={{ color: 'var(--azul-1)' }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleInputChange}
                required
                style={{ borderColor: 'var(--azul-2)' }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contrasena">
              <Form.Label style={{ color: 'var(--azul-1)' }}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={usuario.contrasena}
                onChange={handleInputChange}
                required
                style={{ borderColor: 'var(--azul-2)' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-center">
          <Col xs="auto">
            <Button
              type="submit"
              style={{
                backgroundColor: 'var(--azul-2)',
                borderColor: 'var(--azul-2)',
                color: 'white',
              }}
            >
              Actualizar Usuario
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              style={{
                backgroundColor: 'var(--gris-2)',
                borderColor: 'var(--gris-2)',
                color: 'white',
              }}
              onClick={onClose}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
  </Modal>
);

export default EditUserModal;
