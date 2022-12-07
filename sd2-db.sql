-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 30, 2022 at 09:54 AM
-- Server version: 8.0.24
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Homifye`
--

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `Admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(512) NOT NULL,
  `age` int,
  `gender` varchar(1) NOT NULL,
  `phone_no` int(10) NOT NULL,
  `email_id` varchar(50) NOT NULL,
  PRIMARY KEY (`admin_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Home` (
  `home_id` int NOT NULL AUTO_INCREMENT,
  `home_name` varchar(512) NOT NULL,
  `full_address` varchar(512) NOT NULL,
  `admin_id` int NOT NULL,
  FOREIGN KEY(admin_id) REFERENCES Admin(admin_id),
  PRIMARY KEY (`home_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE Admin_Homes(
`admin` int NOT NULL,
`home` int NOT NULL,
FOREIGN KEY (admin) REFERENCES Admin(admin_id),
FOREIGN KEY (home) REFERENCES Home(home_id))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `test_table`
--
INSERT INTO `Admin` (`admin_id`, `admin_name`, `age`, `gender`, `phone_no`, `email_id`) VALUES 
('1', 'Ellen', '28', 'F', '1234567890', 'ellen@abc.com'),
('2', 'Zahra', '24', 'F', '0987654321', 'zahra@abc.com');

INSERT INTO `Home` (`home_id`, `home_name`, `full_address`, `admin_id`) VALUES
('1', 'Zahra`s Sweet Home', '32B Star lane E34 $6G', '2'),
('2', 'Ellen`s Sweet Home', '32A Star Lane E34 45G','1');

INSERT INTO `Admin_Homes` (admin, home) VALUES
('1', '2'),
('2', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `test_table`

--


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `test_table`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;