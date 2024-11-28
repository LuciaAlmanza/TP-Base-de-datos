const { 
  addComentario, 
  getComentarios, 
  addCalificacion, 
  getCalificaciones,
  deleteComentario,
  updateComentario,
  deleteCalificacion,
  updateCalificacion
} = require('../models/firebaseModel');

// Controlador para agregar un comentario
async function handleAddComentario(req, res) {
  const { usuarioId, peliculaId, comentario } = req.body;
  try {
    const comentarioId = await addComentario(usuarioId, peliculaId, comentario);
    res.status(201).json({ message: "Comentario agregado", comentarioId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para obtener los comentarios de una película
async function handleGetComentarios(req, res) {
  const { peliculaId } = req.params;
  try {
    const comentarios = await getComentarios(peliculaId);
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para agregar una calificación
async function handleAddCalificacion(req, res) {
  const { usuarioId, peliculaId, calificacion } = req.body;
  try {
    const calificacionId = await addCalificacion(usuarioId, peliculaId, calificacion);
    res.status(201).json({ message: "Calificación agregada", calificacionId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para obtener las calificaciones de una película
async function handleGetCalificaciones(req, res) {
  const { peliculaId } = req.params;
  try {
    const calificaciones = await getCalificaciones(peliculaId);
    res.status(200).json(calificaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para eliminar un comentario
async function handleDeleteComentario(req, res) {
  const { comentarioId } = req.params;
  try {
    await deleteComentario(comentarioId);
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para actualizar un comentario
async function handleUpdateComentario(req, res) {
  const { comentarioId } = req.params;
  const { comentario } = req.body;
  try {
    await updateComentario(comentarioId, comentario);
    res.status(200).json({ message: "Comentario actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para eliminar una calificación
async function handleDeleteCalificacion(req, res) {
  const { calificacionId } = req.params;
  try {
    await deleteCalificacion(calificacionId);
    res.status(200).json({ message: "Calificación eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para actualizar una calificación
async function handleUpdateCalificacion(req, res) {
  const { calificacionId } = req.params;
  const { calificacion } = req.body;
  try {
    await updateCalificacion(calificacionId, calificacion);
    res.status(200).json({ message: "Calificación actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  handleAddComentario,
  handleGetComentarios,
  handleAddCalificacion,
  handleGetCalificaciones,
  handleDeleteComentario,
  handleUpdateComentario,
  handleDeleteCalificacion,
  handleUpdateCalificacion
};
