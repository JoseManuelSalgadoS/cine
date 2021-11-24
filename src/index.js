const express = require('express');
const morgan = require ('morgan');

//Inicializar 
const app = express();

//Configuracon el puerto para usar
app.set('port', process.env.PORT || 4000);

//Configuracion Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Donde se encuentran las rutas
app.use(require('./routes/index.js'));
app.use('/pelicula', require('./routes/pelicula.js'));
app.use('/categoria', require('./routes/categoria.js'));

//Ejecutar servidor
app.listen(app.get('port'), () =>{
    console.log("Server on port", app.get('port'));
});