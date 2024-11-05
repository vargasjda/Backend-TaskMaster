const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro.' });
  }
});

// Ruta para el inicio de sesión de usuarios
router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
});

module.exports = router;
