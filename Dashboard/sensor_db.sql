-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2025 at 01:13 PM
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
-- Database: `sensor_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `sensor_data`
--

CREATE TABLE `sensor_data` (
  `id` int(11) NOT NULL,
  `sensor_id` varchar(50) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor_data`
--

INSERT INTO `sensor_data` (`id`, `sensor_id`, `value`, `timestamp`) VALUES
(169, 'sensor_1', 26.82, '2025-04-01 00:00:00'),
(170, 'sensor_2', 28.82, '2025-04-01 00:00:00'),
(171, 'sensor_3', 20.91, '2025-04-01 00:00:00'),
(172, 'sensor_4', 22.46, '2025-04-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(2, 'isuru', 'isuru@gmail.com', '$2y$10$1JSMNBOgzXP6nXKP.mHQJe3fFv4tvup9KQ1carc/hCvroEunHCJIy'),
(5, 'admin2', 'isuru123@gmail.com', '$2y$10$iBxzOqhOpkAx9y7CRNE2Bu/P6SDEjhZkqdz1swwGtX3v0pkPsJKf2'),
(6, 'admin3', 'isuru1234@gmail.com', '$2y$10$niuDaHo9DKWaV7lFcG6LQ.kRB7bw0YJA2tmZWzXl/HvC47nftZ5K2'),
(7, 'isuru udara', 'isuru619@gmail.com', '$2y$10$ctcGZJKtXXukathgk8Q5juiiLYBwhJaKlBKJGPmeVP/JyQIE7hPWK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sensor_data`
--
ALTER TABLE `sensor_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_timestamp` (`timestamp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sensor_data`
--
ALTER TABLE `sensor_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
