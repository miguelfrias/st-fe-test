'use strict';

angular.module('disney.Movies').service('movieSrv', function($http, $log) {
    var movieSrv = this;

    movieSrv.search = function () {
        return $http.get('data/data.json').then(function onSuccess(data) {
            return data.data;
        }, function onError() {
            $log.error('Request error on movieSrv!');
        });
    };

    return movieSrv;
});