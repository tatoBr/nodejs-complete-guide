//imporing core modules
const path = require( 'path' )

//importing npm modules
const express = require( 'express' );

//importing local modules
const rootPath = require( '../util/root_dir' );
const { brotliDecompressSync } = require('zlib');

//initiating variables
const products = [];

//creating a new Router object
const router = express.Router();

//setting up the routes
//>>GET '/'
router.get( '/', ( req, res )=>{
    res.status( 200 ).render( 'home', {
        pageTitle: 'MyShop - Home | Welcome to my shop.',
        url: req.url
    });
});

//>>GET '/shop'
router.get( '/shop', ( req, res )=>{
    res.status( 200 ).render( 'shop', {
        pageTitle: 'MyShop - Shop | Product List',
        url: req.url,
        products
    });
});

//>>GET '/add-product'
router.get( '/add-product', ( req, res )=>{
    res.status( 200 ).render( 'add-products', {
        pageTitle: 'MyShop - Product Registration | Add a new Product to the list',
        url: req.url
    });
});

//>>POST '/add-product'
router.post( '/add-product', ( req, res )=>{
    let product = {
        title: req.body.title || 'No Tittle',
        price: parseFloat( req.body.price ) || 0.01,
        description: req.body.description || 'No Description for this product'
    };
    products.push( product );
    res.redirect( '/shop' );
});

module.exports = router;

