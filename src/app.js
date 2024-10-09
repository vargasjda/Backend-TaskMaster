// src/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Importar los modelos
const User = require('./database/models/User.js');
const Task = require('./database/models/Task.js');

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a TaskMaster!');
});

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false })  // `force: false` no sobreescribe las tablas existentes
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((err) => {
    console.error('Error al sincronizar los modelos:', err);
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
