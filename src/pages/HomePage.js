import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

import Container from 'react-bootstrap/Container';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/common/SearchBar';
import ProjectWithComments from '../components/project/ProjectWithComments';
import Loading from '../components/common/Loading';
import SolicitudModal from '../components/modals/SolicitudModal';

function HomePage() {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('nombre');
  const apiUrl = process.env.REACT_APP_APIURL;

  const obtenerProyectos = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/proyectos`);
      if (response.status === 200) {
        setProyectos(response.data);
        setFilteredProjects(response.data);
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    obtenerProyectos();
  }, [obtenerProyectos]);

  useEffect(() => {
    const filtered = proyectos.filter((proyecto) => {
      if (filterType === 'nombre') {
        return proyecto.titulo && proyecto.titulo.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (filterType === 'creador') {
        return proyecto.creador && proyecto.creador.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
    setFilteredProjects(filtered);
  }, [searchQuery, proyectos, filterType]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container bg-white text-dark min-vh-100">
      <Header />
      <Container className="py-5">
        <h1 className="mb-4 text-dark">Lista de Proyectos</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        {filteredProjects.map((proyecto) => (
          <ProjectWithComments
            key={proyecto.id_proyecto}
            proyecto={proyecto}
            apiUrl={apiUrl}
            user={user}
          />
        ))}
        <SolicitudModal
          showModal={showModal}
          handleCloseModal={() => setShowModal(false)}
          mensaje={mensaje}
          setMensaje={setMensaje}
          enviarSolicitud={() => {
            // Lógica para enviar solicitud
          }}
        />
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
