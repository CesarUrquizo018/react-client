// src/pages/RequestPage.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import Loading from '../components/common/Loading';
import RequestTabs from '../components/request/RequestTabs';
import SearchBar from '../components/common/SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function RequestPage() {
  const { user } = useUser();
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedHistory, setReceivedHistory] = useState([]);
  const [sentHistory, setSentHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const apiUrl = process.env.REACT_APP_APIURL;

  const obtenerSolicitudes = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/solicitudes`);
      if (response.status === 200) {
        const userReceivedRequests = response.data.filter(
          (solicitud) => solicitud.id_receptor === user.id_usuario && solicitud.id_estado === 1
        );
        const userSentRequests = response.data.filter(
          (solicitud) => solicitud.id_remitente === user.id_usuario && solicitud.id_estado === 1
        );
        const userReceivedHistory = response.data.filter(
          (solicitud) => solicitud.id_receptor === user.id_usuario && solicitud.id_estado !== 1
        );
        const userSentHistory = response.data.filter(
          (solicitud) => solicitud.id_remitente === user.id_usuario && solicitud.id_estado !== 1
        );

        setReceivedRequests(userReceivedRequests);
        setSentRequests(userSentRequests);
        setReceivedHistory(userReceivedHistory);
        setSentHistory(userSentHistory);
      } else {
        console.error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id_usuario, apiUrl]);

  useEffect(() => {
    if (user) {
      obtenerSolicitudes();
    }
    document.body.style.backgroundColor = 'var(--gris-1)';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [user, obtenerSolicitudes]);

  const handleAccept = async (id) => {
    try {
      await axios.post(`${apiUrl}/solicitudes/${id}/accept`);
      setMessage('Solicitud aceptada exitosamente.');
      setVariant('success');
      obtenerSolicitudes();
    } catch (error) {
      console.error('Error al aceptar la solicitud', error);
      setMessage('Error al aceptar la solicitud.');
      setVariant('danger');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`${apiUrl}/solicitudes/${id}/reject`);
      setMessage('Solicitud rechazada exitosamente.');
      setVariant('success');
      obtenerSolicitudes();
    } catch (error) {
      console.error('Error al rechazar la solicitud', error);
      setMessage('Error al rechazar la solicitud.');
      setVariant('danger');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container bg-white text-dark min-vh-100">
      <Header />
      <Container className="py-5">
        {/* Encabezado con botón de crear solicitud */}
        <Row className="align-items-center mb-4">
          <Col>
            <h1 style={{ color: 'var(--azul-1)' }}>Solicitudes</h1>
          </Col>
        </Row>

        {/* Barra de búsqueda */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Mensaje de alerta */}
        {message && (
          <Alert variant={variant} onClose={() => setMessage('')} dismissible>
            {message}
          </Alert>
        )}

        {/* Pestañas de solicitudes */}
        <RequestTabs
          sentRequests={sentRequests}
          receivedRequests={receivedRequests}
          sentHistory={sentHistory}
          receivedHistory={receivedHistory}
          onAccept={handleAccept}
          onReject={handleReject}
          searchQuery={searchQuery} // Pasamos el estado de búsqueda para filtrar
        />
      </Container>
    </div>
  );
}

export default RequestPage;
