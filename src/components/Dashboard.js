import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [entradasData, setEntradasData] = useState([]);
  const [comentariosData, setComentariosData] = useState([]);
  const [newEntrada, setNewEntrada] = useState({
    pelicula: '',
    sala: '',
    fecha: '',
    hora: '',
    asientosDisponibles: ''
  });
  const [newComentario, setNewComentario] = useState({
    pelicula: '',
    comentario: '',
    calificacion: ''
  });
  const [editingEntrada, setEditingEntrada] = useState(null);
  const [editingComentario, setEditingComentario] = useState(null);

  // Fetch inicial para cargar datos de ambas bases de datos
  useEffect(() => {
    
    console.log('useEffect se ejecutó');
    const fetchData = async () => {
      try {
        // Fetch de entradas desde el backend (debe apuntar a la ruta del servidor en el puerto 3000)
        const entradasResponse = await axios.get('http://localhost:3000/api/entradas');  // URL de la API
        setEntradasData(entradasResponse.data);  // Guarda las entradas en el estado
  
        // Fetch de comentarios desde Firebase (esto sigue igual)
        const comentariosSnapshot = await getDocs(collection(db, 'comentarios'));
        const comentariosList = comentariosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Comentarios obtenidos:', comentariosList);  // Verifica los datos aquí
        setComentariosData(comentariosList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);  

  // Función para agregar una nueva entrada (MySQL)
  const handleAddEntrada = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/entradas', newEntrada);  // URL de la API
      setEntradasData([...entradasData, response.data]);  // Añadir la nueva entrada a la lista
      setNewEntrada({ pelicula: '', sala: '', fecha: '', hora: '', asientosDisponibles: '' });  // Limpiar formulario
    } catch (error) {
      console.error('Error adding entrada: ', error);
    }
  };

  // Función para agregar un nuevo comentario (Firebase)
  const handleAddComentario = async () => {
    try {
      const docRef = await addDoc(collection(db, 'comentarios'), newComentario);
      setComentariosData([...comentariosData, { id: docRef.id, ...newComentario }]);
      setNewComentario({ pelicula: '', comentario: '', calificacion: '' });
    } catch (error) {
      console.error('Error adding comentario: ', error);
    }
  };

  // Función para actualizar una entrada (MySQL)
  const handleUpdateEntrada = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/entradas/${editingEntrada.id}`, editingEntrada);
      setEntradasData(
        entradasData.map((entrada) =>
          entrada.id === editingEntrada.id ? { ...entrada, ...editingEntrada } : entrada
        )
      );
      setEditingEntrada(null);  // Limpiar el estado de edición
    } catch (error) {
      console.error('Error updating entrada: ', error);
    }
  };
  // Función para actualizar un comentario (Firebase)
  const handleUpdateComentario = async () => {
    try {
      const comentarioRef = doc(db, 'comentarios', editingComentario.id);
      await updateDoc(comentarioRef, editingComentario);
      setComentariosData(
        comentariosData.map((comentario) =>
          comentario.id === editingComentario.id ? { ...comentario, ...editingComentario } : comentario
        )
      );
      setEditingComentario(null);
    } catch (error) {
      console.error('Error updating comentario: ', error);
    }
  };

  // Función para eliminar una entrada (MySQL)
  const handleDeleteEntrada = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/entradas/${id}`);
      setEntradasData(entradasData.filter((entrada) => entrada.id !== id));  // Eliminar entrada de la lista
    } catch (error) {
      console.error('Error deleting entrada: ', error);
    }
  };

  // Función para eliminar un comentario (Firebase)
  const handleDeleteComentario = async (id) => {
    try {
      await deleteDoc(doc(db, 'comentarios', id));
      setComentariosData(comentariosData.filter((comentario) => comentario.id !== id));
    } catch (error) {
      console.error('Error deleting comentario: ', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sección para agregar entradas */}
      <section className="data-section">
        <h2>{editingEntrada ? 'Editar Entrada' : 'Agregar Nueva Entrada'}</h2>
        <input
          type="text"
          placeholder="Película"
          value={editingEntrada ? editingEntrada.pelicula : newEntrada.pelicula}
          onChange={(e) =>
            editingEntrada
              ? setEditingEntrada({ ...editingEntrada, pelicula: e.target.value })
              : setNewEntrada({ ...newEntrada, pelicula: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Sala"
          value={editingEntrada ? editingEntrada.sala : newEntrada.sala}
          onChange={(e) =>
            editingEntrada
              ? setEditingEntrada({ ...editingEntrada, sala: e.target.value })
              : setNewEntrada({ ...newEntrada, sala: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Fecha"
          value={editingEntrada ? editingEntrada.fecha : newEntrada.fecha}
          onChange={(e) =>
            editingEntrada
              ? setEditingEntrada({ ...editingEntrada, fecha: e.target.value })
              : setNewEntrada({ ...newEntrada, fecha: e.target.value })
          }
        />
        <input
          type="time"
          placeholder="Hora"
          value={editingEntrada ? editingEntrada.hora : newEntrada.hora}
          onChange={(e) =>
            editingEntrada
              ? setEditingEntrada({ ...editingEntrada, hora: e.target.value })
              : setNewEntrada({ ...newEntrada, hora: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Asientos Disponibles"
          value={editingEntrada ? editingEntrada.asientosDisponibles : newEntrada.asientosDisponibles}
          onChange={(e) =>
            editingEntrada
              ? setEditingEntrada({ ...editingEntrada, asientosDisponibles: e.target.value })
              : setNewEntrada({ ...newEntrada, asientosDisponibles: e.target.value })
          }
        />
        <button onClick={editingEntrada ? handleUpdateEntrada : handleAddEntrada} className="action-btn">
          {editingEntrada ? 'Actualizar Entrada' : 'Agregar Entrada'}
        </button>
      </section>

      {/* Sección para agregar comentarios */}
      <section className="data-section">
        <h2>{editingComentario ? 'Editar Comentario' : 'Agregar Nuevo Comentario'}</h2>
        <input
          type="text"
          placeholder="Película"
          value={editingComentario ? editingComentario.pelicula : newComentario.pelicula}
          onChange={(e) =>
            editingComentario
              ? setEditingComentario({ ...editingComentario, pelicula: e.target.value })
              : setNewComentario({ ...newComentario, pelicula: e.target.value })
          }
        />
        <textarea
          placeholder="Comentario"
          value={editingComentario ? editingComentario.comentario : newComentario.comentario}
          onChange={(e) =>
            editingComentario
              ? setEditingComentario({ ...editingComentario, comentario: e.target.value })
              : setNewComentario({ ...newComentario, comentario: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Calificación"
          value={editingComentario ? editingComentario.calificacion : newComentario.calificacion}
          onChange={(e) =>
            editingComentario
              ? setEditingComentario({ ...editingComentario, calificacion: e.target.value })
              : setNewComentario({ ...newComentario, calificacion: e.target.value })
          }
        />
        <button onClick={editingComentario ? handleUpdateComentario : handleAddComentario} className="action-btn">
          {editingComentario ? 'Actualizar Comentario' : 'Agregar Comentario'}
        </button>
      </section>

      {/* Sección de Entradas (Tabla) */}
      <section className="data-section">
        <h2>Entradas de Películas</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Pelicula</th>
              <th>Sala</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Asientos Disponibles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {entradasData.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.pelicula}</td>
                <td>{entrada.sala}</td>
                <td>{entrada.fecha}</td>
                <td>{entrada.hora}</td>
                <td>{entrada.asientosDisponibles}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingEntrada(entrada);
                      setNewEntrada(entrada); // Copiar los valores para el formulario
                    }}
                    className="action-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEntrada(entrada.id)}
                    className="action-btn delete-btn"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sección de Comentarios (Tabla) */}
      <section className="data-section">
        <h2>Comentarios</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Pelicula</th>
              <th>Comentario</th>
              <th>Calificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {comentariosData.map((comentario) => (
              <tr key={comentario.id}>
                <td>{comentario.pelicula}</td>
                <td>{comentario.comentario}</td>
                <td>{comentario.calificacion}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingComentario(comentario);
                      setNewComentario(comentario); // Copiar los valores para el formulario
                    }}
                    className="action-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteComentario(comentario.id)}
                    className="action-btn delete-btn"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;





