const fs = require( 'fs' );
const path = require( 'path' );

const rootDir = require( '../util/root_path');

const dbPath = "./database/products.json"

/** 
 * @param { Product } product
 * @param { res } 
 */
const saveProduct = ( product, res )=>{
    //check if file exists and is accessible
    fs.access( dbPath, err => {
        //if error, file don't exists or isn't accessible
        if( err ){
            //create it
            const products = [];
            products.push( product );

            //try to save it
            fs.writeFile( dbPath, JSON.stringify( products ), err =>{
                if( !err ){
                    res.statusCode = 302;
                    return res.status(201).redirect( '/products' );
                }
                else{
                    console.error( err );
                    return res.status(500).sendFile( path.join( rootDir, 'views', 'internal-error.html'));
                }
            });
        }
        //if no error occurs, file exists
        else{
            //try to read it
            fs.readFile( dbPath, ( err, data )=>{
                //if no err
                if( !err ){
                    //parse data, add new product and tries to save it
                    const products = JSON.parse( data.toString()); 
                    products.push( product );

                    fs.writeFile( dbPath, JSON.stringify( products ), err =>{
                        if( !err ){
                            res.statusCode = 302;
                            return res.status(201).redirect( '/products' );
                        }
                        else{
                            console.error( err );
                            return res.status(500).sendFile( path.join( rootDir, 'views', 'internal-error.html'));
                        }
                    })                   
                }
                else{
                    console.error( err );
                    return res.status( 500 ).sendFile( path.join( rootDir, 'views', 'internal-error.html' ));
                }
            });
        }
    });
}

module.exports = { saveProduct };