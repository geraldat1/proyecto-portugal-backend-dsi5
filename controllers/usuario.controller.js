const db = require("../config/database");
const bcrypt = require("bcrypt");

// Crear usuario
exports.createUsuario = async (req, res) => {
  const { usuario, nombre, correo, clave, telefono, rol } = req.body;

  if (!usuario || !nombre || !correo || !clave || !telefono || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar que el rol sea '1' o '2'
  if (!['1', '2'].includes(rol)) {
    return res.status(400).json({ error: "Rol inválido. Debe ser '1' para Administrador o '2' para Empleado" });
  }

  const fecha = new Date();
  const estado = 1;
  const foto = "user.png";

  try {
    const hashedPassword = await bcrypt.hash(clave, 10);

    const sql = `
      INSERT INTO usuarios (usuario, nombre, correo, clave, telefono, foto, rol, fecha, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [usuario, nombre, correo, hashedPassword, telefono, foto, rol, fecha, estado],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });
        res.status(201).json({ message: "Usuario creado", id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la contraseña" });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = (_req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
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

// Actualizar usuario por ID - Versión modificada
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuario, nombre, correo, clave, telefono, rol } = req.body;

  try {
    // MODIFICACIÓN: Si solo viene la clave (cambio de contraseña)
    if (clave && Object.keys(req.body).length === 1) {
      const hashedPassword = await bcrypt.hash(clave, 10);
      
      db.query(
        "UPDATE usuarios SET clave = ? WHERE id = ?",
        [hashedPassword, id],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error en la base de datos" });
          if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
          
          return res.status(200).json({ message: "Contraseña actualizada correctamente" });
        }
      );
      return; // Salir temprano
    }

    // Validación de campos requeridos (solo para actualización completa)
    if (!usuario || !nombre || !correo || !telefono || !rol) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (!['1', '2'].includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    // Resto de la lógica para actualización completa...
    const fecha = new Date();
    const estado = 1;
    const foto = "user.png";

    let sql = `
      UPDATE usuarios
      SET usuario = ?, nombre = ?, correo = ?, telefono = ?, foto = ?, rol = ?, fecha = ?, estado = ?
    `;
    const params = [usuario, nombre, correo, telefono, foto, rol, fecha, estado];

    if (clave && clave.trim() !== "") {
      const hashedPassword = await bcrypt.hash(clave, 10);
      sql += `, clave = ?`;
      params.push(hashedPassword);
    }

    sql += ` WHERE id = ?`;
    params.push(id);

    db.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
      
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    });

  } catch (error) {
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};



// Deshabilitar usuario por ID (actualizar estado a 0)
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE usuarios SET estado = 0 WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario deshabilitado correctamente" });
  });
};
