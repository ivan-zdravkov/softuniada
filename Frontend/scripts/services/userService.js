'use strict';

app.factory('userService', ['baseServiceUrl', 'authenticationService',
	function (baseServiceUrl, authenticationService) {
	
	function registerUser (user) {
		var resource =  $resource(baseServiceUrl + 'user/register')
			.save(user);
		resource.$promise
			.then(function (data) {
				authenticationService.saveUser(data);
			});

		return resource;
	};

	function loginUser (user) {
		user.grant_type = 'password';
		var resource = $resource(baseServiceUrl + 'oauth/token')
			.save(user);
		resource.$promise
			.then(function (data) {
				authenticationService.saveUser(data);
			});

		return resource;
	};

	function logoutUser () {
		authenticationService.removeUser();
	};

	return {
		registerUser: registerUser,
		loginUser: loginUser,
		logoutUser: logoutUser
	}
}]);