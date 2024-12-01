// src/components/auth/CreateUserForm.js
import React from 'react';
import { Form, Button} from 'react-bootstrap';

function CreateUserForm({
  username,
  setUsername,
  codigo,
  setCodigo,
  email,
  setEmail,
  celular,
  setCelular,
  password,
  setPassword,
  handleSubmit,
  handleGoToLogin, // Nueva prop para manejar el botón de regreso al login
}) {
  return (
    <Form
      onSubmit={handleSubmit}
      className="w-100"
      style={{ fontSize: '0.9rem', padding: '10px' }}
    >
      <Form.Group className="mb-3" controlId="username">
        <Form.Label className="text-dark">Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="codigo">
        <Form.Label className="text-dark">Código</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label className="text-dark">Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="celular">
        <Form.Label className="text-dark">Celular</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su número de celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label className="text-dark">Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button type="submit" variant="primary">
          Crear Cuenta
        </Button>
        <Button onClick={handleGoToLogin} variant="secondary">
          Regresar
        </Button>
      </div>
    </Form>

  );
}

export default CreateUserForm;
