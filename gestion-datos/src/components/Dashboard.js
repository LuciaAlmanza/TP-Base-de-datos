import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore"; // Para obtener documentos de Firestore
import '../styles/Dashboard.css';  // Importamos los estilos

const Dashboard = () => {
  const [entradasData, setEntradasData] = useState([]);
  const [comentariosData, setComentariosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener las entradas de la colección 'entradas' en Firestore
        const entradasSnapshot = await getDocs(collection(db, "entradas"));
        const comentariosSnapshot = await getDocs(collection(db, "comentarios"));

        // Mapear los documentos de Firestore a un formato adecuado
        const entradasList = entradasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const comentariosList = comentariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Actualizar el estado con los datos obtenidos
        setEntradasData(entradasList);
        setComentariosData(comentariosList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <section className="data-section">
        <h2>Entradas de Películas</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pelicula</th>
              <th>Sala</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Asientos Disponibles</th>
            </tr>
          </thead>
          <tbody>
            {entradasData.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.id}</td>
                <td>{entrada.pelicula}</td>
                <td>{entrada.sala}</td>
                <td>{entrada.fecha}</td>
                <td>{entrada.hora}</td>
                <td>{entrada.asientosDisponibles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="data-section">
        <h2>Comentarios y Calificaciones</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pelicula</th>
              <th>Comentario</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {comentariosData.map((comentario) => (
              <tr key={comentario.id}>
                <td>{comentario.id}</td>
                <td>{comentario.pelicula}</td>
                <td>{comentario.comentario}</td>
                <td>{comentario.calificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
