const express = require('express');
const bodyParser = require('body-parser');
const sqlRoutes = require('./routes/sqlRoutes'); // Importar las rutas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware para parsear JSON

// Configurar rutas
app.use('/api', sqlRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
