const fs = require( 'fs' );

const requestHandler = ( req, res ) => {
    const { url, method } = req;
    res.setHeader( 'Content-Type', 'text/html')
        if( url === '/'){
            res.write( `<html>` );
            res.write( `<head>` );
            res.write( `<title>My first Node Page</title>` );
            res.write( `<style>
                body{
                    background: #1C1C1C;
                    color: #F2F2F2;
                    font-family: sans-serif;
                }
            </style>` );
            res.write( `</head>` );
            res.write( `<body>` );
            res.write( `<h1>Hello from a Node server!</h1>`)
            res.write( `<p>url: ${ url }</p><p>method: ${ method }</p>` );
            res.write( `<form action="/message" method="POST">` );
            res.write( `<input type="text" name="message"><button type="submit">Send</button>`)
            res.write( `</form>` );
            res.write( `</body>` );
            res.write( `</html>`);
            return res.end();
        }
    
        if( url === '/message' && method === 'POST'){
            const body = [];
    
            req.on( 'data', chunk => {
                body.push( chunk );
            });
            return req.on( 'end', ()=>{
                const parsedBody = Buffer.concat( body ).toString();
                const message = parsedBody.split('=')[1];
    
                fs.writeFile('./myfile.txt', message, err => {
                    if( !err ){
                        res.statusCode = 303;
                        res.setHeader( 'Location', '/')
                        return res.end();
                    }
                });            
            })
        }
        res.end();
}

module.exports = requestHandler;
