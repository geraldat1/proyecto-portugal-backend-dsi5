const db = require("../config/database");

exports.createPagosPlan = (req, res) => {
  const { id_detalle, id_cliente, id_plan, precio } = req.body;

  // Validación de campos
  if (!id_detalle || !id_cliente || !id_plan || !precio) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10); // Formato: YYYY-MM-DD
  const hora = ahora.toTimeString().slice(0, 8);  // Formato: HH:MM:SS
  const id_user = req.user.id; // Suponiendo que usas auth y req.user existe

  // Primero, insertar el nuevo pago
  db.query(
    "INSERT INTO pagos_planes (id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, 1],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear el pago" });

      // Luego de insertar, actualizar el estado del detalle_planes a 2
      db.query(
        "UPDATE detalle_planes SET estado = 2 WHERE id = ?",
        [id_detalle],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error al actualizar el estado:", updateErr); // Muestra el error real
            return res.status(500).json({ 
              error: "Pago creado, pero error al actualizar el estado del detalleplan" 
            });
}


          res.status(201).json({ 
            message: "Pago creado y estado del detalleplan actualizado",
            id: result.insertId 
          });
        }
      );
    }
  );
};


// Obtener todas las pagos planes con nombres de cliente y plan
exports.getPagosPlanes = (_req, res) => {
  const query = `
    SELECT 
      pagos_planes.*, 
      clientes.nombre AS nombre_cliente,
      clientes.dni AS dni_cliente,
      planes.plan AS nombre_plan
    FROM pagos_planes
    JOIN clientes ON pagos_planes.id_cliente = clientes.id
    JOIN planes ON pagos_planes.id_plan = planes.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};


// Obtener pagos plan por ID (con nombre de cliente y nombre del plan)
exports.getPagosPlanById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      pagos_planes.*, 
      clientes.nombre AS nombre_cliente,
      clientes.dni AS dni_cliente,
      planes.plan AS nombre_plan
    FROM pagos_planes
    JOIN clientes ON pagos_planes.id_cliente = clientes.id
    JOIN planes ON pagos_planes.id_plan = planes.id
    WHERE pagos_planes.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Pago de plan no encontrado" });

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
