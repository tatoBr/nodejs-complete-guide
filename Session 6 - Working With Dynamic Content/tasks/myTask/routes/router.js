//importing core modules
const path = require( 'path' )

//importing npm modules
const express = require( 'express' );

//Intantiate Route
const routes = express.Router();

//setting variables
const products = []

//setting up routes
//>>"/shop" GET
routes.get( '/shop', ( req, res )=>{
    res.status( 200 ).render( 'shop', {
        pageTitle: "MyShop | Products List",
        url: req.url,
        products: products
    });
});

//>>"/add-product" GET
routes.get( '/add-product', ( req, res, next )=>{
    res.status( 200 ).render( 'add-product', {
        pageTitle: 'MyShop | Product Registration',
        url: req.url
    });
});

//>>"/add-product" POST
routes.post( '/add-product', ( req, res, next )=>{
    products.push( req.body );
    console.table( products );
    res.status( 201 ).redirect( '/shop' );
});

exports.routes = routes;
exports.products = products;