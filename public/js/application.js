/* global angular */

( function(){
	
    'use strict';

    angular.module( 'Strom' , [ 'ngRoute', 
                                'ngResource',
                                'angularUtils.directives.dirPagination' ] );

    angular.module( 'Strom').config( [ '$routeProvider', '$httpProvider' , function ( $routeProvider, $httpProvider ) 
    {
        $httpProvider.interceptors.push( 'InterceptorService' );
        
        $routeProvider
        .when('/user', 
        {
            templateUrl: '/partials/user/user.html',
            controller: 'UserController'
        } )
        .when('/category', {
            templateUrl: '/partials/category/category.html',
            controller: 'CategoryController'
        })
        .when('/login', 
        {
            templateUrl: '/partials/login.html'
        } )
        .when('/entries', {
            templateUrl: '/partials/lists/entrieList.html',
            controller: 'EntriesController'
        });
        
        $routeProvider.otherwise( { redirectTo: '/' } );
    } ] );
})();