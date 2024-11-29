const express = require('express');
const {
  fetchDataFromMySQL,
  handleAddToMySQL,
  handleDeleteFromMySQL,
  handleUpdateInMySQL
} = require('../operations/sqlOperations');

const router = express.Router();

// Obtener todas las entradas
router.get('/entradas', async (req, res) => {
  try {
    const data = await fetchDataFromMySQL();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las entradas' });
  }
});

// Agregar una nueva entrada
router.post('/entradas', async (req, res) => {
  const { pelicula, sala, fecha, hora, asientosDisponibles } = req.body;

  try {
    const response = await handleAddToMySQL(
      pelicula,
      parseInt(sala, 10),
      fecha,
      hora,
      parseInt(asientosDisponibles, 10)
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar la entrada', details: error.message });
  }
});

// Actualizar una entrada
router.put('/entradas/:id', async (req, res) => {
  const { id } = req.params;
  const { pelicula, sala, fecha, hora, asientosDisponibles } = req.body;

  try {
    const response = await handleUpdateInMySQL(
      parseInt(id, 10),
      pelicula,
      parseInt(sala, 10),
      fecha,
      hora,
      parseInt(asientosDisponibles, 10)
    );
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la entrada', details: error.message });
  }
});

// Eliminar una entrada
router.delete('/entradas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await handleDeleteFromMySQL(parseInt(id, 10));
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la entrada' });
  }
});

module.exports = router;
