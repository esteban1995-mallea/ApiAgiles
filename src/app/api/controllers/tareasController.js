// Cargamos el modelo recien creado
const tareasModel = require('../models/tareasModel.js');
// Cargamos el módulo de bcrypt
const bcrypt = require('bcrypt');
// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');
const { resolveObjectURL } = require('buffer');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {


  createTarea: async function (req, res) {


    const { estado } = req.body;

    if (estado == "No Resuelto" || estado == "Resuelto") {

      await tareasModel.create(req.body, async function (err, result) {
        if (err)
          res.json({
            success: false,
            message: err
          });
        else
          res.json({
            success: true,
            message: "tarea agregado exitosamente!!!"
          });

      });

    } else {
      res.json({
        succes: false,
        message: "Estado ingresado no es valido"
      })
    }
  },

  ObtenerTareas: async function (req, res,) {

    await tareasModel.find({}, function(err, tareasInfo){
      if (err) {
        res.json({success:false, message: err});
      } else {
        tareasInfo=tareasInfo.filter(({userId}=tareasInfo)=> userId==req.body.userId);
        res.json({success:true, message: "Tareas de usuario obtenidas", data:tareasInfo});
      }
    });
  },

  resolverTarea: async function (req, res) {


    await tareasModel.findOneAndUpdate(req.body.idTarea,{estado: "Resuelto"}, function(err, result){

      if(err){
        res.json({success:false, message:err})
      }
      else{
          res.json({success:true, message: "Tareas resuelta",data:result})
      }
    })

  },

  eliminarTarea: async function (req, res) {



    await tareasModel.remove({_id:req.body.idTarea}, function(err){

      if(err){
        res.json({success:false, message:err})
      }
      else{
          res.json({success:true, message: "Tarea eliminada"})
      }
    })

  },

}