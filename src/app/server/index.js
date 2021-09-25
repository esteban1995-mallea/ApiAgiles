const app = require('./server.js');

app.listen(process.env.PORT, function(){ console.log('El servidor arrancado en: http://localhost:3000');});