'use strict';

app.factory('userService', ['$http', '$q', 'authSettings', 'authenticationService', 'queryService',
	function ($http, $q, authSettings, authenticationService, queryService) {

		var serviceBase = authSettings.baseUri;
	
		var registerUser = function (user) {
			var resourceURL = serviceBase + '/api/user/register';
	        var promise = queryService.post(resourceURL, user, 'UTC');

	        promise.then(function (data) {
				authenticationService.saveUser(data);
	        });

	        return promise;
		};

		var loginUser = function (user) {
			user.grant_type = 'password';
			var resourceURL = serviceBase + '/oauth/token';
	        var promise = queryService.post(resourceURL, user, 'UTC');

	        promise.then(function (data) {
	        	data.username = user.username;
				authenticationService.saveUser(data);
				
				$rootScope.isLoggedIn = true;
				$rootScope.isAdmin = data.isAdmin;
				$rootScope.username = user.username;
	        });

	        return promise;
		};

		var logoutUser = function () {
			authenticationService.removeUser();
		};

		return {
			registerUser: registerUser,
			loginUser: loginUser,
			logoutUser: logoutUser
		};
	}
]);