var express = require('express');
var router = express.Router();
const apiUserController=require('../controllers/apiUserController')
const apiProductController=require('../controllers/apiProductController');

router.get('/users', apiUserController.users);

router.get('/users/:id', apiUserController.user);

router.get('/products', apiProductController.products);

router.get('/products/:id', apiProductController.product);

module.exports=router;
