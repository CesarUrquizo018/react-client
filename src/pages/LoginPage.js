import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import iniciarSesionImage from '../images/iniciar_sesion.png';
import fondoImage from '../images/fondo.jpg';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import LoginForm from '../components/auth/LoginForm';
import Message from '../components/common/Message';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal'; // Nuevo componente

function LoginPage() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false); // Estado para mostrar el modal
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const apiUrl = process.env.REACT_APP_APIURL;

  useEffect(() => {
    document.body.style.backgroundImage = `url(${fondoImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const handleSubmit = async (isCreate = false, e = null) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (isCreate) {
      navigate('/register');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        contrasena,
      });
      const { usuario, token } = response.data;

      loginUser(usuario, token); // Guarda el usuario y el token en el contexto
      setMessage('Inicio de sesión exitoso');
      navigate('/home');
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : 'Error de conexión'
      );
    }
  };

  return (
    <div className="bg-white text-dark vh-100 d-flex align-items-center justify-content-center">
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ maxHeight: '100vh', padding: '0 20px' }}
      >
        <div
          style={{
            border: '2px solid var(--gris-2)',
            padding: '40px',
            borderRadius: '15px',
            backgroundColor: 'var(--gris-1)',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <h1 className="mb-4 text-dark text-center" style={{ fontSize: '2rem' }}>
            INICIAR SESIÓN
          </h1>
          <div className="d-flex justify-content-center mb-4">
            <Image
              src={iniciarSesionImage}
              roundedCircle
              style={{ width: '120px', height: '120px' }}
            />
          </div>

          <LoginForm
            onSubmit={(isCreate, e) => handleSubmit(isCreate, e)}
            email={email}
            setEmail={setEmail}
            contrasena={contrasena}
            setContrasena={setContrasena}
            onForgotPassword={() => setShowForgotModal(true)} // Llamada al modal
          />

          <Message message={message} />
        </div>
      </Container>

      {/* Modal para "Olvidé mi contraseña" */}
      <ForgotPasswordModal
        show={showForgotModal}
        onHide={() => setShowForgotModal(false)}
      />
    </div>


  );
}

export default LoginPage;
