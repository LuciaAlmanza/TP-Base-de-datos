const { fetchData, addData, deleteData, updateData } = require('../models/sqlModel');

// Función para obtener todos los datos de la tabla 'entradas'
const fetchDataFromMySQL = async () => {
  return new Promise((resolve, reject) => {
    fetchData((error, results) => {
      if (error) {
        console.error("Error obteniendo entradas:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Función para añadir una entrada
const handleAddToMySQL = async (pelicula, sala, fecha, hora, asientosDisponibles) => {
  return new Promise((resolve, reject) => {
    if (
      pelicula.trim() &&
      Number.isInteger(sala) &&
      isValidDate(fecha) &&
      isValidTime(hora) &&
      Number.isInteger(asientosDisponibles) &&
      asientosDisponibles >= 0
    ) {
      addData(pelicula, sala, formatDate(fecha), hora, asientosDisponibles, (error) => {
        if (error) {
          console.error("Error agregando entrada:", error);
          reject(error);
        } else {
          resolve({ message: 'Entrada añadida con éxito' });
        }
      });
    } else {
      reject("Todos los campos son requeridos.");
    }
  });
};

// Función para borrar una entrada
const handleDeleteFromMySQL = async (id) => {
  return new Promise((resolve, reject) => {
    deleteData(id, (error) => {
      if (error) {
        console.error("Error eliminando entrada:", error);
        reject(error);
      } else {
        resolve({ message: 'Entrada eliminada con éxito' });
      }
    });
  });
};

// Función para actualizar una entrada
const handleUpdateInMySQL = async (id, pelicula, sala, fecha, hora, asientosDisponibles) => {
  return new Promise((resolve, reject) => {
    if (
      pelicula.trim() &&
      Number.isInteger(sala) &&
      isValidDate(fecha) &&
      isValidTime(hora) &&
      Number.isInteger(asientosDisponibles) &&
      asientosDisponibles >= 0
    ) {
      updateData(id, pelicula, sala, formatDate(fecha), hora, asientosDisponibles, (error) => {
        if (error) {
          console.error("Error actualizando entrada:", error);
          reject(error);
        } else {
          resolve({ message: 'Entrada actualizada con éxito' });
        }
      });
    } else {
      reject("Todos los campos son requeridos.");
    }
  });
};

module.exports = {
  fetchDataFromMySQL,
  handleAddToMySQL,
  handleDeleteFromMySQL,
  handleUpdateInMySQL
};