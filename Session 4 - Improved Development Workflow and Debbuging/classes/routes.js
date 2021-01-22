const fileSystem = require( 'fs' );

/**
 * Onde me perdi:
 * 1 - redirecionando a rota com res.setHeader( 'Location', 'route' );
 * R: res.statusCode = 3** é necessário
 * 
 */
 
const routesHandler = ( req, res ) => {
    const { url, method } = req;

    if( url == '/'){
        res.setHeader( 'Content-Type', 'text/html' );
        res.write( '<html>' );
        res.write( '<head>' );
        res.write( '<title>Udemy - NodeJS The Complete Guide</title>' );
        res.write( `<style>
            body{
                background: #3E3E8E;
                color: #FCFCFC;
                font-family: sans-serif;
            }
        </style>` );
        res.write( '</head>' );
        res.write( '<body>' );
        res.write( '<h1>Welcome!</h1>' );
        res.write( '<h2>Session 3 - Improved Development Workflow and Debbuging</h2>' );
        res.write( '<p>Please tell me more about yourself:</p>' );
        res.write( '<form action="/save-user" method="POST">' );
        res.write( '<div><label for="fullname">name:</label><Input type="text" name="fullname"></div>' );
        res.write( '<div><label for="birthdate">Birthdate:</label><Input type="date" name="birthdate"></div>' );
        res.write( '<button type="Submit">Send</button>' );
        res.write( '</form>' );
        res.write( '</body>' );
        res.write( '</html>' );
        return res.end();
    }

    if( url == '/save-user'){
        //retrieve req data
        const rawData = [];
        req.on( 'data', chunk =>{
            rawData.push( chunk );
        });
        
        return req.on( 'end', ()=>{
            console.log( 'entered req.on("end")' );
            const parsedData = Buffer.concat( rawData ).toString();
            const rawUser = parsedData.split('&');
            const user = {};
            for( let property of rawUser ){
                let pair = property.split('=');
                user[pair[0]] = pair[1].replace(/\+/g,' ');                
            }            

            fileSystem.writeFile( `./users/${ user.fullname.split(' ')[0]}.json`, JSON.stringify( user ), err => {
                console.log( "entered writefiile callback" );
                console.error( err );
                if( !err ){
                    console.log( 'no error');
                    res.statusCode = 303;                    
                    res.setHeader( 'Location', '/user-welcome' );
                    return res.end();
                }
            });          
        })
    }

    if( url === '/user-welcome'){   
        const user = {};        
        res.write( '<html>' );
        res.write( '<head>' );
        res.write( '<title>Udemy - NodeJS The Complete Guide</title>' );
        res.write( `<style>
            body{
                background: #3E3E8E;
                color: #FCFCFC;
                font-family: sans-serif;
            }
        </style>` );
        res.write( '</head>' );
        res.write( '<body>' );
        res.write( '<h1>Welcome!</h1>');
        res.write( '<h2>Session 3 - Improved Development Workflow and Debbuging</h2>' );
        res.write( `<span>It's Nice to have you here!</span>` );            
        res.write( '</body>' );
        res.write( '</html>' );
        return res.end();  
    }
}

module.exports = routesHandler;