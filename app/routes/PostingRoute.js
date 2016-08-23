/* global module */

function checkAuthenticated( req, res, next ) 
{
    if ( req.isAuthenticated() )
    {
        return next();
    }

    else
    {
        res.status( '401' ).json( 'Sem autorização' );
    }
  
};

module.exports = function( app )
{
    var controller = app.controllers.PostingController;

    app.get('/postings', checkAuthenticated, controller.getPostings );
    
    app.get('/postings/:id', checkAuthenticated, controller.getPosting );
        
    app.post('/postings', checkAuthenticated, controller.addPosting );
	
    app.put('/postings', checkAuthenticated, controller.editPosting );
    
    app.delete('/postings/:id', checkAuthenticated, controller.deletePosting );
};