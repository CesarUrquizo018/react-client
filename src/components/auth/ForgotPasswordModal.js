import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ForgotPasswordModal = ({ show, onHide }) => {
  const [email, setEmail] = useState(''); // Estado para el email
  const [message, setMessage] = useState(''); // Estado para el mensaje

  // Función para manejar el envío del formulario
  const handleSend = (e) => {
    e.preventDefault();
    setMessage('Se ha enviado un correo para restablecer tu contraseña.'); // Mensaje de confirmación
    // Lógica para enviar el correo electrónico (vacío por ahora)
    setTimeout(() => {
      setMessage('');
      onHide(); // Cierra el modal después de mostrar el mensaje
    }, 3000); // Mantener el mensaje visible por 3 segundos
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recuperar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Mensaje de confirmación */}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSend}>
          <Form.Group className="mb-3" controlId="forgotPasswordEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
