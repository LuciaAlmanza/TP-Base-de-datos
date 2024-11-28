const { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } = require("firebase/firestore");
const db = require('../firebaseConfig');

// Función para agregar un comentario
async function addComentario(usuarioId, peliculaId, comentario) {
  try {
    const docRef = await addDoc(collection(db, "comentarios"), {
      usuarioId,
      peliculaId,
      comentario,
      fecha: new Date().toISOString(),
    });
    console.log("Comentario agregado con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error agregando comentario: ", error);
    throw new Error("Error al agregar comentario");
  }
}

// Función para obtener comentarios de una película
async function getComentarios(peliculaId) {
  const q = query(collection(db, "comentarios"), where("peliculaId", "==", peliculaId));
  const querySnapshot = await getDocs(q);
  let comentarios = [];
  querySnapshot.forEach((doc) => {
    comentarios.push(doc.data());
  });
  return comentarios;
}

// Función para agregar una calificación
async function addCalificacion(usuarioId, peliculaId, calificacion) {
  try {
    const docRef = await addDoc(collection(db, "calificaciones"), {
      usuarioId,
      peliculaId,
      calificacion,
      fecha: new Date().toISOString(),
    });
    console.log("Calificación agregada con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error agregando calificación: ", error);
    throw new Error("Error al agregar calificación");
  }
}

// Función para obtener calificaciones de una película
async function getCalificaciones(peliculaId) {
  const q = query(collection(db, "calificaciones"), where("peliculaId", "==", peliculaId));
  const querySnapshot = await getDocs(q);
  let calificaciones = [];
  querySnapshot.forEach((doc) => {
    calificaciones.push(doc.data());
  });
  return calificaciones;
}

// Función para eliminar un comentario
async function deleteComentario(commentId) {
  try {
    const commentRef = doc(db, "comentarios", commentId);
    await deleteDoc(commentRef);
    console.log("Comentario eliminado");
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
  }
}

// Función para actualizar un comentario
async function updateComentario(commentId, newComentario) {
  try {
    const commentRef = doc(db, "comentarios", commentId);
    await updateDoc(commentRef, {
      comentario: newComentario,
      fecha: new Date().toISOString()
    });
    console.log("Comentario actualizado");
  } catch (error) {
    console.error("Error al actualizar comentario:", error);
  }
}

// Función para eliminar una calificación
async function deleteCalificacion(calificacionId) {
  try {
    const calificacionRef = doc(db, "calificaciones", calificacionId);
    await deleteDoc(calificacionRef);
    console.log("Calificación eliminada");
  } catch (error) {
    console.error("Error al eliminar calificación:", error);
  }
}

// Función para actualizar una calificación
async function updateCalificacion(calificacionId, newCalificacion) {
  try {
    const calificacionRef = doc(db, "calificaciones", calificacionId);
    await updateDoc(calificacionRef, {
      calificacion: newCalificacion,
      fecha: new Date().toISOString()
    });
    console.log("Calificación actualizada");
  } catch (error) {
    console.error("Error al actualizar calificación:", error);
  }
}

module.exports = {
  addComentario,
  getComentarios,
  addCalificacion,
  getCalificaciones,
  deleteComentario,
  updateComentario,
  deleteCalificacion,
  updateCalificacion
};
