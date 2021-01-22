const http = require( 'http' );
const routes = require( './routes' );

/**
 * Pontos que me perdi
 * 1 - montando o form, esqueci alguns atributos
 * 2 - na hora de reencaminhar a pagina na resposta setHEader( 'Location', 'url' );
 * 3 - res.statusCode não é um função.
 * 4 - usando Buffer para concatenar o body da requisição; Buffe.concat( array )
 */
const server = http.createServer( routes );

server.listen( 8888 );

