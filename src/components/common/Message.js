// src/components/Message.js
import React from 'react';

const Message = ({ message }) => {
  return message ? (
    <p
      className="text-dark"
      style={{ fontSize: '1.1rem', textAlign: 'center' }}
    >
      {message}
    </p>
  ) : null;
};

export default Message;
