'use strict';

app.factory('authenticationService', ['$rootScope', function ($rootScope) {
	var key = 'user';

	var saveUser = function (data) {
		localStorage.setItem(key, JSON.stringify(data));
	};

	var getUser = function () {
		var token = JSON.parse(localStorage.getItem(key));
		return token;
	};

	var logout = function () {
		localStorage.removeItem(key);
		$rootScope.isLoggedIn = false;
		$rootScope.isAdmin = false;
		$rootScope.username = '';
	};

	var getHeaders = function () {
		var headers = {};
		var userData = getUser();
		if (userData) {
			headers.Authorization = 'Bearer ' + getUser().access_token;
		}

		return headers;
	};

	var isLoggedIn = function () {
		return !!getUser();
	};

	var isAdmin = function () {
		var isAdmin = false;;
		var user = getUser();

		if (user) {
			return !!user.isAdmin;
		}

		return false;
	};

	var getUsername = function () {
		var token = JSON.parse(localStorage.getItem(key));
		if (token) {
			return token.username;
		}
		return '';
	};

	return {
		saveUser: saveUser,
		getUser: getUser,
		logout: logout,
		getHeaders: getHeaders,
		isLoggedIn: isLoggedIn,
		isAdmin: isAdmin,
		getUsername: getUsername
	};
}]);