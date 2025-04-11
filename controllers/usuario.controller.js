const db = require("../config/database");
const bcrypt = require("bcrypt");

exports.createUsuario = async (req, res) => {
  const { usuario, nombre, correo, clave, telefono, foto, rol, fecha, estado } = req.body;
  if (!usuario || !nombre || !correo || !clave || !telefono || !foto || !rol || !fecha || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const hashedPassword = await bcrypt.hash(clave, 10);
  const sql = "INSERT INTO usuarios (usuario, nombre, correo, clave, telefono, foto, rol, fecha, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [usuario, nombre, correo, hashedPassword, telefono, foto, rol, fecha, estado], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  });
};

exports.getUsuarios = (_req, res) => {
  db.query("SELECT id, usuario, nombre, correo, clave, telefono, foto, rol, fecha, estado FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener usuario por ID
exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(results[0]);
  });
};

// Actualizar usuario por ID
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuario, nombre, correo, clave, telefono, foto, rol, fecha, estado } = req.body;

  if (!usuario || !nombre || !correo || !clave || !telefono || !foto || !rol || !fecha || !estado) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const hashedPassword = await bcrypt.hash(clave, 10);
  const sql = "UPDATE usuarios SET usuario = ?, nombre = ?, correo = ?, clave = ?, telefono = ?, foto = ?, rol = ?, fecha = ?, estado = ? WHERE id = ?";

  db.query(sql, [usuario, nombre, correo, hashedPassword, telefono, foto, rol, fecha, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario actualizado" });
  });
};

// Eliminar usuario por ID
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario eliminado" });
  });
};

