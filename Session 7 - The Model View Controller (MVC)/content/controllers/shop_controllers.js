//importing core modules
const path = require('path');

//importing local modules
const Product = require('../model/product');

exports.getShop = ( req, res ) => {
    Product.fetchAll(( products, fetchError ) => {
        if ( fetchError ) console.error( fetchError );

        return res.status(200).render('shop', {
            pageTitle: 'MyShop - Shop | Products List.',
            url: req.url,
            shopPage: true,
            products: products,
            hasProducts: products.length > 0
        });
    });
}

exports.getAddProduct = ( req, res ) => {
    res.status(200).render('add-products', {
        pageTitle: 'MyShop - Product Registration | Add a new Product to the list',
        url: req.url,
        addProductPage: true
    });
}

exports.postAddProduct = ( req, res ) => {
    const { title, price, description } = req.body;
    const product = new Product( title, parseFloat(price), description );
    product.save( saveError => {
        if ( !saveError ) {
            return res.status( 202 ).redirect('/shop');            
        }
        else {
            console.log( saveError );
            return res.status(500).render('500', {
                pageTitle: 'MyShop - 500 | Internal Server Error.',
                url: req.url,
                error: saveError
            });
        }
    });
}
