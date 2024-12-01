import React, { useState } from 'react';
import { Form, FormControl, Button, Modal } from 'react-bootstrap';

const SearchBar = ({ searchQuery, setSearchQuery, filterType, setFilterType }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setShowFilterModal(false); // Cerrar modal después de seleccionar un filtro
  };

  return (
    <>
      <Form className="d-flex mb-4">
        <FormControl
          type="text"
          placeholder={
            filterType === 'nombre'
              ? 'Buscar proyectos por nombre...'
              : 'Buscar proyectos por creador...'
          }
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ fontSize: '1.1rem', padding: '10px' }}
        />
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => setShowFilterModal(true)}
        >
          Filtrar
        </Button>
      </Form>

      {/* Modal para seleccionar tipo de filtro */}
      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Filtro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              id="filtro-nombre"
              label="Filtrar por nombre del proyecto"
              name="filter"
              value="nombre"
              checked={filterType === 'nombre'}
              onChange={handleFilterChange}
            />
            <Form.Check
              type="radio"
              id="filtro-creador"
              label="Filtrar por creador del proyecto"
              name="filter"
              value="creador"
              checked={filterType === 'creador'}
              onChange={handleFilterChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchBar;
