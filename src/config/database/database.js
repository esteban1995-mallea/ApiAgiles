//Cargando el modulo de mongoose
const mongoose = require("mongoose");
//Configurando la conexion para MongoDB, Debemos indicar el puerto y la IP de nuestra BD

const uri = "ingresar ui de mongo aqui conexxion a bd agile";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});

mongoose.connection.on("connected",async function() {
  console.log("Conectado con Mongo");
});

// When`mongoose.connect()` 

// If the connection throws an error
mongoose.connection.on("error", async function(err) {
  console.log("Error Mongo:" + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected",async function() {
  console.log("Mongo desconectado");
});

//solucionar problema de libreria
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
module.exports = mongoose;
