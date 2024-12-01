import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import UserCard from '../components/user/UserCard';
import EditUserModal from '../components/modals/EditUserModal';
import Container from 'react-bootstrap/Container';

function UserPage() {
  const { user, loginUser } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const apiUrl = process.env.REACT_APP_APIURL;
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Redirige al login si no hay usuario logueado
    if (!user || !user.id_usuario) {
      navigate('/login');
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`${apiUrl}/usuarios/${user.id_usuario}`);
        setUsuario(response.data); // Establece el estado con los datos del usuario obtenidos
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    // Llama a la API para obtener la información del usuario al cargar el componente
    if (user && user.id_usuario) {
      fetchUsuario();
    }
  }, [apiUrl, user, navigate]);

  const handleEditUser = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la llamada a la API para actualizar el usuario
      await axios.put(`${apiUrl}/usuarios/${user.id_usuario}`, usuario);
      loginUser(usuario); // Actualiza el contexto con los nuevos datos del usuario
      setShowEditModal(false); // Cierra el modal después de la actualización
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div className="page-container bg-white text-white min-vh-100">
      <Header />
      <Container className="mt-4">
        {usuario && (
          <>
            <UserCard user={usuario} onEditUser={handleEditUser} />
            <EditUserModal
              show={showEditModal}
              onClose={handleCloseModal}
              usuario={usuario}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </Container>
    </div>
  );
}

export default UserPage;
