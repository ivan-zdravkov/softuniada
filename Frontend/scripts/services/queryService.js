'use strict';

app.factory('queryService', ['$http', '$q', function ($http, $q) {

	var _executeGetQuery = function (resourceURL, timeZoneID) {
        var deferred = $q.defer();

        $http.get(resourceURL, {
            headers: {
                'TimeZoneID': timeZoneID
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executePostQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();

        $http.post(resourceURL, data, {
            headers: {
            	'Accept': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'TimeZoneID': timeZoneID
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executeDeleteQuery = function (resourceURL, timeZoneID) {
        var deferred = $q.defer();

        $http.delete(resourceURL, {
            headers: {
                'TimeZoneID': timeZoneID
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executePutQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();

        $http.put(resourceURL, data, {
            headers: {
                'TimeZoneID': timeZoneID
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

	return {
        get: _executeGetQuery,
        post: _executePostQuery,
        put: _executePutQuery,
        delete: _executeDeleteQuery
	};
}]);