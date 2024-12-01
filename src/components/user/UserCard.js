import React, { useState } from 'react';
import { Row, Col, Card, Button, Image } from 'react-bootstrap';
import usuarioImg from '../../images/usuario.png';

const UserCard = ({ user, onEditUser }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card
      style={{
        backgroundColor: 'var(--gris-1)', // Fondo claro
        border: '2px solid var(--gris-2)',
        borderRadius: '10px',
      }}
    >
      <Card.Body>
        <Row className="align-items-center">
          <Col md={3} className="text-center">
            <Image
              src={usuarioImg}
              roundedCircle
              fluid
              style={{ width: '150px', height: '150px' }}
            />
            <Card.Title
              className="mt-3"
              style={{ fontSize: '1.5rem', color: 'var(--azul-1)' }}
            >
              ¡BIENVENIDO {user.nombre}!
            </Card.Title>
          </Col>
          <Col md={9}>
            <Card.Text style={{ fontSize: '1.2rem', color: 'var(--azul-1)' }}>
              <strong>ID:</strong> {user.id_usuario}
            </Card.Text>
            <Card.Text style={{ fontSize: '1.2rem', color: 'var(--azul-1)' }}>
              <strong>Código:</strong> {user.codigo}
            </Card.Text>
            <Card.Text style={{ fontSize: '1.2rem', color: 'var(--azul-1)' }}>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text style={{ fontSize: '1.2rem', color: 'var(--azul-1)' }}>
              <strong>Contraseña:</strong>{' '}
              {showPassword ? user.contrasena : '********'}
            </Card.Text>
            <Button
              onClick={toggleShowPassword}
              className="me-2"
              style={{
                backgroundColor: 'var(--azul-2)',
                borderColor: 'var(--azul-2)',
                color: 'white',
              }}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
            </Button>
            <Button
              onClick={onEditUser} // Usamos onEditUser para abrir el modal
              style={{
                backgroundColor: 'var(--gris-2)',
                borderColor: 'var(--gris-2)',
                color: 'white',
              }}
            >
              Editar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
