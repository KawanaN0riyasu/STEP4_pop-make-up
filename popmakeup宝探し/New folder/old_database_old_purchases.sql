-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: db-tech0-gen5-step4-onpremise.mysql.database.azure.com    Database: old_database
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `old_purchases`
--

DROP TABLE IF EXISTS `old_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `old_purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `sale_id` (`sale_id`),
  CONSTRAINT `old_purchases_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `old_sales` (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `old_purchases`
--

LOCK TABLES `old_purchases` WRITE;
/*!40000 ALTER TABLE `old_purchases` DISABLE KEYS */;
INSERT INTO `old_purchases` VALUES (1,1,NULL,'2023-11-08','Credit Card',20182.90),(2,1,'Samantha Mcgee','2024-01-12','Cash',48819.46),(3,5,'Christopher Hunter','2023-03-23','Credit Card',29096.31),(4,7,NULL,'2024-02-02','Cash',44039.78),(5,3,NULL,'2024-02-12',NULL,NULL),(6,1,'Carol Novak','2023-09-11','Credit Card',39878.68),(7,10,NULL,'2023-05-04',NULL,NULL),(8,4,NULL,'2023-07-11','Cash',49139.65),(9,8,NULL,'2023-07-24','Credit Card',37283.26),(10,2,'Felicia Davis','2024-02-02',NULL,NULL),(11,5,NULL,'2023-12-30',NULL,NULL),(12,4,'Dr. Michael Bryant','2023-07-19',NULL,NULL),(13,8,'Shannon Nguyen','2023-10-10','Cash',44889.11),(14,6,'John Thomas','2023-09-21','Cash',48093.54),(15,5,'Tina Clarke','2023-07-30',NULL,NULL),(16,9,NULL,'2023-04-16','Cash',29898.38),(17,8,NULL,'2024-01-30',NULL,NULL),(18,9,'Christina Stephenson','2023-08-11',NULL,NULL),(19,5,'Robert Shaffer','2023-09-03','Credit Card',23613.47),(20,7,'Shawn Nelson','2023-03-19','Cash',24511.14),(21,4,'Harold Phillips','2023-08-24',NULL,NULL),(22,8,NULL,'2023-11-14',NULL,NULL),(23,2,NULL,'2024-02-14',NULL,NULL),(24,5,NULL,'2023-09-30',NULL,NULL),(25,8,'James Klein','2023-10-02','Credit Card',43757.07),(26,1,'Daniel Newman','2023-10-08',NULL,NULL),(27,10,NULL,'2023-04-25','Credit Card',38896.62),(28,2,'Brenda Black MD','2024-01-21','Credit Card',28620.99),(29,2,NULL,'2023-12-28','Cash',46049.11),(30,2,'Robert Hanson','2023-12-25','Credit Card',25350.00),(31,2,NULL,'2023-08-26','Credit Card',32392.66),(32,9,NULL,'2023-04-26',NULL,NULL),(33,4,'Christine Miller','2023-09-26','Cash',21289.43),(34,5,'Kenneth Conley','2023-12-17','Credit Card',24588.75),(35,1,'Anita Curtis','2023-07-31','Cash',22883.85),(36,4,NULL,'2023-05-19',NULL,NULL),(37,9,NULL,'2023-07-23','Cash',38524.88),(38,5,NULL,'2023-04-22','Cash',24159.25),(39,5,'Jill Ellison','2023-03-23',NULL,NULL),(40,6,NULL,'2023-09-11',NULL,NULL),(41,6,NULL,'2023-08-09','Cash',47278.50),(42,1,'Jason Barker','2023-04-14','Cash',35372.82),(43,10,NULL,'2023-12-14',NULL,NULL),(44,1,'Lisa Green','2023-08-08',NULL,NULL),(45,5,'Matthew Waller','2024-01-02',NULL,NULL),(46,4,NULL,'2023-12-25','Cash',24847.80),(47,9,'Michele Henson','2023-03-28','Credit Card',32639.40),(48,3,'Julie Williams','2023-10-04','Credit Card',33426.98),(49,9,'Michael Cunningham','2023-11-22',NULL,NULL),(50,1,'Michelle Jackson','2023-09-20','Credit Card',20643.79),(51,6,NULL,'2023-10-30','Cash',23276.08),(52,6,NULL,'2023-10-03','Cash',26326.67),(53,4,'Brian Carter','2023-06-11','Credit Card',31828.21),(54,4,'Cynthia Mcmillan','2023-08-30',NULL,NULL),(55,3,'Daniel Robinson','2023-09-06','Credit Card',28000.33),(56,3,'Renee Christensen','2023-04-03','Credit Card',33814.81),(57,9,'Erin Mooney','2023-03-20',NULL,NULL),(58,9,'Kimberly Rodriguez','2023-04-08','Cash',30282.25),(59,4,'Antonio Turner','2023-08-20','Credit Card',46426.64),(60,3,NULL,'2023-05-13',NULL,NULL),(61,1,NULL,'2023-05-19','Cash',28407.14),(62,10,NULL,'2023-09-01',NULL,NULL),(63,1,'Robert Morgan','2023-08-22','Credit Card',31941.09),(64,6,NULL,'2023-06-14',NULL,NULL),(65,2,NULL,'2023-08-23',NULL,NULL),(66,8,'Erica Watkins','2023-11-24','Cash',41641.67),(67,2,'James Watson','2024-03-07',NULL,NULL),(68,6,'Andre Cummings','2023-09-19','Cash',49208.28),(69,9,'Seth Collins','2023-08-29','Cash',24814.94),(70,9,NULL,'2023-05-15','Credit Card',21268.40),(71,6,'Christina Delacruz','2023-11-06','Credit Card',26168.94),(72,5,NULL,'2023-12-09','Credit Card',39875.65),(73,2,NULL,'2023-09-17','Credit Card',41308.38),(74,4,'Theresa Wilkinson','2023-07-08','Cash',34387.32),(75,10,NULL,'2023-07-01',NULL,NULL),(76,9,NULL,'2023-09-10','Credit Card',30914.53),(77,10,NULL,'2023-10-08','Credit Card',33570.56),(78,6,'Steven Galloway','2023-10-23',NULL,NULL),(79,3,'Bradley Bowman','2023-06-24',NULL,NULL),(80,7,'Jeremy Alvarado DVM','2023-10-13',NULL,NULL),(81,8,'Ryan Wilson','2024-03-08',NULL,NULL),(82,8,NULL,'2023-12-07','Cash',42726.76),(83,4,'Mark Brown','2024-01-23','Credit Card',41633.28),(84,2,'Theresa Ross','2023-12-04','Cash',48623.84),(85,2,'Samantha Murray','2023-11-06',NULL,NULL),(86,9,'Kimberly Arias','2023-11-12',NULL,NULL),(87,5,'Craig Quinn','2024-01-03','Credit Card',43221.92),(88,6,NULL,'2023-07-20',NULL,NULL),(89,9,'Sean Hickman','2024-03-14','Credit Card',41196.41),(90,1,'Kathleen Morris','2024-01-05','Credit Card',29949.48),(91,5,NULL,'2023-05-04','Credit Card',44692.00),(92,3,NULL,'2023-08-18','Cash',39130.65),(93,6,'Richard Johnson','2023-10-13','Cash',32345.79),(94,5,NULL,'2024-01-14','Cash',28783.27),(95,9,'Justin Garcia','2024-01-25',NULL,NULL),(96,9,NULL,'2023-03-24','Cash',31183.75),(97,10,NULL,'2023-12-11','Cash',39675.04),(98,8,'Daniel Thompson','2023-10-28',NULL,NULL),(99,3,NULL,'2023-04-18',NULL,NULL),(100,10,'Kenneth Hood','2023-07-02',NULL,NULL);
/*!40000 ALTER TABLE `old_purchases` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22  3:28:18
