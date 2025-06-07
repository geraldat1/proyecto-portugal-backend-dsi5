const db = require("../config/database");

exports.createPagosPlan = (req, res) => {
  const { id_detalle, id_cliente, id_plan, precio, metodo_pago } = req.body;

  // Validación de campos
  if (!id_detalle || !id_cliente || !id_plan || !precio || !metodo_pago) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Obtener fecha y hora de Perú (UTC-5)
  const ahoraPerú = new Date().toLocaleString("sv-SE", {
    timeZone: "America/Lima"
  });
  
  const [fecha, hora] = ahoraPerú.split(" ");
  const id_user = req.user.id;

  db.query(
    "INSERT INTO pagos_planes (id_detalle, id_cliente, id_plan, precio, metodo_pago, fecha, hora, id_user, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [id_detalle, id_cliente, id_plan, precio, metodo_pago, fecha, hora, id_user, 1],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear el pago" });

      db.query(
        "UPDATE detalle_planes SET estado = 2 WHERE id = ?",
        [id_detalle],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error al actualizar el estado:", updateErr);
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
      planes.plan AS nombre_plan,
      planes.condicion AS id_condicion,
      condicion.nombre AS nombre_condicion,
      detalle_planes.fecha AS fecha_reg,
      detalle_planes.fecha_venc
    FROM pagos_planes
    JOIN clientes ON pagos_planes.id_cliente = clientes.id
    JOIN planes ON pagos_planes.id_plan = planes.id
    JOIN condicion ON planes.condicion = condicion.id
    JOIN detalle_planes ON pagos_planes.id_detalle = detalle_planes.id
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
      planes.plan AS nombre_plan,
      planes.condicion AS id_condicion,
      condicion.nombre AS nombre_condicion,
      detalle_planes.fecha AS fecha_reg,
      detalle_planes.fecha_venc
    FROM pagos_planes
    JOIN clientes ON pagos_planes.id_cliente = clientes.id
    JOIN planes ON pagos_planes.id_plan = planes.id
    JOIN condicion ON planes.condicion = condicion.id
    JOIN detalle_planes ON pagos_planes.id_detalle = detalle_planes.id
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
  const { id_detalle, id_cliente, id_plan, precio, metodo_pago, estado } = req.body;

  // Validación básica
  if (!id_detalle || !id_cliente || !id_plan || !precio || !metodo_pago || estado === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10);
  const hora = ahora.toTimeString().slice(0, 8);

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const id_user = req.user.id;

  const sql = `
    UPDATE pagos_planes 
    SET id_detalle = ?, id_cliente = ?, id_plan = ?, precio = ?, metodo_pago = ?, fecha = ?, hora = ?, id_user = ?, estado = ? 
    WHERE id = ?`;

  const values = [id_detalle, id_cliente, id_plan, precio, metodo_pago, fecha, hora, id_user, estado, id];

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
