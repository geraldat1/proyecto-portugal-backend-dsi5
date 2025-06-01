-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2025 a las 03:37:22
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
-- Base de datos: `db-portugal`
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
  `id_entrenador` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id_asistencia`, `fecha`, `hora_entrada`, `hora_salida`, `id_detalle`, `id_entrenador`, `id_usuario`, `estado`) VALUES
(1, '2025-05-27', '08:00:00', '19:03:03', 1, 1, 1, 0),
(2, '2025-06-01', '20:17:25', NULL, 4, 4, 1, 1);

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
(4, '34567890', 'Ana Torres', '987654324', 'Av. Javier Prado 456, Lima', '2025-04-29 13:28:48', 1, 1),
(5, '45678901', 'Luis Fernández', '987654325', 'Calle La Paz 123, Lima', '2025-04-29 13:28:48', 1, 1),
(6, '73069140', 'Gerald Javier Avila Torres', '987654321', 'Jr. Tarapaca 187', '2025-06-01 01:24:33', 1, 1),
(7, '87654345', 'Andrea Tello', '987654323', 'Jr. Tupac Amaru', '2025-06-01 01:25:32', 1, 1);

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
  `logo` varchar(10) NOT NULL,
  `limite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `ruc`, `nombre`, `correo`, `telefono`, `direccion`, `mensaje`, `logo`, `limite`) VALUES
(1, '12345678909', 'ToretoGym', 'admin@gmail.com', '976664659', 'Av 9 de Octubre Jr. Manco Capac', 'Gracias por su preferencia', 'logo.png', 10);

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
(2, 2, 1, '2025-05-31', '19:05:19', '2025-05-31', '2025-06-07', 1, 2),
(3, 1, 2, '2025-05-31', '19:07:50', '2025-05-31', '2025-05-31', 1, 0),
(4, 3, 2, '2025-05-31', '19:18:45', '2025-05-31', '2025-06-07', 1, 2),
(5, 5, 2, '2025-05-31', '19:27:54', '2025-05-31', '2025-05-31', 1, 0),
(6, 5, 3, '2025-05-31', '19:31:08', '2025-05-31', '2025-06-07', 1, 0),
(7, 3, 5, '2025-05-31', '19:49:20', '2025-06-01', '2025-06-06', 1, 0),
(8, 1, 4, '2025-05-31', '19:55:47', '2025-07-01', '2025-07-06', 1, 0),
(9, 1, 3, '2025-05-31', '19:52:01', '2025-06-20', '2025-06-25', 1, 0),
(10, 1, 2, '2025-05-31', '20:06:10', '2025-06-30', '2025-07-05', 1, 1);

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
(1, 'José', 'García', '987654322', 'jose.garcia@gimnasiofitness.pe', 'Av. Puno 123, Lima', 0),
(2, 'María', 'López', '987654322', 'maria.lopez@gimnasiofitness.pe', 'Calle Los Olivos 567, Lima', 1),
(3, 'Carlos', 'Ramírez', '987654323', 'carlos.ramirez@gimnasiofitness.pe', 'Jr. San Martín 890, Lima', 1),
(4, 'Ana', 'Torres', '987654324', 'ana.torres@gimnasiofitness.pe', 'Av. Javier Prado 456, Lima', 1),
(5, 'Luis', 'Fernández', '987654325', 'luis.fernandez@gimnasiofitness.pe', 'Calle La Paz 123, Lima', 1);

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
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_user` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos_planes`
--

INSERT INTO `pagos_planes` (`id`, `id_detalle`, `id_cliente`, `id_plan`, `precio`, `fecha`, `hora`, `id_user`, `estado`) VALUES
(1, 2, 2, 2, 49.90, '2025-05-07', '00:47:10', 1, 1),
(2, 1, 1, 1, 55.00, '2025-06-01', '19:03:14', 1, 1),
(3, 2, 2, 1, 55.00, '2025-06-01', '19:05:21', 1, 1),
(4, 2, 2, 1, 55.00, '2025-06-01', '19:07:23', 1, 1),
(5, 4, 3, 2, 40.00, '2025-06-01', '19:22:35', 1, 1),
(6, 4, 3, 2, 40.00, '2025-06-01', '19:23:04', 1, 1),
(7, 2, 2, 1, 55.00, '2025-06-01', '19:23:11', 1, 1),
(8, 2, 2, 1, 55.00, '2025-06-01', '19:28:03', 1, 1),
(9, 4, 3, 2, 40.00, '2025-06-01', '19:28:37', 1, 1),
(10, 4, 3, 2, 40.00, '2025-06-01', '19:28:44', 1, 1),
(11, 2, 2, 1, 55.00, '2025-06-01', '19:28:50', 1, 1),
(12, 6, 5, 3, 100.00, '2025-06-01', '19:31:28', 1, 1),
(13, 6, 5, 3, 100.00, '2025-06-01', '19:34:06', 1, 1),
(14, 4, 3, 2, 40.00, '2025-06-01', '19:34:16', 1, 1),
(15, 2, 2, 1, 55.00, '2025-06-01', '19:34:24', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id` int(11) NOT NULL,
  `plan` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio_plan` decimal(10,2) NOT NULL,
  `condicion` varchar(20) NOT NULL,
  `imagen` varchar(50) NOT NULL DEFAULT 'default.png',
  `estado` int(11) NOT NULL DEFAULT 1,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`id`, `plan`, `descripcion`, `precio_plan`, `condicion`, `imagen`, `estado`, `id_user`) VALUES
(1, 'Plan para adelgazar con Aerodance', 'Baile y aeróbicos para quemar calorías de forma divertida y efectiva.', 55.00, 'Anual', '/imagenes/plan/plan-5.jpg', 1, 1),
(2, 'Plan para mantenerse en forma con actividades variadas', 'Aerodance, pilates, yoga, GAP y más. Actividades variadas para mantenerte activo con energía.', 40.00, 'MENSUAL', '/imagenes/plan/plan-2.jpg', 1, 1),
(3, 'Plan para empezar', 'Para quienes quieren empezar a hacer ejercicio de forma gradual y con motivación.', 100.00, 'MENSUAL', '/imagenes/plan/plan-3.jpeg', 1, 1),
(4, 'Reto 30 días', 'Únete al reto y ponte en forma en tiempo récord con una rutina intensa y enfocada.', 300.00, 'MENSUAL', '/imagenes/plan/plan-4.jpg', 1, 1),
(5, 'Tonifica tu cuerpo', 'Programa estructurado de 4 semanas con clases en video para esculpir y tonificar tu cuerpo paso a paso.', 147.00, 'MENSUAL', '/imagenes/plan/plan-5.jpg', 1, 1);

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
(29, 'DIA 29', 'Descanso Activo', 1, 1),
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
(1, 'admin', 'admin', 'admin@gmail.com', '$2b$10$C.1k1XxH24g96q.m7/sM0equMYFOkH7YDX8saCVPEpmSJYr6gNPNK', '987654321', 'avatar.svg', '1', '2025-04-30 20:40:36', 1);

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
-- Indices de la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_detalle` (`id_detalle`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

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
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalle_planes`
--
ALTER TABLE `detalle_planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `rutina_plan`
--
ALTER TABLE `rutina_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
