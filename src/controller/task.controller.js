
const Task = require('../database/models/Task'); // Ajusta la ruta según tu estructura de archivos

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Verifica que los datos lleguen
    const { title, description, status, dueDate } = req.body;
    const userId = req.user.id; // Verifica que el userId se esté extrayendo correctamente
    console.log('User ID:', userId);

    const newTask = await Task.create({
      title,
      description,
      status,
      dueDate,
      userId
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

// Obtener todas las tareas de un usuario
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el id del usuario autenticado
    const tasks = await Task.findAll({ where: { userId } });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};
