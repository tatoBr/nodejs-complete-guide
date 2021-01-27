//imporing core modules
const path = require( 'path' )

//importing npm modules
const express = require( 'express' );

//importing local modules
const rootPath = require( '../util/root_dir' );
const { brotliDecompressSync } = require('zlib');
//>importing Controllers
const home_controllers = require( '../controllers/home_controllers' );
const shop_controllers = require( '../controllers/shop_controllers' );


//creating a new Router object
const router = express.Router();

//setting up the routes
//>>GET '/'
router.get( '/', home_controllers.getHome );

//>>GET '/shop'
router.get( '/shop', shop_controllers.getShop );

//>>GET '/add-product'
router.get( '/add-product', shop_controllers.getAddProduct );

//>>POST '/add-product'
router.post( '/add-product', shop_controllers.postAddProduct );

module.exports = router;


