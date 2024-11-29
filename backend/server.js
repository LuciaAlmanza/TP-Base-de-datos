const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const sqlRoutes = require('./routes/sqlRoutes'); // Importar las rutas

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configurar rutas
app.use('/api', sqlRoutes); // Aquí defines que todas las rutas de sqlRoutes van bajo '/api'

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
