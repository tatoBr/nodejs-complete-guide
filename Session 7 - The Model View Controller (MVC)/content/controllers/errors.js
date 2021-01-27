//404
exports.getPageNotFound = ( req, res )=>{
    res.status( 404 ).render( '404', {
        pageTitle: 'MyShop - 404 | Page Not Found',
        url: req.url,
        page404: true
    });
}