'use strict';

app.factory('userService', ['$http', '$q', 'authSettings', 'authenticationService', 'queryService',
	function ($http, $q, authSettings, authenticationService, queryService) {

		var serviceBase = authSettings.baseUri;
	
		var _registerUser = function (user) {
			var resourceURL = serviceBase + '/api/user/register';
	        var promise = queryService.post(resourceURL, user, 'UTC');

	        return promise;
		};

		var _loginUser = function (user) {
			var resourceURL = serviceBase + '/oauth/token';
	        var promise = queryService.login(resourceURL, "userName=" + user.username + "&password=" + user.password + "&grant_type=password", 'UTC');

	        promise.then(function (data) {
	        	data.username = user.username;
				authenticationService.saveUser(data);
				
				$rootScope.isLoggedIn = true;
				$rootScope.isAdmin = data.isAdmin;
				$rootScope.username = user.username;
	        });

	        return promise;
		};

		var _logoutUser = function () {
			authenticationService.removeUser();
		};

		return {
			registerUser: _registerUser,
			loginUser: _loginUser,
			logoutUser: _logoutUser
		};
	}
]);