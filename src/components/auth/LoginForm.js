import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginForm = ({ onSubmit, email, setEmail, contrasena, setContrasena, onForgotPassword }) => {
  return (
    <Form
      onSubmit={(e) => onSubmit(false, e)}
      className="w-100"
      style={{ maxWidth: '100%', fontSize: '1rem' }}
    >
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label className="text-dark" style={{ fontSize: '1.2rem' }}>
          Correo electrónico:
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Colocar correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ fontSize: '1.1rem', padding: '12px' }}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label className="text-dark" style={{ fontSize: '1.2rem' }}>
          Contraseña:
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Colocar contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          style={{ fontSize: '1.1rem', padding: '12px' }}
        />
      </Form.Group>

      <Row className="mb-4 d-flex justify-content-center">
        <Col xs="auto">
          <Button
            variant="primary"
            type="submit"
            className="me-2"
            style={{ fontSize: '1.2rem', padding: '12px 24px' }}
          >
            LOGIN
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => onSubmit(true)}
            style={{ fontSize: '1.2rem', padding: '12px 24px' }}
          >
            CREAR CUENTA
          </Button>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col xs="auto">
          <Button variant="link" onClick={onForgotPassword} style={{ fontSize: '1rem' }}>
            ¿Olvidaste tu contraseña?
          </Button>
        </Col>
      </Row>
    </Form>

  );
};

export default LoginForm;
