//import core modules
const path = require( 'path' );

//import npm modules
const express = require( 'express' );

//instantiate the route
const router = express.Router();

//declaring variables
const users = [];

//setting up routes
//>> GET "/"
router.get( '/', ( req, res )=>{
    res.status( 200 ).render( 'home', {
        pageTitle: 'Home | Welcome to my Page',
        url: req.url
    });
});

//GET "users"
router.get( '/users', ( req, res )=>{
    res.status( 202 ).render( 'users', {
        pageTitle: "Users | User list",
        url: req.url,
        users: users
    });
});

//POST "/users"
router.post( '/users', ( req, res )=>{
    const { firstname, lastname, email } = req.body;
    users.push({
        firstname,
        lastname,
        email
    });

    res.status( 302 ).redirect( '/users');
});

module.exports = router;
