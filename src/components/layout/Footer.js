import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col>
            <p>&copy; {new Date().getFullYear()} WeColab. Todos los derechos reservados.</p>
          </Col>
          <Col>
            <p>
              <a href="/user" className="text-white text-decoration-none">
                Términos y Condiciones
              </a>{' '}
              |{' '}
              <a href="/user" className="text-white text-decoration-none">
                Política de Privacidad
              </a>
            </p>
          </Col>
          <Col>
            <p>
              Contacto: <a href="mailto:soporte@wecolab.com" className="text-white">soporte@wecolab.com</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
