const db = require("../config/database");

// Crear cliente
exports.createCliente = (req, res) => {
  const { dni, nombre, telefono, direccion } = req.body;

  // Validación de campos obligatorios
  if (!dni || !nombre || !telefono || !direccion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Verificar si ya existe un cliente con ese DNI
  db.query("SELECT * FROM clientes WHERE dni = ?", [dni], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    
    if (results.length > 0) {
      return res.status(400).json({ error: "El cliente con ese DNI ya existe" });
    }

    // Campos automáticos
    const fecha = new Date(); // Fecha actual
    const estado = 1;         // Estado activo
    const id_user = req.user.id; // ID del usuario autenticado

    db.query(
      "INSERT INTO clientes (dni, nombre, telefono, direccion, fecha, estado, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [dni, nombre, telefono, direccion, fecha, estado, id_user],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });

        res.status(201).json({ message: "Cliente creado", id: result.insertId });
      }
    );
  });
};

// Obtener todas las clientes
exports.getClientes = (_req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener cliente por ID
exports.getClienteById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM clientes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });

    res.status(200).json(results[0]);
  });
};

// Actualizar cliente por ID
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { dni, nombre, telefono, direccion, estado } = req.body;

  if (!dni || !nombre || !telefono || !direccion || estado === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar si existe otro cliente con el mismo DNI
  db.query(
    "SELECT * FROM clientes WHERE dni = ? AND id != ?",
    [dni, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });

      if (results.length > 0) {
        return res.status(400).json({ error: "Ya existe otro cliente con ese DNI" });
      }

      const fecha = new Date();
      const id_user = req.user.id;

      db.query(
        "UPDATE clientes SET dni = ?, nombre = ?, telefono = ?, direccion = ?, fecha = ?, estado = ?, id_user = ? WHERE id = ?",
        [dni, nombre, telefono, direccion, fecha, estado, id_user, id],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error en la base de datos" });
          if (result.affectedRows === 0) return res.status(404).json({ error: "Cliente no encontrado" });

          res.status(200).json({ message: "Cliente actualizado" });
        }
      );
    }
  );
};



// Eliminar cliente por ID
exports.deleteCliente = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE clientes SET estado = 0 WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Cliente no encontrado" });

    res.status(200).json({ message: "Cliente deshabilitado correctamente" });
  });
};

