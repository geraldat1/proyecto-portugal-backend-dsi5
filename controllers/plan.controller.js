const db = require("../config/database");

// Crear plan
exports.createPlan = (req, res) => {
  const { plan, descripcion, precio_plan, condicion, imagen } = req.body;

  // Suponiendo que el middleware de autenticación añadió `req.user`
  const id_user = req.user?.id;
  const estado = 1; // Activo por defecto

  if (!plan || !descripcion || !precio_plan || !condicion || !imagen || !id_user)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const query = `
    INSERT INTO planes (plan, descripcion, precio_plan, condicion, imagen, estado, id_user)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [plan, descripcion, precio_plan, condicion, imagen, estado, id_user];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Plan creado", id: result.insertId });
  });
};

// Obtener todas las planes
exports.getPlanes = (_req, res) => {
  db.query(`
    SELECT p.*, c.nombre AS condicion_nombre 
    FROM planes p
    JOIN condicion c ON p.condicion = c.id
  `, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener plan por ID
exports.getPlanById = (req, res) => {
  const { id } = req.params;
  db.query(`
    SELECT p.*, c.nombre AS condicion_nombre 
    FROM planes p
    JOIN condicion c ON p.condicion = c.id
    WHERE p.id = ?
  `, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Plan no encontrada" });
    res.status(200).json(results[0]);
  });
};

// Actualizar plan por ID
exports.updatePlan = (req, res) => {
  const { id } = req.params;
  const { plan, descripcion, precio_plan, condicion, imagen, estado, id_user } = req.body;
  if (!plan || !descripcion || !precio_plan || !condicion || !imagen || !estado || !id_user) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE planes SET plan = ?, descripcion = ?, precio_plan = ?, condicion = ?, imagen = ?, estado = ?, id_user = ? WHERE id = ?", [plan, descripcion, precio_plan, condicion, imagen, estado, id_user, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Plan no encontrada" });

    res.status(200).json({ message: "Plan actualizada" });
  });
};

// Deshabilitar plan por ID
exports.deletePlan = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE planes SET estado = 0 WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Plan no encontrado" });

    res.status(200).json({ message: "Plan deshabilitado" });
  });
};

