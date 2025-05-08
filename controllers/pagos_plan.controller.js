const db = require("../config/database");

// Crear pagos plan
exports.createPagosPlan = (req, res) => {
  const { id_detalle, id_cliente, id_plan, precio } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (!id_detalle || !id_cliente || !id_plan || !precio) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Obtener fecha y hora actuales
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10);           // Fecha: YYYY-MM-DD
  const hora = ahora.toTimeString().slice(0, 8);            // Hora: HH:mm:ss

  // Obtener id_user del usuario autenticado
  const id_user = req.user.id; 

  // Estado: 1 (activo)
  const estado = 1;

  // Realizar la consulta a la base de datos para insertar el pago
  db.query(
    "INSERT INTO pagos_planes (id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado], 
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Pago plan creado", id: result.insertId });
    }
  );
};


// Obtener todas las pagos planes
exports.getPagosPlanes = (_req, res) => {
  db.query("SELECT * FROM pagos_planes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener pagos plan por ID
exports.getPagosPlanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM pagos_planes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Pagos planes no encontrada" });

    res.status(200).json(results[0]);
  });
};

// Actualizar pagos plan por ID
exports.updatePagosPlan = (req, res) => {
  const { id } = req.params;
  const { id_detalle, id_cliente, id_plan, precio, estado } = req.body;

  // Validación básica
  if (!id_detalle || !id_cliente || !id_plan || !precio || estado === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Obtener fecha y hora actual
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10); // YYYY-MM-DD
  const hora = ahora.toTimeString().slice(0, 8);  // HH:mm:ss

  // Verificar usuario autenticado
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const id_user = req.user.id;

  const sql = `
    UPDATE pagos_planes 
    SET id_detalle = ?, id_cliente = ?, id_plan = ?, precio = ?, fecha = ?, hora = ?, id_user = ?, estado = ? 
    WHERE id = ?`;

  const values = [id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pagos planes no encontrada" });

    res.status(200).json({ message: "Pagos planes actualizada" });
  });
};


// Eliminar pagos plan por ID
exports.deletePagosPlan = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pagos_planes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pagos planes no encontrada" });

    res.status(200).json({ message: "Pagos planes eliminada" });
  });
};
