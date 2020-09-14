CREATE DATABASE  IF NOT EXISTS `nuevo-db-ti-2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nuevo-db-ti-2`;

--
-- Table structure for table `caracteristicas`
--
DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `clave1` varchar(240) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `image` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`email`)
);

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `title` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`title`)
);

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `idcarrito` int NOT NULL AUTO_INCREMENT,
  `usuarios_email` varchar(45) NOT NULL,
  PRIMARY KEY (`idcarrito`),
  KEY `fk_carritos_usuarios1_idx` (`usuarios_email`),
  CONSTRAINT `usuarios_email` FOREIGN KEY (`usuarios_email`) REFERENCES `usuarios` (`email`)
);

DROP TABLE IF EXISTS `carrito_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_producto` (
  `idcarrito_producto` int NOT NULL AUTO_INCREMENT,
  `carrito_id` int NOT NULL,
  `producto_title` varchar(45) NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idcarrito_producto`),
  KEY `carrito_id_idx` (`carrito_id`),
  KEY `producto_title_idx` (`producto_title`),
  CONSTRAINT `carrito_id` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`idcarrito`),
  CONSTRAINT `producto_title2` FOREIGN KEY (`producto_title`) REFERENCES `productos` (`title`)
);

DROP TABLE IF EXISTS `caracteristicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caracteristicas` (
  `idcaracteristicas` int NOT NULL AUTO_INCREMENT,
  `productGender` varchar(45) DEFAULT NULL,
  `height` int DEFAULT NULL,
  `divisiones` varchar(5) DEFAULT NULL,
  `proteccionRFID` varchar(5) DEFAULT NULL,
  `garantia` varchar(4) DEFAULT NULL,
  `material` varchar(45) DEFAULT NULL,
  `width` int DEFAULT NULL,
  `deep` int DEFAULT NULL,
  `money` varchar(5) DEFAULT NULL,
  `producto_title` varchar(45) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  PRIMARY KEY (`idcaracteristicas`),
  KEY `Productos_title_idx` (`producto_title`),
  CONSTRAINT `producto_title` FOREIGN KEY (`producto_title`) REFERENCES `productos` (`title`)
);


