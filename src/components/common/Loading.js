// src/components/Loading.js
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      height: '100vh',
      backgroundColor: 'var(--gris-1)',
    }}
  >
    <Spinner
      animation="border"
      role="status"
      style={{ color: 'var(--azul-2)' }}
    >
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
  </div>
);

export default Loading;
