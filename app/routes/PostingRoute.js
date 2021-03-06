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

    app.get('/postingAgenda', checkAuthenticated, controller.getPostingAgenda );

    app.post('/mapMonth', checkAuthenticated, controller.getMapMonth );

    app.get('/progressPosting', checkAuthenticated, controller.getProgress );

    app.get('/historyPosting', checkAuthenticated, controller.getHistory );

    app.get('/postings/:id', checkAuthenticated, controller.getPosting );

    app.post('/postings', checkAuthenticated, controller.addPosting );

    app.post('/postingfiltered', checkAuthenticated, controller.getPostingFiltered );

    app.put('/postings', checkAuthenticated, controller.editPosting );

    app.delete('/postings/:id', checkAuthenticated, controller.deletePosting );

    app.post( '/printPostings', checkAuthenticated, controller.printPosting );

    app.post( '/printXLS', checkAuthenticated, controller.printXLS );

    app.post( '/sendPostings', checkAuthenticated, controller.sendPosting );
};
