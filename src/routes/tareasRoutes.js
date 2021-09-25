// Cargamos el modulo express
const express = require('express');
const TareasRouter = express.Router();

// Cargamos el controlador del usuario
const TareasController = require('../app/api/controllers/tareasController');
// Especificamos nuestras rutas teniendo en cuenta los metodos creados en nuestro controlador, y especificando que seran rutas que usaran el metodo POST

TareasRouter.post('/AgregarTarea', TareasController.createTarea);
TareasRouter.get('/ListadoTareas',TareasController.ObtenerTareas);
TareasRouter.put('/ResolverTarea',TareasController.resolverTarea);
TareasRouter.delete('/EliminarTarea',TareasController.eliminarTarea);


module.exports = TareasRouter;