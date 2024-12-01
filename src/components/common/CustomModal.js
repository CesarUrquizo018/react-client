import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CustomModal = ({ show, onHide, title, fields, values, onChange, onSave }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            </Form.Group>
          ))}
          <Button variant="primary" onClick={onSave}>
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={onHide} className="ms-2">
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
