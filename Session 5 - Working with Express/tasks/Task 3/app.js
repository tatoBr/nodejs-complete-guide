/**
 * Tarefa 3
 * a) - Criar um novo projeto e instalar o express - OK
 * b) - Criar um app express que serve 2 arquivos html nas rotas '/' e '/users' - OK
 * c) - Adicionar algum arquivo estático no projeto que sera requerido por ao menos um arquivo html - OK
*/

 //import Core Modules
const path = require( 'path' );

//import Npm Modules
const express = require( 'express' );

//import local Modules
const root_dir = require( './util/root_dir' );

//Variable declarations
const PORT = process.env.PORT || 3001;

//instantiate app
const app = express();

//setting up middlewares
app.use( express.static( path.join( root_dir, 'public' )));
app.use( express.urlencoded({ extended: false }));

//import routes
const routes = require( './routers/routes' );

//seting routes
app.use( routes );

//Default Route>>./Not Found
app.use( (req, res, next )=>{
    res.status( 404 ).sendFile( path.join( root_dir, 'views', '404.html' ));
})

app.listen( PORT, console.log( `Server running on ${ PORT }` ));