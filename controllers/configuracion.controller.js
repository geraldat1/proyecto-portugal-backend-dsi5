const db = require("../config/database");

// Crear configuracion
exports.createConfiguracion = (req, res) => {
  const { ruc, nombre, correo, telefono, direccion, mensaje, logo, limite } = req.body;
  if (!ruc || !nombre || !correo || !telefono || !direccion || !mensaje || !logo || !limite) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("INSERT INTO configuracion (ruc, nombre, correo, telefono, direccion, mensaje, logo, limite) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [ruc, nombre, correo, telefono, direccion, mensaje, logo, limite], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Configuracion creada", id: result.insertId });
  });
};

// Obtener todas las configuraciones
exports.getConfiguraciones = (_req, res) => {
  db.query("SELECT * FROM configuracion", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener configuracion por ID
exports.getConfiguracionById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM configuracion WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "configuracion no encontrado" });

    res.status(200).json(results[0]);
  });
};

// Actualizar configuracion por ID
exports.updateConfiguracion = (req, res) => {
  const { id } = req.params;
  const { ruc, nombre, correo, telefono, direccion, mensaje, logo, limite } = req.body;
  if (!ruc || !nombre || !correo || !telefono || !direccion || !mensaje || !logo || !limite) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE configuracion SET ruc = ?, nombre = ?, correo = ?, telefono = ?, direccion = ?, mensaje = ?, logo = ?, limite = ? WHERE id = ?", [ruc, nombre, correo, telefono, direccion, mensaje, logo, limite, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Cliente no encontrado" });

    res.status(200).json({ message: "Configuracion actualizada" });
  });
};

// Eliminar configuracion por ID
exports.deleteConfiguracion= (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM configuracion WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Configuracion no encontrado" });

    res.status(200).json({ message: "Configuracion eliminado" });
  });
};
