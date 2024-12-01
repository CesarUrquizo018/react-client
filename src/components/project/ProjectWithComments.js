import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import CommentSection from '../common/CommentSection';
import axios from 'axios';

function ProjectWithComments({ proyecto, apiUrl, user }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  // Obtener comentarios al cargar el componente
  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comentarios/proyecto/${proyecto.id_proyecto}`);
        if (response.status === 200) {
          setComentarios(response.data);
        }
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
      }
    };
    obtenerComentarios();
  }, [apiUrl, proyecto.id_proyecto]);

  const agregarComentario = async () => {
    try {
      const nuevo = {
        contenido: nuevoComentario,
        id_usuario: user.id_usuario,
        id_proyecto: proyecto.id_proyecto,
        fecha_comentario: new Date().toISOString(),
      };

      const response = await axios.post(`${apiUrl}/comentarios`, nuevo);
      if (response.status === 201) {
        setComentarios((prevComentarios) => [response.data, ...prevComentarios]);
        setNuevoComentario('');
      }
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <div className="mb-5">
      {/* Tarjeta del proyecto */}
      <ProjectCard proyecto={proyecto} />

      {/* Sección de comentarios */}
      <CommentSection
        comentarios={comentarios} // Lista de comentarios del proyecto
        nuevoComentario={nuevoComentario} // Texto del nuevo comentario
        onChangeComentario={(e) => setNuevoComentario(e.target.value)} // Evento para capturar texto
        onAgregarComentario={agregarComentario} // Lógica para agregar comentario
      />
    </div>
  );
}

export default ProjectWithComments;
