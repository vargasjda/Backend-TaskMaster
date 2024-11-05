const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes'); // Importar las rutas de tareas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
  res.send('¡Bienvenido a TaskMaster!');
});

sequelize.sync({ alter: false }) 
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((err) => {
    console.error('Error al sincronizar los modelos:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
