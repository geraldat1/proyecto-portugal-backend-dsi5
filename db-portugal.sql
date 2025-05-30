-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2025 a las 21:35:21
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
-- Base de datos: `new-2`
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
(1, '2025-05-27', '08:00:00', '14:01:20', 1, 1, 1, 0),
(2, '2025-05-27', '08:30:00', '13:32:20', 2, 1, 1, 0),
(3, '2025-05-27', '09:00:00', '14:01:23', 3, 2, 1, 0),
(4, '2025-05-29', '09:30:00', '01:22:31', 4, 2, 1, 0),
(5, '2025-05-29', '10:00:00', '01:22:26', 5, 3, 1, 0),
(6, '2025-05-29', '10:30:00', '01:22:23', 6, 3, 1, 0),
(7, '2025-05-29', '11:00:00', '01:22:20', 7, 4, 1, 0),
(8, '2025-04-08', '11:30:00', '13:51:35', 8, 4, 1, 0),
(9, '2025-04-09', '12:00:00', '13:51:41', 9, 5, 1, 0),
(10, '2025-04-10', '12:30:00', '14:26:57', 10, 5, 1, 0),
(14, '2025-05-23', '01:31:14', '14:14:59', 1, 1, 1, 0),
(15, '2025-05-08', '01:30:49', '03:49:56', 1, 1, 1, 0),
(17, '2025-05-08', '02:07:07', '03:48:23', 1, 1, 1, 0),
(21, '2025-05-25', '14:30:45', '14:30:58', 1, 1, 1, 0),
(22, '2025-05-27', '14:37:32', '14:47:01', 5, 1, 1, 0),
(23, '2025-05-27', '15:42:29', '15:42:36', 1, 1, 1, 0),
(24, '2025-05-28', '01:09:59', '02:49:32', 1, 1, 1, 0),
(25, '2025-05-28', '01:14:14', '01:14:20', 2, 3, 1, 0),
(27, '2025-05-28', '01:33:01', '01:33:13', 1, 4, 1, 0),
(44, '2025-05-28', '14:48:09', '01:25:22', 1, 2, 1, 0),
(45, '2025-05-28', '14:49:30', '14:49:46', 20, 9, 1, 0),
(46, '2025-05-28', '14:58:29', '01:26:55', 3, 10, 1, 0),
(47, '2025-05-28', '15:11:49', '15:48:21', 8, 9, 1, 0),
(48, '2025-05-28', '15:48:02', '15:48:06', 6, 5, 1, 0),
(49, '2025-05-28', '15:50:23', '15:50:37', 19, 7, 1, 0),
(50, '2025-05-28', '15:55:19', NULL, 19, 10, 1, 1),
(51, '2025-05-28', '16:50:31', '16:53:02', 7, 9, 1, 0),
(52, '2025-05-29', '13:51:00', NULL, 21, 10, 1, 1),
(53, '2025-05-29', '13:51:30', '14:10:34', 8, 7, 1, 0),
(54, '2025-05-29', '13:52:01', NULL, 8, 10, 1, 1),
(55, '2025-05-29', '13:56:15', '14:26:32', 8, 7, 1, 0),
(56, '2025-05-29', '14:15:10', NULL, 10, 6, 1, 1),
(57, '2025-05-29', '14:19:12', NULL, 11, 11, 1, 1),
(58, '2025-05-29', '14:19:25', NULL, 11, 11, 1, 1),
(59, '2025-05-29', '14:33:26', NULL, 4, 7, 1, 1);

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
(6, '56789012', 'Sofía López', '987654326', 'Av. Brasil 789, Lima', '2025-04-29 13:28:48', 1, 1),
(7, '67890123', 'Pedro Martínez', '987654327', 'Calle Los Ángeles 234, Lima', '2025-04-29 13:28:48', 1, 1),
(8, '78901234', 'Lucía Sánchez', '987654328', 'Av. Tacna 345, Lima', '2025-04-29 13:28:48', 1, 1),
(9, '89012345', 'Diego Morales', '987654329', 'Calle San Juan 456, Lima', '2025-04-29 13:28:48', 1, 1),
(10, '90123456', 'Valeria Castro', '987654331', 'Av. Pardo 567, Lima', '2025-05-08 15:44:12', 1, 1),
(18, '73069140', 'Javier Avila', '987654321', 'Jr. Tarapaca 189', '2025-05-21 20:45:42', 1, 1),
(19, '75546570', 'Andrea Manihuari', '987654444', 'Jr. Virgen de las nieves', '2025-05-21 21:21:25', 1, 1),
(20, '73069140', 'Gerald Avila ', '988418747', 'Jr. Salaverry 187', '2025-05-29 06:43:35', 0, 1);

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
(1, 1, 1, '2025-05-08', '13:40:48', '2026-04-01', '2026-04-23', 1, 1),
(2, 2, 2, '2025-04-02', '08:30:00', '2026-04-02', '2026-04-12', 1, 1),
(3, 3, 3, '2025-04-03', '09:00:00', '2026-04-03', '2026-04-15', 1, 1),
(4, 4, 4, '2025-04-04', '09:30:00', '2026-04-04', '2026-04-20', 1, 1),
(5, 5, 3, '2025-05-07', '15:46:22', '2026-04-05', '2026-04-25', 1, 1),
(6, 6, 1, '2025-04-06', '10:30:00', '2026-04-06', '2026-04-30', 1, 1),
(7, 7, 2, '2025-04-07', '11:00:00', '2026-04-07', '2026-05-05', 1, 1),
(8, 8, 3, '2025-04-08', '11:30:00', '2026-04-08', '2026-05-10', 1, 1),
(9, 9, 4, '2025-04-09', '12:00:00', '2026-04-09', '2026-05-15', 1, 1),
(10, 10, 5, '2025-04-10', '12:30:00', '2026-04-10', '2026-05-20', 1, 1),
(11, 2, 1, '2025-05-08', '01:12:43', '2025-05-06', '2025-05-21', 1, 1),
(14, 1, 1, '2025-05-07', '00:01:02', '2025-05-07', '2025-05-08', 1, 1),
(16, 1, 2, '2025-05-07', '15:47:01', '2025-05-15', '2025-06-25', 1, 1),
(17, 7, 3, '2025-05-08', '15:04:47', '2025-05-09', '2025-06-26', 1, 1),
(18, 6, 2, '2025-05-20', '14:25:51', '2025-05-23', '2025-08-01', 1, 1),
(19, 19, 2, '2025-05-28', '15:58:54', '2025-05-28', '2025-05-29', 1, 1),
(20, 20, 1, '2025-05-22', '20:59:25', '2025-05-23', '2025-07-23', 1, 1),
(21, 20, 3, '2025-05-21', '21:09:52', '2025-05-23', '2025-07-24', 1, 1),
(22, 18, 5, '2025-05-21', '21:14:16', '2025-05-24', '2025-08-28', 1, 1),
(23, 4, 3, '2025-05-29', '01:16:00', '2025-05-29', '2025-05-31', 1, 0);

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
(11, 'Javier', 'Avila', '987654322', 'gerald@gmail.com', 'Jr. Tarapaca 187', 0);

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
(2, 2, 2, 2, 20.00, '2025-04-02', '08:30:00', 1, 1),
(3, 3, 3, 3, 100.00, '2025-04-03', '09:00:00', 1, 1),
(4, 4, 4, 4, 300.00, '2025-04-04', '09:30:00', 1, 1),
(5, 5, 5, 4, 139.00, '2025-05-08', '10:17:40', 1, 1),
(9, 1, 1, 1, 55.00, '2025-05-14', '09:12:53', 1, 1),
(10, 1, 1, 1, 55.00, '2025-05-14', '13:26:38', 1, 1),
(11, 2, 2, 2, 40.00, '2025-05-20', '13:24:16', 1, 1),
(12, 5, 5, 3, 100.00, '2025-05-20', '13:39:11', 1, 1),
(13, 17, 7, 3, 100.00, '2025-05-20', '13:39:57', 1, 1),
(14, 11, 2, 1, 55.00, '2025-05-20', '13:41:55', 1, 1),
(15, 5, 5, 3, 100.00, '2025-05-20', '13:55:25', 1, 1),
(16, 17, 7, 3, 100.00, '2025-05-20', '14:01:50', 1, 1),
(17, 17, 7, 3, 100.00, '2025-05-20', '14:02:06', 1, 1),
(18, 17, 7, 3, 100.00, '2025-05-20', '14:02:35', 1, 1),
(19, 5, 5, 3, 100.00, '2025-05-20', '14:18:40', 1, 1),
(20, 18, 6, 2, 40.00, '2025-05-20', '14:26:05', 1, 1),
(21, 5, 5, 3, 100.00, '2025-05-20', '14:40:38', 1, 1),
(22, 11, 2, 1, 55.00, '2025-05-20', '14:42:20', 1, 1),
(23, 5, 5, 3, 100.00, '2025-05-20', '15:00:09', 1, 1),
(24, 18, 6, 2, 40.00, '2025-05-20', '15:36:00', 1, 1),
(25, 19, 19, 2, 40.00, '2025-05-21', '15:46:38', 1, 1),
(26, 19, 19, 2, 40.00, '2025-05-22', '20:51:15', 1, 1),
(27, 19, 19, 2, 40.00, '2025-05-22', '20:52:27', 1, 1),
(28, 17, 7, 3, 100.00, '2025-05-22', '20:52:48', 1, 1),
(29, 20, 20, 1, 55.00, '2025-05-22', '21:09:33', 1, 1),
(30, 21, 20, 3, 100.00, '2025-05-22', '21:13:18', 1, 1),
(31, 21, 20, 3, 100.00, '2025-05-22', '21:13:41', 1, 1),
(32, 18, 6, 2, 40.00, '2025-05-24', '18:48:09', 1, 1),
(33, 22, 18, 5, 147.00, '2025-05-24', '18:55:05', 1, 1);

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
(1, 'Plan para adelgazar con Aerodance (8 semanas)', 'Baile y aeróbicos para quemar calorías de forma divertida y efectiva.', 55.00, 'Anual', '/imagenes/plan/plan-5.jpg', 1, 1),
(2, 'Plan para mantenerse en forma con actividades variadas (8 semanas)', 'Aerodance, pilates, yoga, GAP y más. Actividades variadas para mantenerte activo con energía.', 40.00, 'MENSUAL', '/imagenes/plan/plan-2.jpg', 1, 1),
(3, 'Plan para empezar (8 semanas)', 'Para quienes quieren empezar a hacer ejercicio de forma gradual y con motivación.', 100.00, 'MENSUAL', '/imagenes/plan/plan-3.jpeg', 1, 1),
(4, 'Reto 30 días', 'Únete al reto y ponte en forma en tiempo récord con una rutina intensa y enfocada.', 300.00, 'MENSUAL', '/imagenes/plan/plan-4.jpg', 1, 1),
(5, 'Tonifica tu cuerpo en 4 semanas', 'Programa estructurado de 4 semanas con clases en video para esculpir y tonificar tu cuerpo paso a paso.', 147.00, 'MENSUAL', '/imagenes/plan/plan-5.jpg', 1, 1),
(12, 'sasas', 'dadasdasd', 90.00, 'Anual', '/imagenes/plan/plan-5.jpg', 0, 1);

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
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalle_planes`
--
ALTER TABLE `detalle_planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
-- Filtros para la tabla `pagos_planes`
--
ALTER TABLE `pagos_planes`
  ADD CONSTRAINT `pagos_planes_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_planes_ibfk_4` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `pagos_planes_ibfk_5` FOREIGN KEY (`id_detalle`) REFERENCES `detalle_planes` (`id`),
  ADD CONSTRAINT `pagos_planes_ibfk_6` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id`);

--
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
