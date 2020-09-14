const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const {isAuthenticatedUser} = require('../middlewares/authMiddleware');
const uploadImage = require('../libs/multer');
const { check } = require('express-validator');

router.get('/', productController.mostrarListaProductos);
router.get('/create', [
    isAuthenticatedUser
], productController.mostrarNuevoProducto);
router.get('/:title', productController.mostrarDescripcionDelProducto);
router.post('/', [
    isAuthenticatedUser, 
    check('title').isLength({ min: 5}).withMessage('El nombre debera contener al menos 5 caracteres'),
    check('productDescription').isLength({ min: 20}).withMessage('La descripcion debera contener al menos 20 caracteres'),
    uploadImage.any()], productController.agregarProducto);
router.get('/:title/edit', isAuthenticatedUser, productController.mostrarEdicionProducto);
router.post('/:title', [
    isAuthenticatedUser,
    check('titleShow').isLength({ min: 5}).withMessage('El nombre debera contener al menos 5 caracteres'),
    check('productDescription').isLength({ min: 20}).withMessage('La descripcion debera contener al menos 20 caracteres'),
    uploadImage.any()
], productController.confirmarEdicionProducto);
router.delete('/:title', isAuthenticatedUser, productController.eliminarProducto)

module.exports = router;