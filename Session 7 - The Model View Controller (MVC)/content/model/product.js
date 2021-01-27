//importing CORE modules
const fs = require('fs');
const path = require('path');

//importing project modules
const rootPath = require('../util/root_dir');

//declaring variables and functions
const dbpath = path.join(rootPath, 'database', 'products.json');
/**
 * Read products from a file
 * @param { Function } callback 
 */
function readProductsFromFile( callback ){
    //verify  if the file exists and if it's writable
    fs.access( dbpath, fs.constants.F_OK | fs.constants.W_OK, accessError => {
        //if no error occurs while trying to access the file, then read it
        if ( !accessError ) {
            //read the file
            fs.readFile( dbpath, 'UTF8', ( readError, data ) => {
                if ( !readError ) {
                    try {
                        //parse the file
                        const products = JSON.parse( data );
                        callback( products, null )
                    } catch ( parseError ) {
                        console.error( parseError );
                        callback([], parseError );                        
                    }
                }
            });
        }
        //if an error occurs, check the error
        else{
            if( accessError.code === 'ENOENT' ){
                callback([], null );
            }
            else {
                callback([], accessError );
            }           
        }
    });
}

module.exports = class Product {
    constructor(_title, _price, _description) {
        this.title = _title;
        this.price = _price;
        this.description = _description;
    }

    /**
     * save a product into the database
     * @param { Function } next 
     */
    save = next => {
        readProductsFromFile(( products, error )=>{
            products.push( this )
            fs.writeFile( dbpath, JSON.stringify( products ), writeError =>{
                next( writeError );
            });
        });
    }

    /**
     * Fetch all products in the file
     * @param { Function } next 
     */
    static fetchAll = next => {
        readProductsFromFile(( products, error )=>{
            next( products, error );
        });
    }
}
         
