// src/components/RequestTabs.js
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import RequestCard from './RequestCard';

const RequestTabs = ({
  sentRequests,
  receivedRequests,
  sentHistory,
  receivedHistory,
  onAccept,
  onReject,
}) => (
  <Tabs defaultActiveKey="sent" className="mb-3">
    <Tab eventKey="sent" title="Enviadas">
      {sentRequests.length === 0 ? (
        <p>No has enviado ninguna solicitud</p>
      ) : (
        sentRequests.map((solicitud) => (
          <RequestCard key={solicitud.id_solicitud} solicitud={solicitud} />
        ))
      )}
    </Tab>
    <Tab eventKey="received" title="Recibidas">
      {receivedRequests.length === 0 ? (
        <p>No tienes solicitudes pendientes</p>
      ) : (
        receivedRequests.map((solicitud) => (
          <RequestCard
            key={solicitud.id_solicitud}
            solicitud={solicitud}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
      )}
    </Tab>
    <Tab eventKey="history" title="Historial">
      <h2>Enviadas</h2>
      {sentHistory.length === 0 ? (
        <p>No hay historial de solicitudes enviadas</p>
      ) : (
        sentHistory.map((solicitud) => (
          <RequestCard key={solicitud.id_solicitud} solicitud={solicitud} />
        ))
      )}
      <h2>Recibidas</h2>
      {receivedHistory.length === 0 ? (
        <p>No hay historial de solicitudes recibidas</p>
      ) : (
        receivedHistory.map((solicitud) => (
          <RequestCard key={solicitud.id_solicitud} solicitud={solicitud} />
        ))
      )}
    </Tab>
  </Tabs>
);

export default RequestTabs;
