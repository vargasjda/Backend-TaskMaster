const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

module.exports = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.header('Authorization')?.split(' ')[1];

  // Verificar si no se proporcionó un token
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  // Verificar y decodificar el token
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Añadir los datos del usuario a la solicitud
    next(); // Continuar hacia la ruta protegida
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
