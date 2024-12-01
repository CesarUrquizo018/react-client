import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Header from '../components/layout/Header';
import AnotacionCard from '../components/cards/AnotacionCard';
import FuenteCard from '../components/cards/FuenteCard';
import OtroCard from '../components/cards/OtroCard';
import CustomModal from '../components/common/CustomModal';
import ProjectCard3 from '../components/project/ProjectCard3';

function DetailsProjectPage() {
  const { user } = useUser();
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [anotaciones, setAnotaciones] = useState([]);
  const [fuentes, setFuentes] = useState([]);
  const [otros, setOtros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [newFuente, setNewFuente] = useState({
    NombreFuente: '',
    DescripcionFuente: '',
    URLFuente: '',
  });

  const apiUrl = process.env.REACT_APP_APIURL;

  const fetchDetails = useCallback(async () => {
    try {
      const [projectResponse, anotacionesResponse, fuentesResponse, otrosResponse] = await Promise.all([
        axios.get(`${apiUrl}/proyectos/${id}`),
        axios.get(`${apiUrl}/anotacion/proyecto/${id}`),
        axios.get(`${apiUrl}/fuente/proyecto/${id}`),
        axios.get(`${apiUrl}/otro/proyecto/${id}`),
      ]);

      if (
        projectResponse.status === 200 &&
        anotacionesResponse.status === 200 &&
        fuentesResponse.status === 200 &&
        otrosResponse.status === 200
      ) {
        setProyecto(projectResponse.data);
        setAnotaciones(anotacionesResponse.data);
        setFuentes(fuentesResponse.data);
        setOtros(otrosResponse.data);
        setError(null);
      } else {
        throw new Error('Error al cargar los detalles del proyecto.');
      }
    } catch (error) {
      console.error('Error al cargar detalles:', error);
      setError('No se pudo cargar la información del proyecto.');
    } finally {
      setLoading(false);
    }
  }, [id, apiUrl]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleSaveFuente = async () => {
    try {
      if (selectedItem) {
        // Actualizar fuente
        await axios.put(`${apiUrl}/fuente/${selectedItem.id_fuente}`, newFuente);
      } else {
        // Crear nueva fuente
        await axios.post(`${apiUrl}/fuente`, {
          ...newFuente,
          id_proyecto: id,
        });
      }

      alert('Fuente guardada correctamente');
      setShowEditModal(false);
      fetchDetails();
    } catch (error) {
      console.error('Error al guardar la fuente:', error);
      alert('Error al guardar la fuente');
    }
  };

  const handleAddFuente = () => {
    setModalType('fuente');
    setNewFuente({ NombreFuente: '', DescripcionFuente: '', URLFuente: '' });
    setSelectedItem(null);
    setShowEditModal(true);
  };

  if (loading) return <div className="text-center">Cargando...</div>;

  if (error) {
    return (
      <div className="text-center">
        <h2>Error</h2>
        <p>{error}</p>
        <Button variant="primary" as={Link} to="/myprojects">
          Volver a mis proyectos
        </Button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-5">
        {/* Card Principal usando ProjectCard3 */}
        <ProjectCard3 proyecto={proyecto} user={user} />

        {/* Cards Secundarias */}
        <AnotacionCard anotaciones={anotaciones} onEdit={() => {}} onAdd={() => {}} />
        <FuenteCard
          fuentes={fuentes}
          onEdit={(fuente) => {
            setSelectedItem(fuente);
            setModalType('fuente');
            setNewFuente({
              NombreFuente: fuente.NombreFuente,
              DescripcionFuente: fuente.DescripcionFuente,
              URLFuente: fuente.URLFuente,
            });
            setShowEditModal(true);
          }}
          onAdd={handleAddFuente}
        />
        <OtroCard otros={otros} onEdit={() => {}} onAdd={() => {}} />
      </Container>

      {/* Modal de Edición */}
      <CustomModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        title={selectedItem ? `Editar Fuente` : `Añadir Fuente`}
        fields={[
          { name: 'NombreFuente', label: 'Nombre de la Fuente', type: 'text' },
          { name: 'DescripcionFuente', label: 'Descripción de la Fuente', type: 'text' },
          { name: 'URLFuente', label: 'URL de la Fuente', type: 'text' },
        ]}
        values={newFuente}
        onChange={(field, value) =>
          setNewFuente((prev) => ({
            ...prev,
            [field]: value,
          }))
        }
        onSave={handleSaveFuente}
      />
    </>
  );
}

export default DetailsProjectPage;
