//Import Core Modules
const path = require( 'path' );

//Import npm mopdules
const express = require( 'express' );

//import local modules
const root_dir = require( '../util/root_dir' );

//create an instance of Router.
const router = express.Router();

//Route>>"./"
router.get( '/', ( req, res, next ) => {
    res.status( 200 ).sendFile( path.join( root_dir, 'views', 'home.html'));
});

//Route>>"./users"
router.get( '/users', ( req, res, next )=>{
    res.status( 200 ).sendFile( path.join( root_dir, 'views', 'users.html' ));
});

module.exports = router;
