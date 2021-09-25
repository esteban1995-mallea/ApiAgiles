import "dotenv/config";

require("../../config/database/database.js"); //Importando la configuracion de conexion a la BD
const LoginRoutes = require("../../routes/login.js"); 
const UsuarioRouter = require("../../routes/usuarioRoutes.js"); 
const validateUser = require('../../config/middlewares/Middleware_Login.js');
const TareasRouter = require('../../routes/tareasRoutes');


const express = require('express');
const logger = require('morgan');


const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');



const app = express();


app.set(process.env.KEY, process.env.SECRET_KEY); // Clave Secreta para token




//Coneccion redis (sacarla deaqui)


const RedisStore = connectRedis(session)//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public',LoginRoutes);
app.use('/private',validateUser,UsuarioRouter)
app.use('/private/tareas',validateUser,TareasRouter)









/////////////////////



// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function(req, res, next) {
    let err = new Error("Ruta no encontrada");
    err.status = 404;
    next(err);
  });
  
  // Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
  app.use(function(err, req, res, next) {
    console.log(err);
  
    if (err.status === 404) res.status(404).json({message: "Ruta no encontrada"});
    else res.status(500).json({message: "Error interno en el servidor!!"});
  });
  



module.exports = app;






