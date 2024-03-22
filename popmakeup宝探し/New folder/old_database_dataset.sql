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
-- Table structure for table `dataset`
--

DROP TABLE IF EXISTS `dataset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dataset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `random_fruit` varchar(255) DEFAULT NULL,
  `prime_number` int DEFAULT NULL,
  `famous_quote` text,
  `temperature` float DEFAULT NULL,
  `email_domain` varchar(255) DEFAULT NULL,
  `imaginary_color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dataset`
--

LOCK TABLES `dataset` WRITE;
/*!40000 ALTER TABLE `dataset` DISABLE KEYS */;
INSERT INTO `dataset` VALUES (1,'Alfred Morales',3,'Keep pass animal long each.',2.76,'hotmail.com','DarkOliveGreen'),(2,'Brett Underwood',10,'Force large wide.',-6.18,'yahoo.com','Beige'),(3,'Jill Simmons',5,'Key season rock involve.',12.37,'gmail.com','DodgerBlue'),(4,'Patrick Collier',NULL,'Receive somebody pay task.',24.41,'hotmail.com','DarkTurquoise'),(5,'Richard Jones',NULL,'Event star do region tax.',-14.61,'hotmail.com','DarkCyan'),(6,'Makayla Olson',NULL,'Still view the.',-8.63,'hotmail.com','Lime'),(7,'William Shepherd',NULL,'My whole increase few mouth.',34.86,'yahoo.com','DeepPink'),(8,'Joanna Perkins',NULL,'Simple rule notice citizen.',10.62,'yahoo.com','HoneyDew'),(9,'Robert Short',NULL,'Themselves campaign under small.',-10.02,'hotmail.com','Chartreuse'),(10,'Joshua Bradley',NULL,'Research environmental prevent effect professional raise court.',-13.2,'yahoo.com','DarkKhaki'),(11,'Christopher Brooks',NULL,'And air be marriage.',13.39,'yahoo.com','Orange'),(12,'Dr. Anthony Morris',NULL,'Produce begin top ten size.',22.49,'hotmail.com','DeepPink'),(13,'Jennifer Gonzalez',3,'Policy visit imagine teacher almost.',3.37,'hotmail.com','AliceBlue'),(14,'Cathy Powell',4,'Before speak whole factor easy.',-2.26,'hotmail.com','LightBlue'),(15,'Nicholas Norman',2,'Human arrive so.',16.85,'hotmail.com','LightCyan'),(16,'Mrs. Megan Silva MD',NULL,'Lose reach light her try box.',-2.4,'gmail.com','Tomato'),(17,'Adam Garcia',9,'None too scientist front I commercial social should.',27.99,'gmail.com','Olive'),(18,'Eric Norman',NULL,'Affect likely crime inside admit.',-16.15,'gmail.com','RoyalBlue'),(19,'Kirsten Aguilar',NULL,'Behavior dinner effect great practice chair.',11.17,'gmail.com','LawnGreen'),(20,'Michael Hutchinson',10,'Sport possible program heavy billion grow final.',18.8,'yahoo.com','LightCoral'),(21,'Mr. Roy Rodriguez',NULL,'Scientist over officer interest practice.',24.79,'yahoo.com','SteelBlue'),(22,'Gerald Gonzales',NULL,'Bag building here girl.',38.12,'yahoo.com','HotPink'),(23,'Kenneth Boyle',7,'Wear artist paper early receive.',22.59,'yahoo.com','PaleGoldenRod'),(24,'Jennifer Brandt',9,'Authority size section month do stop.',13.13,'yahoo.com','DarkOrange'),(25,'William Parker',NULL,'Management price wide our decade continue claim though.',-0.57,'gmail.com','DeepSkyBlue'),(26,'Justin Rosales',8,'Relate difficult tree number admit budget.',-15.67,'yahoo.com','Lavender'),(27,'Stacey Smith',NULL,'Later cup few agreement front west or.',10.9,'gmail.com','Chocolate'),(28,'Karen Garcia',NULL,'Economy actually card again.',7.02,'gmail.com','SpringGreen'),(29,'Nicole Hansen',NULL,'Staff spring understand relate training account.',21.41,'hotmail.com','DimGray'),(30,'Jonathan Myers',3,'Participant trip week risk.',1.42,'yahoo.com','Yellow'),(31,'Cody Johnson',2,'Perhaps rise hospital best.',0.92,'gmail.com','NavajoWhite'),(32,'Erin Escobar',1,'Education give move me.',27.39,'hotmail.com','LightCoral'),(33,'Amy Vazquez',NULL,'Also call sense what commercial.',17.92,'hotmail.com','Cornsilk'),(34,'Madison Hamilton',9,'Already hot north attention blood.',-3.53,'yahoo.com','Coral'),(35,'Daniel Mccarty',NULL,'Hotel walk budget speak new cold must.',-15.27,'gmail.com','DarkOrchid'),(36,'Christopher Wood',NULL,'Investment day time lose task stay arm.',6.08,'gmail.com','Teal'),(37,'Phillip Frederick',NULL,'Page baby report walk.',-14.48,'hotmail.com','DarkBlue'),(38,'Gregory Orr DDS',NULL,'Data tell town everything position administration federal.',-4.18,'gmail.com','BurlyWood'),(39,'Jason Hurley',10,'Someone pressure city school perform him.',-1.04,'yahoo.com','Azure'),(40,'Mary Parker DDS',NULL,'Do word sound admit environment model single.',-10.97,'hotmail.com','SlateBlue'),(41,'Victor Spencer',NULL,'Around through billion tonight party none case.',33.35,'yahoo.com','MediumVioletRed'),(42,'Paul Brennan',NULL,'Their store difficult sit single.',-17.72,'hotmail.com','Lime'),(43,'Gregory Williams',NULL,'In market civil company talk.',-3.56,'gmail.com','Gainsboro'),(44,'Lori Campbell',NULL,'Worker race keep sometimes door.',25.97,'hotmail.com','Red'),(45,'Lindsay Nelson',NULL,'Thought I exist yourself task sister.',8.31,'yahoo.com','HoneyDew'),(46,'James Ray',NULL,'Nor south indeed network whatever.',11.56,'gmail.com','NavajoWhite'),(47,'Antonio Burgess',NULL,'Much environmental car treat agreement many fine.',26.7,'hotmail.com','SlateBlue'),(48,'Jennifer Camacho',5,'Number practice catch source manager.',-14.7,'yahoo.com','SeaGreen'),(49,'Nathan Cox',4,'Wrong data ago last understand somebody.',6.69,'hotmail.com','DarkTurquoise'),(50,'Holly Perez',NULL,'Board face us degree.',-19.66,'yahoo.com','White');
/*!40000 ALTER TABLE `dataset` ENABLE KEYS */;
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
