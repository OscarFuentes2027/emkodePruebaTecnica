-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2025 at 02:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banco_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cuentasahorro`
--

CREATE TABLE `cuentasahorro` (
  `idCuenta` int(11) NOT NULL,
  `idClientes` int(11) NOT NULL,
  `dinero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cuentasahorro`
--

INSERT INTO `cuentasahorro` (`idCuenta`, `idClientes`, `dinero`) VALUES
(1, 1, 5000),
(2, 1, 15000),
(3, 2, 3499),
(5, 5, 2828),
(6, 3, 1222),
(7, 3, 123213),
(8, 2, 122),
(9, 5, 132131);

-- --------------------------------------------------------

--
-- Table structure for table `idcliente`
--

CREATE TABLE `idcliente` (
  `idClientes` int(11) NOT NULL,
  `tipoId` varchar(200) NOT NULL,
  `numId` varchar(20) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `razonSocial` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `idcliente`
--

INSERT INTO `idcliente` (`idClientes`, `tipoId`, `numId`, `nombre`, `apellidos`, `razonSocial`, `municipio`) VALUES
(1, 'INE', '324234234', 'Luis', 'Suarez', '', 'Morelia'),
(2, 'INE', '234234', 'Sergio', 'Suarez', '', 'Morelia'),
(3, 'INE', '123123123', 'Oscar Oswaldo', 'Fuentes Ordaz', 'Emkode', 'Morelia'),
(5, 'INE', '2323123', 'Oscar', 'Fuentes', NULL, 'Zacapu'),
(6, 'DNI', '12345678', 'Juan', 'Pérez', 'MiEmpresa', 'Madrid'),
(7, 'INE', '123123', 'Oscar', 'Fuentes', 'Pokode', 'Zacapu');

-- --------------------------------------------------------

--
-- Table structure for table `tablatransacciones`
--

CREATE TABLE `tablatransacciones` (
  `idTransaccion` int(11) NOT NULL,
  `idCuenta` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Clave` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tablatransacciones`
--

INSERT INTO `tablatransacciones` (`idTransaccion`, `idCuenta`, `Fecha`, `Hora`, `Clave`) VALUES
(1, 1, '2025-01-07', '22:08:13', 'BAN123'),
(3, 3, '2025-01-08', '07:48:14', 'BAN12344'),
(4, 3, '2025-01-08', '07:48:41', 'BAN1'),
(5, 8, '2025-01-09', '01:11:44', 'BAN1'),
(6, 6, '2025-01-09', '01:12:56', 'BAN1'),
(7, 9, '2025-01-09', '01:29:16', 'BAN1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuentasahorro`
--
ALTER TABLE `cuentasahorro`
  ADD PRIMARY KEY (`idCuenta`),
  ADD KEY `idClientes` (`idClientes`);

--
-- Indexes for table `idcliente`
--
ALTER TABLE `idcliente`
  ADD PRIMARY KEY (`idClientes`);

--
-- Indexes for table `tablatransacciones`
--
ALTER TABLE `tablatransacciones`
  ADD PRIMARY KEY (`idTransaccion`),
  ADD KEY `idCuenta` (`idCuenta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuentasahorro`
--
ALTER TABLE `cuentasahorro`
  MODIFY `idCuenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `idcliente`
--
ALTER TABLE `idcliente`
  MODIFY `idClientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tablatransacciones`
--
ALTER TABLE `tablatransacciones`
  MODIFY `idTransaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cuentasahorro`
--
ALTER TABLE `cuentasahorro`
  ADD CONSTRAINT `cuentasahorro_ibfk_1` FOREIGN KEY (`idClientes`) REFERENCES `idcliente` (`idClientes`);

--
-- Constraints for table `tablatransacciones`
--
ALTER TABLE `tablatransacciones`
  ADD CONSTRAINT `tablatransacciones_ibfk_1` FOREIGN KEY (`idCuenta`) REFERENCES `cuentasahorro` (`idCuenta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
