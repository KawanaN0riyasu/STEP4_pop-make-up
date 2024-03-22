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
-- Table structure for table `data_table`
--

DROP TABLE IF EXISTS `data_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `random_animal` varchar(255) DEFAULT NULL,
  `random_city` varchar(255) DEFAULT NULL,
  `chemical_element` varchar(255) DEFAULT NULL,
  `historical_figure` varchar(255) DEFAULT NULL,
  `mathematical_formula` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_table`
--

LOCK TABLES `data_table` WRITE;
/*!40000 ALTER TABLE `data_table` DISABLE KEYS */;
INSERT INTO `data_table` VALUES (1,'Toni Stewart','Lake Meganshire','Carbon','William Williams','E=mc^2'),(2,'William Daniels','Odonnellburgh','Carbon','Anthony Dixon','E=mc^2'),(3,'Lee Romero','Doyleburgh','Hydrogen','David Simpson','E=mc^2'),(4,'Matthew Abbott','Port Casey','Carbon','Mark Smith','E=mc^2'),(5,'Nicholas Tanner','South Curtis','Carbon','Eric James','E=mc^2'),(6,'Cole Bell','Port Joshua','Nitrogen','Sarah Alvarez','E=mc^2'),(7,'Heather Robinson','South Tiffanyview','Oxygen','Samuel Daugherty','E=mc^2'),(8,'Carl Pollard','New Judyfurt','Nitrogen','Kelli Miller','E=mc^2'),(9,'Alison Williams','Davishaven','Carbon','Mary Roberts','E=mc^2'),(10,'Tina Ray','Lake Samantha','Nitrogen','Samantha Stafford','E=mc^2'),(11,'Jennifer Atkins','East Stevenstad','Nitrogen','Stephanie Jordan','E=mc^2'),(12,'Keith Mcguire','Lake Michael','Hydrogen','Susan Hood','E=mc^2'),(13,'Joshua Cole','Port Brian','Nitrogen','Theresa Gay','E=mc^2'),(14,'Jeremy Gregory','Port Michelleside','Carbon','Adam Livingston','E=mc^2'),(15,'Amber Torres','Ballmouth','Oxygen','Anita Hill','E=mc^2'),(16,'Lisa Hernandez','Port Kelly','Carbon','Autumn Kim','E=mc^2'),(17,'Michelle Barnes','Lake Tylerport','Oxygen','Tracy Tapia','E=mc^2'),(18,'Stephanie Paul','East Brenda','Nitrogen','Brian Reid','E=mc^2'),(19,'Karen Bonilla','North Rachelview','Hydrogen','Parker Bryan','E=mc^2'),(20,'Susan Miller','West Jasonberg','Carbon','Amy Francis','E=mc^2'),(21,'Willie Wood','New Kendra','Hydrogen','Whitney Jones','E=mc^2'),(22,'John Klein','Gonzalezborough','Hydrogen','Jesse Sanchez','E=mc^2'),(23,'Daniel Avery','Lake Justin','Carbon','Bryan Chen','E=mc^2'),(24,'Sarah Griffin','Jenniferton','Hydrogen','Tonya Fleming','E=mc^2'),(25,'John Molina','Tinaport','Oxygen','Matthew Harris','E=mc^2'),(26,'Megan Carter','North Shannonburgh','Hydrogen','James Navarro','E=mc^2'),(27,'Sharon Clark','North Tracy','Oxygen','Nathan Jackson','E=mc^2'),(28,'Loretta Mckinney','South Christianview','Hydrogen','Mr. Jeremy Huff','E=mc^2'),(29,'Amy Weber','Lambside','Oxygen','Kayla Hill','E=mc^2'),(30,'Janice Cunningham','Kathleenville','Carbon','Justin Friedman','E=mc^2'),(31,'Rachel Keller','South Kimberly','Carbon','Megan Clark','E=mc^2'),(32,'Anna Cooper','Lake Adamchester','Oxygen','Ann Flynn','E=mc^2'),(33,'Alejandro Collier','Christinaburgh','Hydrogen','Anthony Morris','E=mc^2'),(34,'Ashley Meyer','North Madison','Oxygen','Alejandro Miranda','E=mc^2'),(35,'Martha Riley','Kimberlyfurt','Nitrogen','Molly Curtis','E=mc^2'),(36,'Sean Smith','Oscarport','Nitrogen','Rebecca Williams','E=mc^2'),(37,'Erin Anderson','West Thomasmouth','Oxygen','Theresa Sullivan','E=mc^2'),(38,'Laura Lee','Valerieshire','Oxygen','Brian Martin','E=mc^2'),(39,'Arthur Hopkins','Noahview','Hydrogen','Laura Williams','E=mc^2'),(40,'Jennifer Smith','North Blake','Hydrogen','Melissa Irwin','E=mc^2'),(41,'David Mcdaniel','South Reneeton','Nitrogen','Kristen Reyes','E=mc^2'),(42,'Anna Gomez','Hugheshaven','Oxygen','Ashley Mason','E=mc^2'),(43,'Beverly Brown','Jesseview','Nitrogen','Crystal Parker','E=mc^2'),(44,'Crystal Bentley','South Kristinaville','Hydrogen','Mark Galloway','E=mc^2'),(45,'Theresa Fletcher','Jessicaland','Nitrogen','Scott Wells','E=mc^2'),(46,'Nathan Conley','Hallton','Oxygen','Andrew Brown','E=mc^2'),(47,'Douglas Miller','Port Sharonside','Hydrogen','David Reid','E=mc^2'),(48,'Danielle Melendez','East Philipfurt','Carbon','Linda Martinez','E=mc^2'),(49,'Heidi Jones','New Ellenton','Oxygen','Sheena Holmes','E=mc^2'),(50,'Scott Miller','Joelville','Carbon','Gregory Sullivan','E=mc^2'),(51,'Paul Kirk','Katherinemouth','Hydrogen','Brian Taylor','E=mc^2'),(52,'Raymond Petersen','Lake Jenniferview','Nitrogen','Jack Campbell','E=mc^2'),(53,'Joseph Lynn','Valentinefort','Hydrogen','Tammy Frye','E=mc^2'),(54,'Carlos Tanner','Port Jeremy','Oxygen','Lori Forbes','E=mc^2'),(55,'Wendy Prince','Kimberlyhaven','Nitrogen','Justin Phillips','E=mc^2'),(56,'Melissa Ruiz','Snowton','Carbon','Matthew Nichols','E=mc^2'),(57,'Lindsay Rodriguez','East Kathyville','Oxygen','Dennis Wilson','E=mc^2'),(58,'Lori Greene','West Stacyland','Oxygen','Robert Jones','E=mc^2'),(59,'Brittany Higgins','West Kristenside','Oxygen','Cynthia Castillo','E=mc^2'),(60,'Autumn Bailey','Combsburgh','Oxygen','Christopher Goodman','E=mc^2'),(61,'Bridget Gonzales','New Gerald','Hydrogen','Jared Welch','E=mc^2'),(62,'Kathleen Brown','Janetberg','Oxygen','Charles Reyes','E=mc^2'),(63,'Lauren Cruz','New John','Oxygen','Bradley Garcia','E=mc^2'),(64,'Carlos Dunn','Wilsonchester','Oxygen','Elizabeth White','E=mc^2'),(65,'Jay Hayes','Lake Melaniehaven','Oxygen','Jason Robinson','E=mc^2'),(66,'Samuel Ferguson','Port Johnville','Oxygen','Richard Johnson','E=mc^2'),(67,'Daniel Fischer','New Ellen','Hydrogen','Beth Acosta','E=mc^2'),(68,'Jennifer Bird','East Ashleyborough','Hydrogen','Lori Webb','E=mc^2'),(69,'Desiree Stout','Susanton','Hydrogen','Shelly Davis','E=mc^2'),(70,'Morgan Harper','Chaseton','Hydrogen','Jacqueline Oneal','E=mc^2'),(71,'Richard Carter','West Julian','Hydrogen','William Davis','E=mc^2'),(72,'Amanda Woods','Adamsshire','Hydrogen','Kenneth Mclean','E=mc^2'),(73,'Diana Blevins','North Cathyville','Carbon','David Harris','E=mc^2'),(74,'Ryan Williams','South Johnborough','Hydrogen','Christopher Jackson','E=mc^2'),(75,'Jennifer Wilson','Angelaport','Carbon','Shawn Owens','E=mc^2'),(76,'Adam Cunningham','Lake Waynebury','Oxygen','Megan Hill','E=mc^2'),(77,'Maria Hebert','West Patriciafort','Hydrogen','Andrew Williamson','E=mc^2'),(78,'Debra Hoffman','Audreyhaven','Oxygen','Oscar Robinson','E=mc^2'),(79,'Rachel Montes','Coltonhaven','Carbon','Destiny Best','E=mc^2'),(80,'Keith Manning','Christieside','Carbon','Melissa Parker','E=mc^2'),(81,'Aaron King','Lake David','Nitrogen','Michaela Young','E=mc^2'),(82,'Mario Rose','North Jennifer','Carbon','Gloria Burnett','E=mc^2'),(83,'Julie Walton','North Anitaton','Hydrogen','Kristen Lewis','E=mc^2'),(84,'Christopher Weiss','Port Timothy','Hydrogen','Shirley Carter','E=mc^2'),(85,'Janet Hernandez','Leonville','Nitrogen','Zachary Henderson','E=mc^2'),(86,'Cole Burns','Pollardfort','Oxygen','Ricardo Campbell','E=mc^2'),(87,'Christy Martinez','Williamsmouth','Oxygen','Evelyn Franco','E=mc^2'),(88,'Brian Hunt','Gonzalezberg','Nitrogen','Steve Anderson','E=mc^2'),(89,'Matthew Davies','Whitneyton','Nitrogen','Brian Pitts','E=mc^2'),(90,'Jason Alexander','East Wendy','Carbon','Roberta Griffin','E=mc^2'),(91,'Gregory Moon','New Michael','Hydrogen','Brittney Ochoa','E=mc^2'),(92,'Diamond Villegas MD','New Robin','Nitrogen','Chloe Washington','E=mc^2'),(93,'Penny Barajas','New Christophershire','Carbon','Jenna Webb','E=mc^2'),(94,'Dawn Shields','North Steven','Oxygen','Lisa Moses','E=mc^2'),(95,'Robert Scott','Stewartton','Hydrogen','Mary Gutierrez','E=mc^2'),(96,'David Haney','Marialand','Hydrogen','Leslie Coleman','E=mc^2'),(97,'Bradley Ward','East Victorstad','Hydrogen','Angela Love','E=mc^2'),(98,'Ralph Hoffman DDS','West Robin','Carbon','Christian Jones','E=mc^2'),(99,'Kimberly Patterson','North Davidfort','Oxygen','Shannon Martinez','E=mc^2'),(100,'Jill Hernandez','West Paul','Carbon','Wendy Walker','E=mc^2');
/*!40000 ALTER TABLE `data_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22  3:28:20
