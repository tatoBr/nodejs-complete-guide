/**
 * Onde me atrapalhei?
 * 1-Setando Handlebars, Esqueci quais os parametros do metodo app.engine()
 * R - são 2 parametros. Uma string com o nome da engine, e a engine a ser usada. 
 */

//importing core modules
const path = require( 'path' );

//importing npm modules
const express = require( 'express' );
const handlebars = require( 'express-handlebars' );

//importing local modules
const rootPath = require( path.join( __dirname, 'util', 'root-path' ));

//setting up variables
const PORT = process.env.PORT || 8888;

//instantiate app
const app = express();

//setting up middlewares
app.use( express.urlencoded({ extended: false }));
app.use( express.static( path.join( rootPath, 'public' )));

//Template Engines
//>>>EJS
app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( rootPath, 'views', 'ejs' ));

//>>>PUG
// app.set( 'view engine', 'pug' );
// app.set( 'views', path.join( rootPath, 'views', 'pug' ));

//>>>Handlebars
// app.engine( 'hbs', handlebars({    
//     extname: 'hbs',
//     defaultLayout: 'main-layout'
// }));
// app.set( 'view engine', 'hbs' );
// app.set( 'views', path.join( rootPath, 'views', 'handlebars' ));


//importing Routes
const { routes } = require( path.join( rootPath, 'routes', 'router' ));

//setting up routes
app.use( routes );

//setting up default routes
app.use(( req, res, next )=>{
    res.status( 404 ).render( '404', {
        pageTitle: '404 - Page Not Found.',
        url: req.url
    });
})

//run server
app.listen( PORT, console.log( `Server listening on port ${ PORT }.` ));