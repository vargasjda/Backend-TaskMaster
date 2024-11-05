const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Crear una tarea
router.post('/', authMiddleware, taskController.createTask);

// Obtener todas las tareas
router.get('/', authMiddleware, taskController.getTasks); // Asegúrate de que esto sea getTasks

// Actualizar una tarea
router.put('/:id', authMiddleware, taskController.updateTask);

// Eliminar una tarea
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
