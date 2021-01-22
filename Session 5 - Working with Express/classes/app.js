const path = require( 'path' );
const express = require( 'express' );

const rootDir = require( './util/root_path' );

const admProductsRouter = require( './routes/admin/products-router' );
const userProductsRouter = require( './routes/users/products-router' );

const port = 3000;

/**
 * Onde eu travei?
 * 1 - lembrando os parametros necessários da tag form
 * R: action e method
 */
const app = express();

app.use( express.json());
app.use( express.urlencoded({ extended: true }));

app.use( express.static( path.join( __dirname, 'public' )));
console.log( path.join( __dirname, 'public' ));
//Routes
app.use('/admin', admProductsRouter );
app.use( userProductsRouter );

//NOT FOUND ROUTE
app.use(( req, res, next ) =>{
    res.status(404).sendFile( path.join( rootDir, 'views', 'not-found.html' ));
})

app.listen( port, console.log( `Server listening port ${ port }` ));