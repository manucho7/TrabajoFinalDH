const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const cartRouter = require('./carts');
const productsRouter = require('./products');
const userRouter = require('./users')
const apiRouter=require('./apiRouter')
const dashboardRouter = require('./dashboardRouter');

// Carts
router.use('/cart', cartRouter);
// Products
router.use('/products', productsRouter);
// Home
router.get('/', productController.mostrarCategoriaProductos);
// Users
router.use('/users', userRouter);
//APIs
router.use('/api', apiRouter);
// Dashboard
router.use('/dashboard', dashboardRouter);

module.exports = router;