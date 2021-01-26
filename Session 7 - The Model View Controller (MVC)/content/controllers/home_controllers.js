exports.getHome = ( req, res )=>{
    res.status( 200 ).render( 'home', {
        pageTitle: 'MyShop - Home | Welcome to my shop.',
        url: req.url,
        homePage: true
    });
};