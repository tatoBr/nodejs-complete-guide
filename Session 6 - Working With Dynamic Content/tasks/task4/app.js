//importing Core Modules
const path = require( 'path' );

//importing NPM Modules
const express = require( 'express' );

//importing project modules
const rootpath = require( path.join( __dirname, 'util', 'root_path' ));

//Setting app variables
const PORT = process.env.PORT | 3001;

//creating an app instance
const app = express()

//setting up middlewares
app.use( express.urlencoded({ extended: false }));
app.use( express.static( path.join( rootpath, 'public' )));

//setting up the Template Engine
app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( rootpath, 'views' ));

//Importing Routes
const routes = require( './routes/routes' );

//Setting up Routes
app.use( routes );

//default route >>> 404
app.use(( req, res )=>{
    res.status( 404 ).render( '404', {
        pageTitle: '404 | Page Not Found',
        url: req.url
    });
});

//start server
app.listen( PORT, console.log( `Server listening on PORT ${ PORT }`));