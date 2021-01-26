//importing core modules
const { json } = require('express');
const fs = require('fs');
const path = require('path');

//importing local modules
const root_path = require('../util/root_dir');

const dbpath = path.join(root_path, 'database', 'products.json');

exports.getShop = (req, res) => {
    //check if file existis and is writlable
    fs.access(dbpath, fs.constants.F_OK | fs.constants.W_OK, err => {
        if (!err) {
            //read the file
            fs.readFile(dbpath, 'UTF8', (err, data) => {
                if (!err) {
                    try {
                        const products = JSON.parse(data);
                        return res.status(200).render('shop', {
                            pageTitle: 'MyShop - Shop | Products List.',
                            url: req.url,
                            shopPage: true,
                            products: products,
                            hasProducts: products.length > 0
                        });
                    } catch (err) {
                        console.error(err);
                        return res.status(500).render('500', {
                            pageTitle: 'MyShop - 500 | Internal Server Error.',
                            url: req.url
                        });
                    }
                }
            })
        }
        else {
            console.error(err);
            return res.status(500).render('500', {
                pageTitle: 'MyShop - 500 | Internal Server Error.',
                url: req.url
            });
        }
    });
}

exports.getAddProduct = (req, res) => {
    res.status(200).render('add-products', {
        pageTitle: 'MyShop - Product Registration | Add a new Product to the list',
        url: req.url,
        addProductPage: true
    });
}

exports.postAddProduct = (req, res) => {
    //check if file exists and is writable
    fs.access(dbpath, fs.constants.F_OK | fs.constants.W_OK, err => {
        if (!err) {
            //read the file
            fs.readFile(dbpath, 'UTF8', (err, data) => {
                if (!err) {
                    //tries to parse the file
                    try {
                        const products = JSON.parse(data);
                        
                        //add new product
                        products.push({
                            title: req.body.title || "No Title.",
                            price: parseFloat( req.body.price ) || 0.01,
                            description: req.body.description || 'No Description'
                        });
                        
                        //save new product list to file
                        fs.writeFile( dbpath, JSON.stringify( products ), err=>{
                            if( !err ){
                                return res.redirect('shop');
                            }
                            else{
                                throw err;
                            }
                        });                       
                    } catch (error) {
                        console.error( error );
                        return res.status(500).render('500', {
                            pageTitle: 'MyShop - 500 | Internal Server Error.',
                            url: req.url
                        });
                    }
                }
            });
        }
        else {
            console.error(err);
            return res.status(500).render('500', {
                pageTitle: 'MyShop - 500 | Internal Server Error.',
                url: req.url
            });
        }
    })
}