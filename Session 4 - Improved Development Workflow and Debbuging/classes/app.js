const http = require( 'http' );
const routes = require( './routes' );
const port = 3001;

const server = http.createServer( routes );

server.listen( port, console.log( `Server running and listening port ${ port }` ));