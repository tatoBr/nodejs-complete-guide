/**Onde travei?
 * 1 - Esqueci quais middlewares preciso configurar na aplicação
 * R - setar o diretório publico com express.static()
 * 
 * 2 - Setando o layout padrão nas opções do handlebars
 * R - basta passar uma string com o caminho  para o arquivo de layout
 */

//importing Core Modules
const path = require( 'path' );

//importing NPM modules
const express = require( 'express' );
const handlebars = require( 'express-handlebars' );

//Importing Local modules
const rootPath = require( path.join( __dirname, 'util', 'root_dir' ))

//declaring project global variables
const PORT = process.env.PORT || 3001;

//creating an express application
const app = express()

//setting up middlewares
app.use( express.urlencoded({ extended: false }));//parser
app.use( express.static( path.join( rootPath, 'public' )));//static folder

//setting up the template engine
//>>PUG
// app.set( 'view engine', 'pug' );
// app.set( 'views', path.join( rootPath, 'views', 'pug' ));

//>>handlebars
app.engine( 'hbs', handlebars({
    defaultLayout: path.join( rootPath, 'views', 'hbs', 'layouts', 'main-layout' ),
    extname: 'hbs'
}));
app.set( 'view engine', 'hbs' );
app.set( 'views', path.join( rootPath, 'views', 'hbs' ));

//>EJS
// app.set( 'view engine', 'ejs' );
// app.set( 'views', path.join( rootPath, 'views', 'ejs' ));

//importing Routes
const productRoutes = require( './routes/products' );

//using the routes
app.use( productRoutes );

//default route/404
app.use(( req, res )=>{
    res.status( 404 ).render( '404', {
        pageTitle: 'MyShop - 404 | Page Not Found',
        url: req.url,
        page404: true
    });
});

//start the server
app.listen( PORT, console.log( `Server is running and listening for connections on PORT ${ PORT }.` )); 
