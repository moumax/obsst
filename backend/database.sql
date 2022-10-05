-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: obsst
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cameras`
--

DROP TABLE IF EXISTS `cameras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cameras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marque` varchar(100) NOT NULL,
  `modele` varchar(100) NOT NULL,
  `capteur` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `largeurMM` float NOT NULL,
  `hauteurMM` float NOT NULL,
  `largeurPix` int NOT NULL,
  `hauteurPix` int NOT NULL,
  `photosites` float NOT NULL,
  `megapixels` float NOT NULL,
  `cadence` int DEFAULT NULL,
  `dynamique` int DEFAULT NULL,
  `bits` varchar(100) DEFAULT NULL,
  `bruit-lecture` varchar(100) DEFAULT NULL,
  `courant-obscurite` varchar(100) DEFAULT NULL,
  `temps-lecture` varchar(100) DEFAULT NULL,
  `capacite-pixel` int DEFAULT NULL,
  `refroidissement` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cameras`
--

LOCK TABLES `cameras` WRITE;
/*!40000 ALTER TABLE `cameras` DISABLE KEYS */;
INSERT INTO `cameras` VALUES (1,'Canon','EOS 7D','','CMOS',22.2,14.8,5184,3456,4.3,17.9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Zwo','ASI 2600 MM PRO','Sony IMX 571','CMOS',23.49,15.7,6248,4176,3.76,26.1,4,80,'16','1.0 e- - 3.3 e-',NULL,NULL,50000,35),(3,'Atik','383L+','Kodak KAF-8300','CCD',17.96,13.52,3326,2504,5.4,8.3,NULL,NULL,'16','7 e- rms',NULL,NULL,NULL,40);
/*!40000 ALTER TABLE `cameras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `site` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `events_UN` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (6,'Fête de la sciencessss','Cett année, la fête de la science aura lieu à l\'université d\'Orléans. Nous vous proposerons des observations du soleil, si la météo le permet. Vous pourrez bien entendu vous renseigner sur nos activités sur notre stand !','2048-11-06','Paris2'),(16,'Conseil administration','C\'est notre conseil','2039-09-09','dsgfdsfsdfsdf'),(18,'Nuit des étoiles','skdjhfdsjfojosdjfojsodjfojsdfojsfjods','2023-09-08','Observatoire'),(22,'Assemblée générale','C\'est notre assemblée générale','2023-01-23','Observatoire');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tubes`
--

DROP TABLE IF EXISTS `tubes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tubes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marque` varchar(100) NOT NULL,
  `modele` varchar(100) NOT NULL,
  `diametre` int NOT NULL,
  `focale` int NOT NULL,
  `rapportFD` float NOT NULL,
  `R` float NOT NULL,
  `tarif` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tubes`
--

LOCK TABLES `tubes` WRITE;
/*!40000 ALTER TABLE `tubes` DISABLE KEYS */;
INSERT INTO `tubes` VALUES (1,'Astro System Austria','8N-OK3',200,720,3.6,0.69,NULL),(2,'Askar','80PHQ 80-600 F7.5 4-element flatfield',80,600,7.5,1.73,NULL),(3,'Sky Watcher','Esprit 120-ED',120,840,7,1.15,NULL);
/*!40000 ALTER TABLE `tubes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$wCDyXtNfNtLzqfoHFX58Vw$dCvQLFdjlEpBUOiJaSMformrScC+a9KEctgbUEIgKug');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-05 19:23:53
