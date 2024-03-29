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
-- Table structure for table `new_pd`
--

DROP TABLE IF EXISTS `new_pd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_pd` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_pd`
--

LOCK TABLES `new_pd` WRITE;
/*!40000 ALTER TABLE `new_pd` DISABLE KEYS */;
INSERT INTO `new_pd` VALUES (1,'Language','Or',454.28,22),(2,'Deep','After',200.15,36),(3,'Keep','Old',624.41,83),(4,'Though','Street',869.58,32),(5,'Result','Task',832.85,33),(6,'Water','South',431.11,68),(7,'Know','Along',425.12,70),(8,'Least','Spring',455.64,10),(9,'Shake','Maybe',266.71,23),(10,'Finally','Blood',828.96,74),(11,'Phone','Machine',34.07,79),(12,'Operation','Lead',660.60,81),(13,'Hair','Keep',200.06,7),(14,'Allow','Change',343.61,80),(15,'Thought','Expert',155.89,44),(16,'Recent','Run',857.29,62),(17,'Operation','See',115.42,60),(18,'Man','Standard',987.31,25),(19,'Two','Remember',678.09,78),(20,'Wonder','Network',899.53,68),(21,'Sometimes','Early',792.29,48),(22,'Realize','Walk',906.99,72),(23,'Use','Reality',588.39,19),(24,'Far','Three',771.33,17),(25,'Management','Statement',599.95,13),(26,'Common','Fly',728.82,61),(27,'Hundred','Office',652.62,38),(28,'Decision','Somebody',347.48,61),(29,'Choice','Cup',200.22,49),(30,'Old','Deal',251.39,77),(31,'Machine','Southern',158.06,82),(32,'Why','Bar',320.78,32),(33,'Reach','Listen',847.21,53),(34,'Why','Serve',116.81,3),(35,'Reveal','Alone',18.16,28),(36,'Stuff','Debate',312.18,26),(37,'Store','Fly',741.16,81),(38,'Lot','Play',988.86,64),(39,'Suddenly','Firm',865.94,71),(40,'Thank','Might',583.99,23),(41,'Everyone','Money',764.11,14),(42,'Like','American',725.28,60),(43,'Reduce','There',528.36,3),(44,'Agreement','Owner',859.65,53),(45,'Sport','Behind',966.62,28),(46,'Majority','Difficult',481.00,71),(47,'Way','May',186.53,34),(48,'Church','Box',297.90,39),(49,'Improve','Experience',33.32,17),(50,'Study','Decide',248.39,85),(51,'Painting','Live',547.05,1),(52,'Training','Run',768.89,12),(53,'Even','Open',229.14,94),(54,'Suffer','Politics',762.59,24),(55,'Television','Forward',526.38,37),(56,'Everybody','Grow',380.19,2),(57,'Executive','Discussion',739.15,60),(58,'Guess','Mr',998.33,66),(59,'Number','At',861.10,93),(60,'Guy','Mention',438.42,15),(61,'Represent','Cold',44.70,8),(62,'Degree','Design',788.84,93),(63,'Cell','Produce',218.53,42),(64,'Civil','Face',471.11,87),(65,'There','Organization',876.76,28),(66,'Center','Wind',413.62,73),(67,'Final','Before',245.82,47),(68,'Always','Support',966.49,4),(69,'Stuff','Few',83.74,54),(70,'Social','Decade',107.13,43),(71,'Bank','Majority',816.53,15),(72,'Seek','Meet',807.95,47),(73,'Campaign','Represent',573.00,97),(74,'Type','House',550.16,37),(75,'Fine','Recognize',333.78,20),(76,'Successful','Court',783.73,32),(77,'New','Reason',238.81,77),(78,'Sea','Factor',475.41,39),(79,'Despite','Today',802.39,97),(80,'Great','Stay',456.26,66),(81,'More','Song',55.59,47),(82,'Deal','Maintain',540.57,80),(83,'Wind','Offer',348.50,43),(84,'Mean','Partner',539.70,96),(85,'Sell','Box',545.47,20),(86,'Trip','Anything',660.74,68),(87,'Democratic','Travel',752.25,68),(88,'Occur','Sign',405.09,56),(89,'Style','Able',880.23,50),(90,'Less','Arrive',256.29,33),(91,'Factor','Center',59.57,22),(92,'Six','Strong',335.86,20),(93,'From','Face',129.83,76),(94,'Response','Book',996.77,89),(95,'Western','Form',635.33,79),(96,'Red','Son',246.20,80),(97,'Increase','Enough',184.03,86),(98,'Her','City',827.34,26),(99,'Live','Down',293.72,84),(100,'Beautiful','Director',488.59,79),(101,'Fund','Statement',491.37,9),(102,'Society','West',704.35,45),(103,'Seem','Both',592.43,37),(104,'Better','Fight',472.74,96),(105,'Night','Add',632.21,70),(106,'Sound','Would',376.91,9),(107,'Congress','Anyone',811.94,21),(108,'Measure','Black',540.23,88),(109,'Threat','Also',918.60,63),(110,'Film','Class',776.74,80),(111,'Best','Sport',917.19,44),(112,'Continue','Four',477.14,34),(113,'Keep','Sing',484.33,74),(114,'Throw','Future',102.08,30),(115,'None','Him',539.57,56),(116,'Blood','Back',647.37,89),(117,'Skill','According',156.26,34),(118,'Research','Quite',164.61,14),(119,'Sport','Offer',971.01,94),(120,'Sell','Other',552.86,85),(121,'Ahead','Religious',550.88,26),(122,'Free','Voice',943.52,1),(123,'Green','Day',292.57,64),(124,'Movement','Challenge',678.57,19),(125,'But','Food',545.90,56),(126,'Write','Seek',545.32,18),(127,'It','World',719.86,73),(128,'Decide','Final',357.87,84),(129,'Remain','Which',853.55,45),(130,'Significant','Us',586.89,94),(131,'Leader','Move',177.47,58),(132,'Project','Both',360.03,10),(133,'All','Room',10.40,100),(134,'First','Smile',395.47,9),(135,'Shoulder','Role',488.08,61),(136,'Agree','Toward',812.83,29),(137,'Worker','Major',980.61,98),(138,'Mind','Theory',637.68,58),(139,'Represent','Degree',587.66,82),(140,'Series','Just',805.98,0),(141,'Speech','Material',517.82,69),(142,'Local','Along',340.40,31),(143,'Remain','Human',669.77,59),(144,'Clearly','Give',417.04,8),(145,'North','How',387.21,25),(146,'State','Drive',734.21,49),(147,'If','Throughout',435.54,75),(148,'Stop','Author',610.36,91),(149,'Mind','First',810.71,81),(150,'Reach','Purpose',980.20,69),(151,'However','Answer',25.11,96),(152,'Material','Republican',795.85,4),(153,'Yes','Billion',751.91,58),(154,'Thank','Red',751.08,72),(155,'Hold','Law',533.33,9),(156,'Much','Whole',429.48,12),(157,'Thing','Fear',286.95,61),(158,'Cause','Look',177.19,73),(159,'Yes','They',545.61,3),(160,'If','Not',466.07,41),(161,'Compare','Assume',212.27,93),(162,'Attorney','Car',671.21,36),(163,'Nearly','Full',433.29,51),(164,'New','Fine',836.12,88),(165,'Person','Friend',286.95,50),(166,'Reveal','Many',417.75,23),(167,'Where','First',52.63,23),(168,'Who','Mean',660.80,50),(169,'Property','Site',19.86,95),(170,'Each','This',454.32,96),(171,'Light','Large',680.84,81),(172,'Structure','Travel',667.92,39),(173,'Simple','Turn',248.54,13),(174,'Somebody','Away',943.92,93),(175,'Claim','Test',670.61,26),(176,'Sign','Hundred',429.64,64),(177,'Would','Ago',969.13,67),(178,'Full','Reach',499.51,24),(179,'Media','Such',210.49,60),(180,'Seat','Draw',779.42,61),(181,'Against','Condition',230.41,29),(182,'Commercial','Consider',355.66,32),(183,'Gun','Can',750.50,69),(184,'Provide','Until',339.11,75),(185,'Hard','Player',812.88,52),(186,'Gun','Month',396.39,76),(187,'Act','Behavior',659.65,4),(188,'Phone','Clear',892.69,99),(189,'Forward','Might',942.55,1),(190,'Specific','Walk',410.64,25),(191,'Pattern','Sport',276.59,3),(192,'Evidence','Will',79.24,50),(193,'Suggest','Operation',320.39,30),(194,'Whom','Remain',877.31,39),(195,'Make','Sell',313.26,97),(196,'Expect','My',345.24,35),(197,'Job','Ok',131.94,8),(198,'No','Evening',649.06,78),(199,'Chair','Look',995.12,18),(200,'Model','Blue',128.24,32);
/*!40000 ALTER TABLE `new_pd` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22  3:28:19
