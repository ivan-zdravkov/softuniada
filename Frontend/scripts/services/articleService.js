'use strict';

app.factory('articleService', ['$http', '$q', 'authSettings', 'authenticationService', 'queryService',
	function ($http, $q, authSettings, authenticationService, queryService) {

		var serviceBase = authSettings.baseUri;

		var _getAllArticles = function () {
			var resourceURL = serviceBase + '/api/GetAllArticles';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		return {
			getAllArticles: _getAllArticles
		};
	}
]);