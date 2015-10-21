'use strict';

angular.module('disney.Movies').controller('moviesListCtrl', function($scope, $filter, $log, movieSrv) {
    var moviesListCtrl = this;

    $scope.searchQuery = '';
    $scope.movies = [];
    $scope.currentPage = 1;
    $scope.totalResults = 0;
    $scope.config = {
        limit: 5,
        sort: 'title'
    };

    // TODO: Sanitaze search query

    var filterMovies = function(items, query) {
        return $filter('filter')(items, query);
    };

    var sortBy = function(items, sort) {
        return $filter('orderBy')(items, sort);
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

            tmpMovies = sortBy(tmpMovies, $scope.config.sort);

            $scope.movies = getMoviesPaginated(tmpMovies, $scope.limit);

            $scope.totalResults = tmpMovies.length;
        });
    };

    $scope.getMovies = moviesListCtrl.getMovies;

    $scope.$watch('searchQuery', function(currentQuery, last) {
        if (currentQuery !== last) {
            if (currentQuery) {
                moviesListCtrl.getMovies(currentQuery);
            } else {
                moviesListCtrl.getMovies();
            }
        }
    });

    $scope.$watch('config.sort', function(current, last) {
        if (current !== last) {
            $log.log('sort 2;');
            moviesListCtrl.getMovies();
        }
    });

    // $scope.$watch('currentPage', function(page) {
    //     $log.log('currentPage: ', page);
    // });

    moviesListCtrl.getMovies();

    return moviesListCtrl;
});