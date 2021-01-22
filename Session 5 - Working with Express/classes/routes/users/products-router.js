const fs = require( 'fs' );
const path = require( 'path' );

const express = require( 'express' );
const router = express.Router();

const rootDir = require('../../util/root_path' );

router.get( '/products', ( req, res, next ) => {
    const filePath = './database/products.json'
    fs.readFile( filePath, 'utf8', ( err, data )=>{
        if( !err ){            
            const products = JSON.parse( data.toString());
            res.status( 200 ).sendFile( path.join( rootDir, 'views', 'shop.html' ));            
        }
        else{
            return res.send('Error')
        }
    });
});

module.exports = router;