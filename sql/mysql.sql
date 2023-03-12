-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: data
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `msg` varchar(100) NOT NULL,
  `date` varchar(45) NOT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'111111','我是用来测试的数据','2022/6/6 06:06:25'),(1,'zhang','用户在这只能删除自己的留言，并不能修改他人的','2023/3/10 00:09:59'),(33,'zhangya1','我能发表么','2023/3/10 15:35:23'),(32,'123123','你猜猜我想留点什么？','2023/3/9 14:27:35'),(32,'123123','我啥也不想留','2023/3/9 14:43:25'),(32,'123123','应该完成了','2023/3/9 15:03:30');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `province` (
  `id` varchar(10) NOT NULL,
  `province` varchar(45) NOT NULL,
  PRIMARY KEY (`province`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES ('M','仙桃'),('C','十堰'),('L','咸宁'),('K','孝感'),('E','宜昌'),('A','武汉'),('N','潜江'),('D','荆州'),('H','荆门'),('F','襄樊'),('G','鄂州'),('J','黄冈'),('B','黄石');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regionarticle`
--

DROP TABLE IF EXISTS `regionarticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regionarticle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `number` int NOT NULL,
  `price` float NOT NULL,
  `region` varchar(10) NOT NULL,
  `vendor` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regionarticle`
--

LOCK TABLES `regionarticle` WRITE;
/*!40000 ALTER TABLE `regionarticle` DISABLE KEYS */;
INSERT INTO `regionarticle` VALUES (1,'口罩','N95口罩',11997,3.5,'武汉','湖北疫情有限公司'),(2,'检测试剂盒','医用试剂盒',50001,11.5,'武汉','湖北疫情有限公司'),(3,'测温仪','温度计',20003,10,'武汉','湖南疫情有限公司'),(4,'消毒用品','消毒液',97531,3.4,'武汉','湖北疫情有限公司'),(5,'口罩','普通医用外科口罩',50000,0.5,'武汉','湖南疫情有限公司'),(6,'消毒用品','84消毒液',50000,31,'孝感','湖南疫情有限公司'),(7,'检测试剂盒','抗原自测盒',70000,15,'武汉','湖南疫情有限公司'),(8,'消毒用品','84消毒水',10000,30,'孝感','河北疫情有限公司'),(10,'口罩','KN95口罩',88888,3,'孝感','湖南疫情有限公司');
/*!40000 ALTER TABLE `regionarticle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regionclass`
--

DROP TABLE IF EXISTS `regionclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regionclass` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regionclass`
--

LOCK TABLES `regionclass` WRITE;
/*!40000 ALTER TABLE `regionclass` DISABLE KEYS */;
INSERT INTO `regionclass` VALUES (1,'检测试剂盒'),(2,'测温仪'),(3,'消毒用品'),(4,'口罩');
/*!40000 ALTER TABLE `regionclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','17683784950','562179261@qq.com',1),(2,'562179','123456','17683784953','1604028168@qq.com',0),(26,'zhangyang','123456','17683784950','5621@qq.com',0),(29,'zhang123','000000','17683784950','j@qq.com',0),(32,'123123','123123','12456378910','562172@163.com',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `contactsurname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='供应商表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'湖北疫情有限公司','17683777777','张'),(2,'湖南疫情有限公司','18113066666','王'),(3,'河南疫情有限公司','13156568888','姚'),(4,'河北疫情有限公司','18994865824','陈');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-12 19:49:14
