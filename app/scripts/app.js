'use strict';

// Declare app level module which depends on views, and components
angular.module('disney', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'disney.Movies'
]).
config(function($routeProvider) {

  var routes = [];

  routes.push({
    name: '/movies',
    params: {
      templateUrl:  'scripts/movies/views/movies-list.html',
      controller: 'moviesListCtrl'
    }
  });

  routes.push({
    name: '/movie/:title',
    params: {
      templateUrl:  'scripts/movies/views/movie.html',
      controller: 'movieCtrl'
    }
  });

  $routeProvider.otherwise({
    redirectTo: '/movies'
  });

  routes.forEach(function(route){
    $routeProvider.when(route.name, route.params);
  });

});

