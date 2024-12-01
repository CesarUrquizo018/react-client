import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import Loading from '../components/common/Loading';
import ProjectCard from '../components/project/ProjectCard2';
import SearchBar from '../components/common/SearchBar';
import EditProjectModal from '../components/modals/EditProjectModal';
import CreateProjectModal from '../components/modals/CreateProjectModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';

function MyProjectsPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const apiUrl = process.env.REACT_APP_APIURL;

  const obtenerProyectos = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/proyectos/mis-proyectos/${user.id_usuario}`
      );
      if (response.status === 200) {
        setProyectos(response.data);
        setFilteredProjects(response.data);
      } else {
        console.error('Error al obtener los proyectos');
      }
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id_usuario, apiUrl]);

  useEffect(() => {
    if (user) {
      obtenerProyectos();
    }
    document.body.style.backgroundColor = 'var(--gris-1)';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [user, obtenerProyectos]);

  useEffect(() => {
    const filtered = proyectos.filter((proyecto) =>
      proyecto.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, proyectos]);

  const handleCardClick = (id) => {
    navigate(`/project-details/${id}`);
  };

  const handleEditProject = (id) => {
    setSelectedProjectId(id);
    setShowEditModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        const response = await axios.delete(`${apiUrl}/proyectos/${id}`);
        if (response.status === 200) {
          setProyectos(proyectos.filter((proyecto) => proyecto.id_proyecto !== id));
          alert('Proyecto eliminado exitosamente.');
        } else {
          console.error('Error al borrar el proyecto');
        }
      } catch (error) {
        console.error('Error al borrar el proyecto:', error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container bg-white text-dark min-vh-100">
      <Header />
      <Container className="py-5">
        <Row className="align-items-center mb-4">
          <Col>
            <h1 style={{ color: 'var(--azul-1)' }}>Mis Proyectos</h1>
          </Col>
          <Col xs="auto">
            <Button
              variant="success"
              className="rounded-circle p-3"
              style={{
                backgroundColor: 'var(--naranja)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
              }}
              onClick={() => setShowCreateModal(true)}
            >
              <FaPlus style={{ color: 'var(--gris-1)' }} />
            </Button>
          </Col>
        </Row>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Row>
          {filteredProjects.map((proyecto) => (
            <Col key={proyecto.id_proyecto} md={4} className="d-flex">
              <ProjectCard
                proyecto={proyecto}
                onCardClick={handleCardClick}
                onEditProject={handleEditProject}
                onDeleteProject={handleDeleteProject}
              />
            </Col>
          ))}
        </Row>

        <EditProjectModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          projectId={selectedProjectId}
          apiUrl={apiUrl}
          onProjectUpdated={obtenerProyectos}
        />

        <CreateProjectModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          apiUrl={apiUrl}
          onProjectCreated={obtenerProyectos}
        />
      </Container>
    </div>
  );
}

export default MyProjectsPage;
