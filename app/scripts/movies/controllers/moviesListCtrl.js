'use strict';

angular.module('disney.Movies').controller('moviesListCtrl', function($scope, $filter, $log, movieSrv) {
    var moviesListCtrl = this;
    var pager = 0;

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
        $log.log('filterMovies: ', query);
        return $filter('filter')(items, {title: query});
    };

    var sortBy = function(items, sort) {
        return $filter('orderBy')(items, sort);
    };

    var getMoviesPaginated = function(items, limit, begin) {
        return $filter('limitTo')(items, limit, begin);
    };

    moviesListCtrl.getMovies = function() {
        var tmpMovies;

        movieSrv.search().then(function (data) {
            tmpMovies = data.items;

            if ($scope.searchQuery) {
                tmpMovies = filterMovies(tmpMovies, $scope.searchQuery);
            }

            tmpMovies = sortBy(tmpMovies, $scope.config.sort);

            $scope.movies = getMoviesPaginated(tmpMovies, $scope.config.limit, pager);

            $scope.totalResults = tmpMovies.length;
        });
    };

    $scope.getMovies = moviesListCtrl.getMovies;

    $scope.$watch('searchQuery', function(currentQuery, last) {
        if (currentQuery !== last) {
            moviesListCtrl.getMovies();
        }
    });

    $scope.$watch('config.sort', function(current, last) {
        if (current !== last) {
            moviesListCtrl.getMovies();
        }
    });

    $scope.$watch('currentPage', function(current, last) {
        if (current !== last) {
            // START pager
            if (current === 1) {
                pager = 0;
            } else if (current > last) {
                pager += $scope.config.limit;
            } else if (current < last) {
                pager -= $scope.config.limit;
            } else {
                pager = 0;
            }

            moviesListCtrl.getMovies();
        }
    });

    moviesListCtrl.getMovies();

    return moviesListCtrl;
});