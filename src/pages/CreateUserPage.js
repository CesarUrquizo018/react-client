// src/pages/CreateUserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userImage from '../images/agregar-usuario.png';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import CreateUserForm from '../components/auth/CreateUserForm';
import Message from '../components/common/Message';

function CreateUserPage() {
  const [username, setUsername] = useState('');
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_APIURL;

  const defaultProfilePhoto = `${username}.jpg`;

  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        {
          nombre: username,
          codigo: codigo,
          email: email,
          celular: celular, 
          contrasena: password,
          foto_perfil: defaultProfilePhoto,
        }
      );
      setMessage(response.data.message);
      navigate('/home');
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : 'Error de conexión'
      );
    }
  };

  const handleGoToLogin = () => {
    navigate('/login'); // Navega al login
  };

  return (
    <div className="bg-white text-dark vh-100 d-flex align-items-center justify-content-center">
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ maxHeight: '100vh', padding: '0 15px' }}
      >
        <div
          style={{
            border: '1px solid #000000',
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: '#f8f9fa',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h1 className="mb-3 text-dark text-center" style={{ fontSize: '1.5rem' }}>Crear Usuario</h1>
          <div className="d-flex justify-content-center mb-3">
            <Image
              src={userImage}
              roundedCircle
              style={{ width: '80px', height: '80px' }}
            />
          </div>

          <CreateUserForm
            username={username}
            setUsername={setUsername}
            codigo={codigo}
            setCodigo={setCodigo}
            email={email}
            setEmail={setEmail}
            celular={celular}
            setCelular={setCelular}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            handleGoToLogin={handleGoToLogin}
          />

          <Message message={message} />
        </div>
      </Container>
    </div>

  );
  
}

export default CreateUserPage;
