// src/routes/user.routes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware'); // Asegúrate de que esta ruta sea correcta
const User = require('../database/models/User'); // Importar el modelo User

// Ruta para obtener el perfil de usuario
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario del token
        const user = await User.findByPk(userId, { attributes: ['id', 'userName', 'email'] }); // Obtener solo los atributos necesarios
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Perfil de usuario', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil de usuario' });
    }
});

module.exports = router;

