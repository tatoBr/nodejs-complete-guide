//importing Core modules
const fs = require( 'fs' );
const path = require( 'path' );

//importing NPM modules
const express = require( 'express' );

//importing local modules
const root_path = require( '../util/root_path' );

//intantiate the Router obj
const router = express.Router()

//variables declaration
const title = 'NodeJS Complete Guide - Session 6 | '
const products = [];

//setting up the routes
//Route>>"/"
router.get( '/', ( req, res, next )=>{
    return res.status( 200 ).render( 'home',{
        pageTitle: `${ title }HOME`,
        path: req.url,
        homePage: true
    });
});

//Route>>"/products"
router.get( '/products', ( req, res, next )=>{    
    return res.status( 200 ).render( 'products', {
        pageTitle : `${ title }PRODUCTS`,
        products : products,
        hasProducts: products.length > 0,
        path: req.url,
        productsPage: true
    });
});

router.get( '/add-product', ( req, res, next )=>{    
    return res.status( 200 ).render( 'add-product', {
        pageTitle: `${ title }ADD PRODUCT`,
        path: req.url,
        addProductPage: true
    });
});

router.post( '/add-product', ( req, res, rext )=>{
    const product = {
        name: req.body.name,
        price: parseFloat( req.body.price ),
        description: req.body.description
    };
    products.push( product );
    return res.status( 201 ).redirect( '/products' );
});

exports.router = router;
exports.products = products;