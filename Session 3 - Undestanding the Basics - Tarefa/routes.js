const fileSystem = require( 'fs' );
/**ONDE ME PERDI?
 * 1- na hora de setar os parametros do button - type= submit
 */
const handler = ( req, res ) => {
    const { url, method } = req;

    if( url === '/' ){
        res.setHeader( 'Content-Type', 'text/html' );
        res.write( '<h1>Welcome! </h1>' );
        res.write( '<span>Tell me your name: </span>')
        res.write( '<form action="/create-user" method="POST">' );
        res.write( '<input type="text" name="user"><button type="submit">Send</button>')
        res.write( '</form>');
        return res.end();
    }

    if( url === '/users' ){
        res.setHeader( 'Content-Type', 'text/html' );
        res.write( '<h1> Users List </h1>' );
        res.write( '<ul>' );
        for( let i = 1; i < 8; i++ ){
            res.write( `<li>User number ${ i }.</li>` );
        }
        res.write( '</ul>' );
        return res.end();
    }

    if( url === "/create-user" ){
        const data = []
        req.on( 'data', chunck => {
           data.push( chunck ); 
        });
        return req.on( 'end', () => {
            const parsedBody = Buffer.concat( data ).toString();
            const user = parsedBody.split( '=' )[1];
            console.log( user );            
            
            fileSystem.writeFile( './userList.txt', user, err => {
                if( !err ){
                    res.statusCode = 303;
                    res.setHeader( 'Location', '/users' );
                    return res.end();
                }
            })
        })
    }
}

module.exports = handler;