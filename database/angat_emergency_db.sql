-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2026 at 03:26 AM
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
-- Database: `angat_emergency_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `target` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `target`, `timestamp`) VALUES
(1, 1, 'Created', 'Incident Report #1', '2026-09-12 14:54:25'),
(2, 2, 'Updated', 'User: Pedro Reyes', '2026-09-12 14:54:25'),
(3, 3, 'Viewed', 'September Monthly Summary', '2026-09-12 14:54:25'),
(4, 3, 'Created', 'User: Activity Test User', '2026-09-12 16:01:41'),
(5, 3, 'Updated', 'User: Activity Test User Updated', '2026-09-12 16:03:45'),
(6, 3, 'Deleted', 'User: Activity Test User Updated', '2026-09-12 16:06:43'),
(7, 3, 'Created', 'User: test user', '2026-09-13 14:26:35'),
(8, 3, 'Updated', 'User: Maria Santos upd', '2026-09-13 14:27:33'),
(9, 3, 'Deleted', 'User: test user', '2026-09-13 14:32:39'),
(10, 3, 'Created', 'User: mariz test', '2026-09-13 14:45:19'),
(11, 3, 'Updated', 'User: Maria Santos up', '2026-09-13 14:53:23'),
(12, 3, 'Updated', 'User: Juan Dela Cruz', '2026-09-13 14:57:01'),
(13, 3, 'Created', 'User: notif', '2026-09-13 14:57:46'),
(14, 3, 'Deleted', 'User: notif', '2026-09-13 14:59:06'),
(15, 3, 'Created', 'User: notif', '2026-09-13 14:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` varchar(500) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `read`, `created_at`) VALUES
(1, 3, 'A new emergency report has been submitted.', 1, '2026-09-12 14:54:33'),
(2, 3, 'User account information was updated.', 1, '2026-09-12 14:54:33'),
(3, 1, 'A report requires review.', 0, '2026-09-12 14:54:33'),
(4, 3, 'User account \"Juan Dela Cruz\" was updated successfully.', 0, '2026-09-13 14:57:01'),
(5, 3, 'User account \"notif\" was created successfully.', 0, '2026-09-13 14:57:46'),
(6, 3, 'User account \"notif\" was deleted successfully.', 0, '2026-09-13 14:59:06'),
(7, 3, 'User account \"notif\" was created successfully.', 0, '2026-09-13 14:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `type` enum('Incident','Monthly','Summary') NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `date_created` date NOT NULL,
  `status` enum('Draft','Finalized') NOT NULL DEFAULT 'Draft',
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `title`, `type`, `barangay`, `created_by`, `date_created`, `status`, `content`, `created_at`) VALUES
(1, 'Flood Incident', 'Incident', 'Poblacion', 1, '2026-09-01', 'Finalized', 'Flood incident report for Poblacion.', '2026-09-12 14:54:11'),
(2, 'September Monthly Summary', 'Monthly', 'N/A', 2, '2026-09-10', 'Draft', 'Monthly emergency response summary.', '2026-09-12 14:54:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('Admin','Dispatcher','Medical','Police','Fire') NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Juan Dela Cruz', 'juan@example.com', 'TEMP_PASSWORD', 'Dispatcher', 'Inactive', '2026-09-12 14:53:48', '2026-09-13 14:57:01'),
(2, 'Maria Santos up', 'maria@example.com', 'TEMP_PASSWORD', 'Medical', 'Active', '2026-09-12 14:53:48', '2026-09-13 14:53:23'),
(3, 'Admin User', 'admin@example.com', '$2b$10$S75JuYVnzAEwnYvvF23X/eickrX9WP1zjqXG8A6nab.xWvXW3GDiu', 'Admin', 'Active', '2026-09-12 14:53:48', '2026-09-12 15:29:24'),
(7, 'mariz test', 'mariz@gmail.com', '$2b$10$6UOZaYg0qWT0fc4ObFBPg.nyB8TPdx.pqENbCtveYPszXS2V9VaP.', 'Medical', 'Active', '2026-09-13 14:45:19', '2026-09-13 14:45:19'),
(9, 'notif', 'notif@gmail.com', '$2b$10$QCIILjSG6fjGj/VlnfLZL.5t9M3x9d1durr5stOzfgaLBpaaVhk5m', 'Dispatcher', 'Active', '2026-09-13 14:59:38', '2026-09-13 14:59:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_activity_user` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notification_user` (`user_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reports_user` (`created_by`);

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
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notification_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `fk_reports_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
