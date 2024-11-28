const connection = require('../config/mysqlConfig.js');

// Función para obtener todas las entradas de la tabla 'entradas'
const fetchData = (callback) => {
  const query = 'SELECT * FROM entradas';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error obteniendo datos:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Función para agregar una nueva entrada a la tabla 'entradas'
const addData = (pelicula, sala, fecha, hora, asientosDisponibles, callback) => {
  const query = 'INSERT INTO entradas (pelicula, sala, fecha, hora, asientosDisponibles) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [pelicula, sala, fecha, hora, asientosDisponibles], (error, results) => {
    if (error) {
      console.error("Error agregando entrada:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Función para eliminar una entrada de la tabla 'entradas' por ID
const deleteData = (id, callback) => {
  const query = 'DELETE FROM entradas WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error eliminando entrada:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Función para actualizar los datos de una entrada en la tabla 'entradas' por ID
const updateData = (id, pelicula, sala, fecha, hora, asientosDisponibles, callback) => {
  const query = 'UPDATE entradas SET pelicula = ?, sala = ?, fecha = ?, hora = ?, asientosDisponibles = ? WHERE id = ?';
  connection.query(query, [pelicula, sala, fecha, hora, asientosDisponibles, id], (error, results) => {
    if (error) {
      console.error("Error actualizando entrada:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Exportar las funciones para que puedan ser usadas en otros módulos
module.exports = {
  fetchData,
  addData,
  deleteData,
  updateData
};