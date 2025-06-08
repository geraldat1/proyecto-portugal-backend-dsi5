const db = require("../config/database");

// Crear detalle plan
exports.createDetallePlan = (req, res) => {
  const { id_cliente, id_plan, fecha_venc, fecha_limite } = req.body;

  if (!id_cliente || !id_plan || !fecha_venc || !fecha_limite) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Verificar si el cliente ya tiene un plan activo (estado 1)
  const checkClienteQuery = "SELECT * FROM detalle_planes WHERE id_cliente = ? AND estado = 1";
  db.query(checkClienteQuery, [id_cliente], (err, results) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "El cliente ya tiene un plan activo" });
    }

    // Fecha y hora locales
    const fecha = new Date();
    
    // Verifica usuario autenticado
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const id_user = req.user.id;
    const estado = 1; // Activo

    const sql = `
      INSERT INTO detalle_planes 
      (id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const hora = fecha.toTimeString().slice(0, 8); // HH:mm:ss

    const values = [id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error en la base de datos:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }

      res.status(201).json({ message: "Detalle plan creado", id: result.insertId });
    });
  });
};

// Obtener todas las detalle planes
exports.getDetallePlanes = (_req, res) => {
  // Obtener fecha actual en Perú en formato YYYY-MM-DD
  const fechaHoy = new Date().toLocaleString("en-US", { timeZone: "America/Lima" });
  const fechaObj = new Date(fechaHoy);
  const anio = fechaObj.getFullYear();
  const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaObj.getDate()).padStart(2, "0");
  const fechaFormateada = `${anio}-${mes}-${dia}`;

// Primero establecer estado = 1 si la fecha_venc ya pasó o es hoy
const actualizarVencimiento = `
  UPDATE detalle_planes
  SET estado = 1
  WHERE DATE(fecha_venc) <= ? AND estado != 1;
`;


  // Luego actualizar estado = 0 si la fecha_limite ya pasó (días después del vencimiento)
  const actualizarLimite = `
    UPDATE detalle_planes
    SET estado = 0
    WHERE DATE(fecha_limite) < ? AND estado != 0;
  `;

  // Consulta para actualizar estado = 0 si el cliente (clientes.id) está inactivo (estado = 0)
  const actualizarPorClienteInactivo = `
    UPDATE detalle_planes dp
    INNER JOIN clientes c ON dp.id_cliente = c.id
    SET dp.estado = 0
    WHERE c.estado = 0 AND dp.estado != 0;
  `;

// Ejecutar primero la actualización por fecha_venc ya pasada o igual a hoy
db.query(actualizarVencimiento, [fechaFormateada], (err1) => {
  if (err1) return res.status(500).json({ error: "Error al actualizar estado por fecha_venc: " + err1.message });

  // Luego la actualización por fecha_limite pasada
  db.query(actualizarLimite, [fechaFormateada], (err2) => {
    if (err2) return res.status(500).json({ error: "Error al actualizar estado por fecha_limite: " + err2.message });

    // Luego la actualización por cliente inactivo
    db.query(actualizarPorClienteInactivo, (err3) => {
      if (err3) return res.status(500).json({ error: "Error al actualizar estado por cliente inactivo: " + err3.message });

      // Finalmente obtener todos los registros actualizados
      db.query("SELECT * FROM detalle_planes", (err4, results) => {
        if (err4) return res.status(500).json({ error: "Error al obtener registros: " + err4.message });
        res.status(200).json(results);
      });
    });
  });
});

};

// Obtener detalle_plan por ID (con datos del cliente y plan)
exports.getDetallePlanById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      dp.id, 
      c.nombre AS cliente, 
      p.plan AS plan, 
      p.precio_plan, 
      cond.nombre AS condicion_nombre,   -- cambiado aquí
      dp.fecha AS fecha_inicio, 
      dp.fecha_venc AS fecha_fin,
      dp.estado
    FROM detalle_planes dp
    INNER JOIN clientes c ON dp.id_cliente = c.id
    INNER JOIN planes p ON dp.id_plan = p.id
    INNER JOIN condicion cond ON p.condicion = cond.id
    WHERE dp.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la base de datos", detalle: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Detalle Plan no encontrado" });
    }

    res.status(200).json(results[0]);
  });
};



// Actualizar detalle plan por ID
exports.updateDetallePlan = (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_plan, fecha_venc, fecha_limite } = req.body; // Removemos estado del destructuring

  if (!id_cliente || !id_plan || !fecha_venc || !fecha_limite) { // Ya no validamos estado
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const checkEstadoQuery = "SELECT estado FROM detalle_planes WHERE id = ?";
  db.query(checkEstadoQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Detalle plan no encontrado" });

    const estadoActual = results[0].estado;
    
    if (estadoActual === 0) {
      return res.status(400).json({ error: "No se puede modificar un plan deshabilitado" });
    }

    const fecha = new Date();
    const hora = fecha.toTimeString().slice(0, 8);
    const id_user = req.user.id;
    const estadoForzado = 1; // Siempre se establece estado = 1

    const sql = `
      UPDATE detalle_planes 
      SET id_cliente = ?, id_plan = ?, fecha = ?, hora = ?, fecha_venc = ?, fecha_limite = ?, id_user = ?, estado = ?
      WHERE id = ?`;

    // Usamos estadoForzado en lugar de req.body.estado
    const values = [id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estadoForzado, id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error en base de datos:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Detalle plan no encontrado" });
      }

      res.status(200).json({ message: "Detalle plan actualizado correctamente" });
    });
  });
};

// Eliminar detalle plan por ID (cambiar estado a 0)
exports.deleteDetallePlan = (req, res) => {
  const { id } = req.params;

  // Primero verificar el estado actual del plan
  const checkEstadoQuery = "SELECT estado FROM detalle_planes WHERE id = ?";
  db.query(checkEstadoQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Detalle plan no encontrado" });

    const estadoActual = results[0].estado;
    
    // Si el estado actual ya es 0 (Deshabilitado), no permitir eliminación
    if (estadoActual === 0) {
      return res.status(400).json({ error: "El plan ya está deshabilitado" });
    }

    const sql = `
      UPDATE detalle_planes
      SET estado = 0
      WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle plan no encontrado" });

      res.status(200).json({ message: "Detalle plan deshabilitado (estado cambiado a 0)" });
    });
  });
};