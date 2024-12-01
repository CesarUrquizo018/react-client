// src/components/modals/CreateProjectModal.js
import React, { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const CreateProjectModal = ({ show, onClose, onProjectCreated, apiUrl }) => {
  const { user } = useUser();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [curso, setCurso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const proyecto = {
        titulo,
        descripcion,
        fecha_creacion: new Date().toISOString().slice(0, 10),
        ciclo,
        curso,
        id_usuario: user.id_usuario,
      };

      const response = await axios.post(`${apiUrl}/proyectos`, proyecto);
      if (response.status === 201) {
        onProjectCreated(); // Refresca la lista de proyectos en MyProjectsPage
        onClose(); // Cierra el modal después de la creación
      } else {
        console.error('Error al crear el proyecto');
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTitulo" className="mb-3">
                <Form.Label style={{ color: 'var(--azul-1)' }}>Título del Proyecto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Título del proyecto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  style={{ borderColor: 'var(--azul-2)' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDescripcion" className="mb-3">
                <Form.Label style={{ color: 'var(--azul-1)' }}>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción del proyecto"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  style={{ borderColor: 'var(--azul-2)' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCiclo" className="mb-3">
                <Form.Label style={{ color: 'var(--azul-1)' }}>Ciclo Académico</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ciclo académico"
                  value={ciclo}
                  onChange={(e) => setCiclo(e.target.value)}
                  required
                  style={{ borderColor: 'var(--azul-2)' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCurso" className="mb-3">
                <Form.Label style={{ color: 'var(--azul-1)' }}>Curso Relacionado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Curso relacionado"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  required
                  style={{ borderColor: 'var(--azul-2)' }}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center mt-3">
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: 'var(--azul-2)', border: 'none' }}
            >
              Crear Proyecto
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProjectModal;
