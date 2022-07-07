-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2022 at 08:20 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `efty_mbs`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_log`
--

CREATE TABLE `api_log` (
  `__kp_logid__lsan` int(11) NOT NULL,
  `_kf__clientid__lsxn` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `request` enum('GET','POST','OPTIONS','PUT','PATCH','DELETE') NOT NULL,
  `method` varchar(20) NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `params` text NOT NULL,
  `response` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `__kp__clientid__lsan` int(10) NOT NULL,
  `company_name` text NOT NULL,
  `contact_person` text NOT NULL,
  `file_names` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `api_key` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`__kp__clientid__lsan`, `company_name`, `contact_person`, `file_names`, `email`, `api_key`) VALUES
(18, 'Tigeen computing', 'Linga', 'ab,tico', 'linga@tigeen.ch', 'FD8A5E31550C-QFG-SWG3');

-- --------------------------------------------------------

--
-- Table structure for table `license`
--

CREATE TABLE `license` (
  `__kp__licenseid__lsan` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `component` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `expire_month` varchar(20) NOT NULL,
  `renewal_n_day` int(10) NOT NULL,
  `license_key` varchar(500) NOT NULL,
  `version` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `license`
--

INSERT INTO `license` (`__kp__licenseid__lsan`, `name`, `component`, `type`, `expire_month`, `renewal_n_day`, `license_key`, `version`) VALUES
(1, 'Tigeen Computing Sàrl', 'Complete', 'ProDeveloper', '202202', 30, 'xIId7Znl0e66/ic5Gzd7+OmX4+1kInXLbhtr3k1dBr', 'v11_5'),
(3, 'Tigeen Computing Sàrl', 'Complete', 'ProDeveloper', '202302', 30, 'lJ0g1sc1ghCgRb8Yt417J+Q+UOmwb5sH6eMv', 'v12_0');

-- --------------------------------------------------------

--
-- Table structure for table `subsciption`
--

CREATE TABLE `subsciption` (
  `__kp__subsid__lsan` int(10) NOT NULL,
  `_kf__clientid__lsxn` int(10) NOT NULL,
  `_kf__licenseid__lsxn` int(10) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `no_of_user` int(10) NOT NULL,
  `is_server` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_log`
--
ALTER TABLE `api_log`
  ADD PRIMARY KEY (`__kp_logid__lsan`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`__kp__clientid__lsan`) USING BTREE,
  ADD UNIQUE KEY `api_key` (`api_key`);

--
-- Indexes for table `license`
--
ALTER TABLE `license`
  ADD PRIMARY KEY (`__kp__licenseid__lsan`);

--
-- Indexes for table `subsciption`
--
ALTER TABLE `subsciption`
  ADD PRIMARY KEY (`__kp__subsid__lsan`),
  ADD KEY `_kf__clientid__lsxn` (`_kf__clientid__lsxn`),
  ADD KEY `_kf__licenseId__lsxn` (`_kf__licenseid__lsxn`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_log`
--
ALTER TABLE `api_log`
  MODIFY `__kp_logid__lsan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `__kp__clientid__lsan` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `license`
--
ALTER TABLE `license`
  MODIFY `__kp__licenseid__lsan` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subsciption`
--
ALTER TABLE `subsciption`
  MODIFY `__kp__subsid__lsan` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subsciption`
--
ALTER TABLE `subsciption`
  ADD CONSTRAINT `subsciption_ibfk_1` FOREIGN KEY (`_kf__clientid__lsxn`) REFERENCES `client` (`__kp__clientid__lsan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subsciption_ibfk_2` FOREIGN KEY (`_kf__licenseid__lsxn`) REFERENCES `license` (`__kp__licenseid__lsan`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
licenseproject