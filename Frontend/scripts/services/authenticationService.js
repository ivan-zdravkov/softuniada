'use strict';

app.factory('authenticationService', ['$rootScope', function ($rootScope) {
	var key = 'user';

	var _saveUser = function (data) {
		localStorage.setItem(key, JSON.stringify(data));
	};

	var _getUser = function () {
		var token = JSON.parse(localStorage.getItem(key));
		return token;
	};

	var _logout = function () {
		localStorage.removeItem(key);
		$rootScope.isLoggedIn = false;
		$rootScope.isAdmin = false;
		$rootScope.username = '';
	};

	var _getHeaders = function () {
		var headers = {};
		var userData = _getUser();
		if (userData) {
			headers.Authorization = 'Bearer ' + userData.access_token;
		}

		return headers;
	};

	var _isLoggedIn = function () {
		return !!_getUser();
	};

	var _isAdmin = function () {
		var isAdmin = false;;
		var user = _getUser();

		if (user) {
			return !!user.isAdmin;
		}

		return false;
	};

	var _getUsername = function () {
		var token = JSON.parse(localStorage.getItem(key));
		if (token) {
			return token.username;
		}
		return '';
	};

	return {
		saveUser: _saveUser,
		getUser: _getUser,
		logout: _logout,
		getHeaders: _getHeaders,
		isLoggedIn: _isLoggedIn,
		isAdmin: _isAdmin,
		getUsername: _getUsername
	};
}]);