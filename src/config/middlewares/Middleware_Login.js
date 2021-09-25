var jwt = require("jsonwebtoken");

// Para acceder a las rutas de privadas hemos definido middleware para validar al usuario.
//middleware
async function validateUser(req, res, next) {
    jwt.verify(req.headers.authorization, req.app.get(process.env.KEY), function(
      err,
      decoded
    ) {
      if (err) {
        res.json({status: "error", message: err.message });
      } else {
        // anadir el id de usuario al request
        req.body.userId = decoded.id;
        next();
      }
    });
  }


  
module.exports = validateUser;






