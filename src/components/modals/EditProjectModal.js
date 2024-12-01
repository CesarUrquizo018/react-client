// src/components/modals/EditProjectModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const EditProjectModal = ({ show, onClose, projectId, apiUrl, onProjectUpdated }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [curso, setCurso] = useState('');

  useEffect(() => {
    if (projectId) {
      const fetchProyecto = async () => {
        try {
          const response = await axios.get(`${apiUrl}/proyectos/${projectId}`);
          const { titulo, descripcion, ciclo, curso } = response.data;
          setTitulo(titulo);
          setDescripcion(descripcion);
          setCiclo(ciclo);
          setCurso(curso);
        } catch (error) {
          console.error('Error al obtener el proyecto:', error);
        }
      };
      fetchProyecto();
    }
  }, [projectId, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const proyecto = { titulo, descripcion, ciclo, curso };
      await axios.put(`${apiUrl}/proyectos/${projectId}`, proyecto);
      onProjectUpdated(); // Llama a esta función para actualizar la lista de proyectos en MyProjectsPage
      onClose(); // Cierra el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Título del Proyecto:</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ciclo:</Form.Label>
            <Form.Control
              type="number"
              value={ciclo}
              onChange={(e) => setCiclo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Curso:</Form.Label>
            <Form.Control
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="primary" type="submit">
              Actualizar Proyecto
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProjectModal;
