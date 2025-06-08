-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2025 a las 06:45:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db-portugal3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id_asistencia` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_entrada` time NOT NULL,
  `hora_salida` time DEFAULT NULL,
  `id_detalle` int(11) NOT NULL,
  `id_entrenador` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id_asistencia`, `fecha`, `hora_entrada`, `hora_salida`, `id_detalle`, `id_entrenador`, `id_usuario`, `estado`) VALUES
(1, '2025-05-27', '08:00:00', '14:01:20', 1, 1, 1, 0),
(2, '2025-05-27', '08:30:00', '13:32:20', 2, 1, 1, 0),
(3, '2025-05-27', '09:00:00', '14:01:23', 3, 2, 1, 0),
(4, '2025-05-29', '09:30:00', '01:22:31', 4, 2, 1, 0),
(5, '2025-05-29', '10:00:00', '01:22:26', 5, 3, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `dni`, `nombre`, `telefono`, `direccion`, `fecha`, `estado`, `id_user`) VALUES
(1, '12345678', 'Juan Pérez', '987654323', 'Av. Arequipa 1234, Pucallpa', '2025-05-08 15:38:44', 1, 1),
(2, '87654321', 'María Gómez', '987654321', 'Calle Los Olivos 567, Lima', '2025-05-08 15:38:49', 1, 1),
(3, '23456789', 'Carlos Ruiz', '987654323', 'Jr. San Martín 890, Lima', '2025-04-29 13:28:48', 1, 1),
(4, '34567890', 'Ana Torres', '987654324', 'Av. Javier Prado 456, Lima', '2025-06-07 08:50:20', 0, 1),
(5, '45678901', 'Luis Fernández', '987654325', 'Calle La Paz 123, Lima', '2025-06-07 09:06:40', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion`
--

CREATE TABLE `condicion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `condicion`
--

INSERT INTO `condicion` (`id`, `nombre`) VALUES
(1, 'Diario'),
(2, 'Mensual'),
(3, 'Trimestral'),
(4, 'Anual'),
(5, 'Promocion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `ruc` varchar(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `mensaje` text NOT NULL,
  `logo` varchar(100) NOT NULL,
  `limite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `ruc`, `nombre`, `correo`, `telefono`, `direccion`, `mensaje`, `logo`, `limite`) VALUES
(1, '12345678909', 'ToretoGym', 'admin@gmail.com', '976664659', 'Av 9 de Octubre Jr. Manco Capac', 'Gracias por su preferencia', 'logo-toreto.png', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_planes`
--

CREATE TABLE `detalle_planes` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `fecha_venc` date NOT NULL,
  `fecha_limite` date NOT NULL,
  `id_user` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_planes`
--

INSERT INTO `detalle_planes` (`id`, `id_cliente`, `id_plan`, `fecha`, `hora`, `fecha_venc`, `fecha_limite`, `id_user`, `estado`) VALUES
(1, 1, 1, '2025-05-08', '13:40:48', '2026-04-01', '2026-04-23', 1, 0),
(2, 2, 2, '2025-04-02', '08:30:00', '2026-04-02', '2026-04-12', 1, 0),
(3, 3, 1, '2025-06-07', '15:46:16', '2025-06-08', '2025-06-10', 1, 2),
(4, 4, 4, '2025-04-04', '09:30:00', '2026-04-04', '2026-04-20', 1, 0),
(5, 5, 3, '2025-05-07', '15:46:22', '2026-04-05', '2026-04-25', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador`
--

CREATE TABLE `entrenador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `direccion` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrenador`
--

INSERT INTO `entrenador` (`id`, `nombre`, `apellido`, `telefono`, `correo`, `direccion`, `estado`) VALUES
(1, 'José', 'García', '987654322', 'jose.garcia@gimnasiofitness.pe', 'Av. Puno 123, Lima', 1),
(2, 'María', 'López', '987654322', 'maria.lopez@gimnasiofitness.pe', 'Calle Los Olivos 567, Lima', 1),
(3, 'Carlos', 'Ramírez', '987654323', 'carlos.ramirez@gimnasiofitness.pe', 'Jr. San Martín 890, Lima', 1),
(4, 'Ana', 'Torres', '987654324', 'ana.torres@gimnasiofitness.pe', 'Av. Javier Prado 456, Lima', 1),
(5, 'Luis', 'Fernández', '987654325', 'luis.fernandez@gimnasiofitness.pe', 'Calle La Paz 123, Lima', 1),
(6, 'Sofía', 'López', '987654326', 'sofia.lopez@gimnasiofitness.pe', 'Av. Brasil 789, Lima', 1),
(7, 'Pedro', 'Martínez', '987654327', 'pedro.martinez@gimnasiofitness.pe', 'Calle Los Ángeles 234, Lima', 1),
(8, 'Lucía', 'Sánchez', '987654328', 'lucia.sanchez@gimnasiofitness.pe', 'Av. Tacna 345, Lima', 1),
(9, 'Diego', 'Morales', '987654329', 'diego.morales@gimnasiofitness.pe', 'Calle San Juan 456, Lima', 1),
(10, 'Valeria', 'Castro', '987654330', 'valeria.castro@gimnasiofitness.pe', 'Av. Pardo 567, Lima', 1),
(11, 'Javier', 'Avila', '987654322', 'gerald@gmail.com', 'Jr. Tarapaca 187', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`id`, `nombre`) VALUES
(1, 'Efectivo'),
(2, 'Yape/Plin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_planes`
--

CREATE TABLE `pagos_planes` (
  `id` int(11) NOT NULL,
  `id_detalle` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `metodo_pago` int(11) NOT NULL DEFAULT 1,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_user` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos_planes`
--

INSERT INTO `pagos_planes` (`id`, `id_detalle`, `id_cliente`, `id_plan`, `precio`, `metodo_pago`, `fecha`, `hora`, `id_user`, `estado`) VALUES
(1, 2, 2, 2, 49.90, 1, '2025-05-07', '00:47:10', 1, 1),
(2, 2, 2, 2, 20.00, 1, '2025-04-02', '08:30:00', 1, 1),
(3, 3, 3, 3, 100.00, 1, '2025-04-03', '09:00:00', 1, 1),
(4, 4, 4, 4, 300.00, 1, '2025-04-04', '09:30:00', 1, 1),
(5, 5, 5, 4, 139.00, 1, '2025-05-08', '10:17:40', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id` int(11) NOT NULL,
  `plan` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio_plan` decimal(10,2) NOT NULL,
  `condicion` int(11) NOT NULL,
  `imagen` varchar(50) NOT NULL DEFAULT 'default.png',
  `estado` int(11) NOT NULL DEFAULT 1,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`id`, `plan`, `descripcion`, `precio_plan`, `condicion`, `imagen`, `estado`, `id_user`) VALUES
(1, 'Plan Diario', 'Acceso total al gimnasio por 1 día.\n\n', 10.00, 1, '/imagenes/plan/plan1.jpg', 1, 1),
(2, 'Plan Mensual Basico', 'Acceso a máquinas de musculación y cardio, Horarios regulares.', 50.00, 2, '/imagenes/plan/plan4.jpg', 1, 1),
(3, 'Plan Mensual Full', 'Acceso total a todas las áreas del gimnasio, Clases dirigidas (zumba, funcional, spinning, etc.), Asesoría básica de un entrenador.', 69.90, 2, '/imagenes/plan/plan5.jpg', 1, 1),
(4, 'Plan Trimestral Basico', 'Acceso a zonas básicas del gimnasio por 3 meses, Horarios regulares.', 99.90, 3, '/imagenes/plan/plan3.jpg', 1, 1),
(5, 'Plan Anual Full', 'Acceso total a todas las áreas del gimnasio, Clases grupales ilimitadas, Zona funcional, Asesoría de entrenamiento, Beneficios exclusivos por fidelidad.', 299.90, 4, '/imagenes/plan/plan2.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int(11) NOT NULL,
  `dia` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `dia`, `descripcion`, `id_user`, `estado`) VALUES
(1, 'DIA 01', 'Piernas y Glúteos - Fuerza', 1, 1),
(2, 'DIA 02', 'Pecho y Tríceps - Hipertrofia', 1, 1),
(3, 'DIA 03', 'Espalda y Bíceps - Fuerza', 1, 1),
(4, 'DIA 04', 'Hombros y Abdomen', 1, 1),
(5, 'DIA 05', 'Cardio HIIT - Resistencia', 1, 1),
(6, 'DIA 06', 'Cuerpo Completo Funcional', 1, 1),
(7, 'DIA 07', 'Descanso Activo', 1, 1),
(8, 'DIA 08', 'Piernas - Peso Libre', 1, 1),
(9, 'DIA 09', 'Pecho - Máquina y Cable', 1, 1),
(10, 'DIA 10', 'Espalda - Dominadas y Remo', 1, 1),
(11, 'DIA 11', 'Bíceps y Tríceps - Superseries', 1, 1),
(12, 'DIA 12', 'Circuito Metabólico', 1, 1),
(13, 'DIA 13', 'Estiramientos y Movilidad', 1, 1),
(14, 'DIA 14', 'Descanso Total', 1, 1),
(15, 'DIA 15', 'Fuerza Máxima - Piernas', 1, 1),
(16, 'DIA 16', 'Pecho y Hombros - Potencia', 1, 1),
(17, 'DIA 17', 'Espalda - Peso Muerto y Pull', 1, 1),
(18, 'DIA 18', 'Brazos - Volumen', 1, 1),
(19, 'DIA 19', 'Cardio LISS - Caminata/Elíptica', 1, 1),
(20, 'DIA 20', 'Cuerpo Completo en Circuito', 1, 1),
(21, 'DIA 21', 'Yoga y Core', 1, 1),
(22, 'DIA 22', 'Glúteos y Femorales', 1, 1),
(23, 'DIA 23', 'Pecho Explosivo', 1, 1),
(24, 'DIA 24', 'Espalda con Peso Corporal', 1, 1),
(25, 'DIA 25', 'Tren Superior - Superseries', 1, 1),
(26, 'DIA 26', 'Cardio HIIT + Abdomen', 1, 1),
(27, 'DIA 27', 'Entrenamiento Funcional', 1, 1),
(28, 'DIA 28', 'Movilidad y Respiración', 1, 1),
(29, 'DIA 29', 'Descanso Activo', 1, 0),
(30, 'DIA 30', 'Evaluación y Feedback del Progreso', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina_plan`
--

CREATE TABLE `rutina_plan` (
  `id` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutina_plan`
--

INSERT INTO `rutina_plan` (`id`, `id_plan`, `id_rutina`, `estado`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 2, 3, 1),
(4, 3, 4, 1),
(5, 4, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `foto` varchar(50) NOT NULL DEFAULT 'avatar.svg',
  `rol` enum('1','2') NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `correo`, `clave`, `telefono`, `foto`, `rol`, `fecha`, `estado`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', '$2b$10$C.1k1XxH24g96q.m7/sM0equMYFOkH7YDX8saCVPEpmSJYr6gNPNK', '987654325', 'user.png', '1', '2025-06-04 08:57:37', 1),
(2, 'gerald_empleado', 'gerald', 'gerald@gmail.com', '$2b$10$EP9qCO6NCHs9WYtb9nj/g.aCk56VgdQurjaPW96g1DuqsqHKOgWnG', '987654311', 'user.png', '2', '2025-06-07 07:52:08', 1),
(3, 'andrea_empleada', 'andrea del pilar', 'andrea123@gmail.com', '$2b$10$xSEuywIKgR5SbLpxI09zu.LElVyT2dD3N8xr4BqUoi/TPNiQhqSqi', '987654321', 'user.png', '2', '2025-05-30 08:08:37', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_detalle` (`id_detalle`),
  ADD KEY `id_entrenador` (`id_entrenador`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `condicion`
--
ALTER TABLE `condicion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_planes`
--
ALTER TABLE `detalle_planes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_detalle` (`id_detalle`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `metodo_pago` (`metodo_pago`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `condicion` (`condicion`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `rutina_plan`
--
ALTER TABLE `rutina_plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `condicion`
--
ALTER TABLE `condicion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `detalle_planes`
--
ALTER TABLE `detalle_planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `rutina_plan`
--
ALTER TABLE `rutina_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`id_entrenador`) REFERENCES `entrenador` (`id`),
  ADD CONSTRAINT `asistencias_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `asistencias_ibfk_5` FOREIGN KEY (`id_detalle`) REFERENCES `detalle_planes` (`id`);

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_planes`
--
ALTER TABLE `detalle_planes`
  ADD CONSTRAINT `detalle_planes_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_planes_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_planes_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  ADD CONSTRAINT `pagos_planes_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_planes_ibfk_4` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `pagos_planes_ibfk_5` FOREIGN KEY (`id_detalle`) REFERENCES `detalle_planes` (`id`),
  ADD CONSTRAINT `pagos_planes_ibfk_6` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id`),
  ADD CONSTRAINT `pagos_planes_ibfk_metodo_pago` FOREIGN KEY (`metodo_pago`) REFERENCES `metodo_pago` (`id`);

--
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `planes_ibfk_2` FOREIGN KEY (`condicion`) REFERENCES `condicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD CONSTRAINT `rutinas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `rutina_plan`
--
ALTER TABLE `rutina_plan`
  ADD CONSTRAINT `rutina_plan_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rutina_plan_ibfk_2` FOREIGN KEY (`id_rutina`) REFERENCES `rutinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
