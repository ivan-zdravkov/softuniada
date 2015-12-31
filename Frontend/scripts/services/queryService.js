'use strict';

app.factory('queryService', ['$http', '$q', 'authenticationService', function ($http, $q, authenticationService) {

	var _executeGetQuery = function (resourceURL, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.get(resourceURL, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executePostQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.post(resourceURL, data, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };
	
	var _executeLoginPostQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);
        headers.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        $http.post(resourceURL, data, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executeDeleteQuery = function (resourceURL, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.delete(resourceURL, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executePutQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.put(resourceURL, data, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _createHeaders = function (timeZoneID) {
        var headers = {};
        headers.headers = authenticationService.getHeaders();
        headers.headers['TimeZoneID'] = timeZoneID;
        headers.headers['Content-Type'] = 'application/json;charset=utf-8';

        return headers;
    };

	return {
        get: _executeGetQuery,
        post: _executePostQuery,
		login: _executeLoginPostQuery,
        put: _executePutQuery,
        delete: _executeDeleteQuery
	};
}]);


// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2MzNkMDNlNS04NmZiLTRiNjEtOWZlYy0yNWZmZmZmNTM0YjciLCJ1bmlxdWVfbmFtZSI6ImRvaXR5b3Vyc2VsZi53ZWJtYWlsQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vYWNjZXNzY29udHJvbHNlcnZpY2UvMjAxMC8wNy9jbGFpbXMvaWRlbnRpdHlwcm92aWRlciI6IkFTUC5ORVQgSWRlbnRpdHkiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImNjZDBjMDgzLTMyZDQtNGVjMC04MjRjLTI0Njc3OTdjN2RlYiIsInJvbGUiOlsiVXNlciIsIkFkbWluaXN0cmF0b3IiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMzQ0NyIsImF1ZCI6IjYwMzlmNmUxMjNiNjQ2YTc5OTEzY2JmMjc2NmMwNWEyIiwiZXhwIjoxNDUxNjYyNzE5LCJuYmYiOjE0NTE1NzYzMTl9.3pSUmNHy_nln5g8HNzRXlLau48ODEsXwY5kjLArCj2I"