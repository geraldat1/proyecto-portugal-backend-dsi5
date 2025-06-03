const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { correo, clave } = req.body;
  if (!correo || !clave) 
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sql, [correo], async (err, results) => {
    if (err || results.length === 0) 
      return res.status(401).json({ error: "Correo no registrado" });

    const user = results[0];

    // Validar si el usuario está deshabilitado
    if (user.estado === 0 || user.estado === '0') {
      return res.status(403).json({ error: "Usuario deshabilitado, no puede iniciar sesión" });
    }

    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) 
      return res.status(401).json({ error: "Contraseña incorrecta" });

    // Incluir el rol en el token JWT
    const token = jwt.sign({ 
      id: user.id, 
      name: user.nombre,
      rol: user.rol   // Mantener como string '1' o '2'
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.status(200).json({ 
      message: "Login exitoso", 
      token: token,
      user: { 
        id: user.id, 
        nombre: user.nombre,
        rol: user.rol // También incluirlo en la respuesta del usuario
      }
    });
  });
};

exports.logout = (_req, res) => {
  res.status(200).json({ message: "Logout exitoso. Token eliminado del cliente." });
};