//importing NPM modules
const express = require( 'express' );

//importing controllers
const controller = require( '../controllers/errors')

//creating a new Router object
const router = express.Router();

router.use( controller.getPageNotFound );

module.exports = router;