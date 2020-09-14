const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const {isAuthenticatedUser} = require('../middlewares/authMiddleware');

router.get('/', isAuthenticatedUser, cartController.mostrarCart);
router.post('/', isAuthenticatedUser, cartController.agregarCart);
router.put('/edit', isAuthenticatedUser, cartController.editCart);
router.delete('/clean', isAuthenticatedUser, cartController.cleanCart);

module.exports = router;