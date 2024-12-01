import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useUser } from '../../context/UserContext';
import { Button } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const { user, logoutUser } = useUser();

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleNotificationsClick = () => {
    alert('En desarrollo...');
  };

  return (
    <Navbar
      expand="lg"
      className="mb-3 header-navbar"
    >
      <Navbar.Brand
        as={Link}
        to="/home"
        className="header-brand"
      >
        Explora y Colabora!
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" activeKey={activeKey} onSelect={handleSelect}>
          <Nav.Link as={Link} to="/home" eventKey="/home">
            Página Principal
          </Nav.Link>
          <Nav.Link as={Link} to="/myprojects" eventKey="/myprojects">
            Mis Proyectos
          </Nav.Link>
          <Nav.Link as={Link} to="/requests" eventKey="/requests">
            Solicitudes
          </Nav.Link>
          {/* Nuevo botón de notificaciones */}
          <Button variant="outline-light" className="ms-3" onClick={handleNotificationsClick}>
            Notificaciones
          </Button>
        </Nav>
        <DropdownButton
          id="dropdown-basic-button"
          title={user ? user.nombre : 'Usuario'}
          alignRight
          variant="light"
        >
          <Dropdown.Item as={Link} to="/user">Ver Perfil</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
        </DropdownButton>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
