/**Aquí va la configuración para conectarse a MySQL */
// backend/config/mysqlConfig.js

require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

// Conectar a la base de datos
function connectWithRetry() {
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a MySQL:', err.message);
      console.log('Reintentando conexión en 5 segundos...');
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Conexión exitosa a MySQL');
    }
  });
}

connectWithRetry();

connection.on('error', (err) => {
  console.error('Error en la conexión MySQL:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconectando a MySQL...');
    connectWithRetry();
  } else {
    throw err;
  }
});

module.exports = connection;