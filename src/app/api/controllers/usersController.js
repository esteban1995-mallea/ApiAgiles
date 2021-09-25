// Cargamos el modelo recien creado
const userModel = require('../models/usersModel.js');
// Cargamos el módulo de bcrypt
const bcrypt = require('bcrypt'); 
// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {
 create: async function(req, res, next) {
  


  userModel.create(req.body , async function (err, result) {
      if (err) 
       next(err);
      else
       res.json({success: true, message: "Usuario agregado exitosamente!!!"});
      
    });
 },





 DatosEnSession: async function(req, res, next) {
  const sess = req.session;
  console.log(req.body)

  if(sess.username && sess.password && sess.nombre){
      const Usuario={
        username:sess.username,
        password:sess.password,
        nombre:sess.nombre,
        id:req.body.userId
      }
      res.json({success:true,data:Usuario})
  }else{
    res.json({success: false, message: "No hay sesion iniciada"});
  }
 },


  authenticate: function(req, res, next) {
    userModel.findOne({username:req.body.username}, function(err, userInfo){
      if (err) {
        next(err);
      } else {
        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
          console.log()
          req.session.username = req.body.username
          req.session.password = req.body.password
          req.session.nombre = userInfo.nombre

          const token = jwt.sign({id: userInfo._id}, req.app.get(process.env.KEY), { expiresIn: '1h' });

          res.json({success:true, message: "El usuario ha sido autenticado", token:token});
        }else{
          res.json({success:false, message: "Error username/password invalido."});
        }
      }
      });
  },



}