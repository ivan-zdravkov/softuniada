'use strict';

app.controller('AppController', 
	['$scope', '$location', '$rootScope', 'authenticationService', function ($scope, $location, $rootScope, authenticationService) {
		$rootScope.isLoggedIn = authenticationService.isLoggedIn();
		$rootScope.isAdmin = authenticationService.isAdmin();
		$rootScope.username = authenticationService.getUsername();

		$scope.logout = function () {
			authenticationService.logout();
			$rootScope.isLoggedIn = false;
			$rootScope.isAdmin = false;
		};

	}]
);