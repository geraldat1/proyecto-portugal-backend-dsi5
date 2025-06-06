require("dotenv").config();
const express = require("express");
const cors = require("cors");

//obtengo mis rutas
const asistenciaRoutes = require("./routes/asistencia.routes");
const authRoutes = require("./routes/auth.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const clienteRoutes = require("./routes/cliente.routes");
const configuracionRoutes = require("./routes/configuracion.routes");
const detalleplanRoutes = require("./routes/detalle_plan.routes");
const entrenadorRoutes = require("./routes/entrenador.routes");
const pagosplanRoutes = require("./routes/pagos_plan.routes");
const planRoutes = require("./routes/plan.routes");
const rutinaRoutes = require("./routes/rutina.routes");
const rutinaplanRoutes = require("./routes/rutina_plan.routes");
const condicionRoutes = require("./routes/condicion.routes");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req,res) => {
  res.send("BIENVENIDO AL API");
});

app.use("/api/v1", asistenciaRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", usuarioRoutes);
app.use("/api/v1", clienteRoutes);
app.use("/api/v1", configuracionRoutes);
app.use("/api/v1", detalleplanRoutes);
app.use("/api/v1", entrenadorRoutes);
app.use("/api/v1", pagosplanRoutes);
app.use("/api/v1", planRoutes);
app.use("/api/v1", rutinaRoutes);
app.use("/api/v1", rutinaplanRoutes);
app.use("/api/v1", condicionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
