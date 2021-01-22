/**
 * Onde eu me compliquei
 * 1 - setando o caminho que servira recursos estáticos
 * R -
 */

//Importing Core Modules
const path = require( 'path' );

//Importing NPM Modules
const express = require( 'express' );
const handlebars = require( 'express-handlebars' );

//Importing local modules and variables
const root_path = require( './util/root_path' );
const { products } = require( './routes/routes' );

//variables declaration
const PORT = process.env.PORT || 3001;
const app = express();

//Setting up middlewares
app.use( express.urlencoded({ extended: false }));
app.use( express.static( path.join( root_path, 'public' )))

//Setting up the Template engine
//>>EJS
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views/ejs');

//>>Handlebars
// app.engine( 'hbs', handlebars({
//     defaultLayout: path.join( root_path, 'views', 'handlebars', 'layouts', 'main-layout'),
//     extname: 'hbs'    
// }));
// app.set( 'view engine', 'hbs' );
// app.set( 'views', path.join( root_path, 'views/handlebars' ));

//>>PUG
//app.set( 'view engine', 'pug' );
//app.set( 'views', path.join( root_path, 'views' ));


/**OBS - Pq a diferença na hora de configurar pug e handlebars?
 * Mecanismos de modelo compatíveis com o Express como o Pug exportam uma função chamada
 * __express(filePath, options, callback), que é chamada pela função res.render() para renderizar
 * o código de modelo. Alguns mecanismos de modelo não seguem esta convenção.
 * A biblioteca Consolidate.js segue esta convenção mapeando todos os mecanismos
 * de modelo populares do Node.js, e portanto funciona de forma harmoniosa com o Express. *
 */

//Importing the Routes
const { router: routes } = require( './routes/routes' );

//using the routes
app.use( routes );

//default Route>>404 Not Found
app.use(( req, res, next )=>{
    res.status( 404 ).render( '404', {
        pageTitle: '404 - Page not Found',
        path: req.url
    });
    console.log( req.url );
});

//Run server
app.listen( PORT, console.log( `Server Running at port ${ PORT }`));