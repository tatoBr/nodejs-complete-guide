const path = require( 'path' );

const express = require( 'express' );
const router = express.Router();

const rootDir = require( '../../util/root_path' );

const Product = require( '../../models/product-model' );
const controller = require( '../../controllers/products-controller' );

router.get( '/add-product', ( req, res, next )=>{
    return res.status( 200 ).sendFile( path.join( rootDir, 'views', 'add-product.html' )); 
});

router.post('/add-product', ( req, res, next )=>{
    const { name, price } = req.body
    const product = new Product( name, parseFloat( price ));

    controller.saveProduct( product, res );     
});

module.exports = router;