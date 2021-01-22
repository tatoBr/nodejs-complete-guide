const express = require( 'express' );

const options = {
    host: 'myexpresspage',
    port: 3030,
    path: '/'
  }
const hostname = '127.0.0.1'
const port = 3000

const app = express();
app.use(( req, res, next )=>{
    console.log( "hello from the first middleware." );
    next();
})

app.use(( req, res, next )=>{
    console.log( "hello from the second middleware")
    next();
})

app.use( '/users', ( req, res )=>{
    res.send( '<h1>Users Page</h1>' );
});

app.use( '/', ( req, res ) => {
    res.send( '<h1>Main Page</h1>' )
});

app.listen( port, console.log( `Server listening on port ${ port }`));