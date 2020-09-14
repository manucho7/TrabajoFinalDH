var express = require('express');
var router = express.Router();
const { isNotAuthenticatedUser, isAuthenticatedUser } = require('../middlewares/authMiddleware');
const userController = require("../controllers/userController");
const uploadImage = require('../libs/multer');
const { check, } = require('express-validator');
router.get('/sign-up', isNotAuthenticatedUser, userController.mostrarSignUp);
router.post('/sign-up', [
    isNotAuthenticatedUser,
    check('email').isEmail().withMessage('Email invalido'),
    check('clave1').isLength({ min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres'),
    check('nombrePersona').isLength({ min:2}).withMessage('El nombre debe contener al menos 2 caracteres'),
    check('apellido').isLength({ min: 2}).withMessage('El apellido debe contener al menos 2 caracteres'),
    uploadImage.any()
], userController.agregarUsuario);
router.get('/login', userController.mostrarLogin);
router.post('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('clave1').isLength({ min: 8}).withMessage('Contrasena demasiado corta')
], userController.login);
router.get('/logout', userController.logout);
router.get('/edit', isAuthenticatedUser, userController.mostrarEditarPerfil);
router.post('/edit', uploadImage.any() ,userController.editarPerfil);
module.exports = router;