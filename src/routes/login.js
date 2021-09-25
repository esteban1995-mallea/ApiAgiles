// Cargamos el modulo express
const express = require('express');
const LoginRouter = express.Router();
// Cargamos el controlador del usuario
const userController = require('../app/api/controllers/usersController');
// Especificamos nuestras rutas teniendo en cuenta los metodos creados en nuestro controlador, y especificando que seran rutas que usaran el metodo POST
//LoginRouter.post('/registrar', userController.create);
LoginRouter.post('/auth', userController.authenticate);
LoginRouter.post('/registrar', userController.create);




module.exports = LoginRouter;