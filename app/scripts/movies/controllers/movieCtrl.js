'use strict';

angular.module('disney.Movies').controller('movieCtrl', function($scope, $routeParams, $filter, $log, movieSrv) {
    var movieCtrl = this;

    $log.log('Movie controller');

    $scope.movie = {};
    $scope.notFound = false;

    movieCtrl.getMovies = function() {
        var tmpMovie;

        movieSrv.search().then(function (data) {

            tmpMovie = $filter('filter')(data.items, function(item) {
                if (item.slug === $routeParams.title) {
                    return item;
                }
            });

            if (tmpMovie && tmpMovie.length > 0) {
                $scope.movie = tmpMovie[0];
            } else {
                $scope.notFound = true;
            }
        });
    };

    movieCtrl.getMovies();

    return movieCtrl;
});

