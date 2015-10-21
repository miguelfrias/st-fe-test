'use strict';

angular.module('disney.Filters').filter('customTime', function() {
    return function(input) {
        var hours = parseInt((input / 3600), 10);
        var minutes = parseInt(((input % 3600) / 60), 10);
        var time = '';

        if (hours && hours > 0) {
            time += hours + ' hrs ';
        }

        if (minutes && minutes > 0) {
            time += minutes + ' minutes';
        }

        return time;
    };
});