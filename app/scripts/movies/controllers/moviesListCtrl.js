'use strict';

angular.module('disney.Movies').controller('moviesListCtrl', function($scope, $filter, $log, movieSrv) {
    var moviesListCtrl = this;

    $scope.searchQuery = '';
    $scope.movies = [];
    $scope.currentPage = 1;
    $scope.limit = 5;
    $scope.totalResults = 0;

    // TODO: Sanitaze search query

    var filterMovies = function(items, query) {
        return $filter('filter')(items, query);
    };

    var getMoviesPaginated = function(items, limit) {
        return $filter('limitTo')(items, limit);
    };

    moviesListCtrl.getMovies = function(query) {
        var tmpMovies;
        movieSrv.search().then(function (data) {
            tmpMovies = data.items;

            if (query) {
                tmpMovies = filterMovies(tmpMovies, query);
            }

            $scope.movies = getMoviesPaginated(tmpMovies, $scope.limit);

            $scope.totalResults = tmpMovies.length;
        });
    };

    $scope.$watch('searchQuery', function(currentQuery) {
        $log.log('Watch search: ', currentQuery);

        if (currentQuery) {
            moviesListCtrl.getMovies(currentQuery);
        } else {
            moviesListCtrl.getMovies();
        }
    });

    $scope.$watch('currentPage', function(page) {
        $log.log('currentPage: ', page);
    });

    return moviesListCtrl;
});