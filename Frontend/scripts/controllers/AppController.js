'use strict';

app.controller('AppController', 
	['$scope', '$location', '$rootScope', 'authenticationService', function ($scope, $location, $rootScope, authenticationService) {
		$rootScope.isLoggedIn = authenticationService.isLoggedIn();
		$rootScope.isAdmin = authenticationService.isAdmin();
		$rootScope.username = authenticationService.getUsername();
		// $scope.resetCredentials = function () {
		// 	$scope.isLoggedIn = false;
		// 	$scope.isAdmin = false;
		// };

		// $scope.resetCredentials();

		// $scope.isLoggedIn = authenticationService.isLoggedIn();
		// $scope.isAdmin = authenticationService.isAdmin();

		$scope.logout = function () {
			authenticationService.logout();
			$rootScope.isLoggedIn = false;
			$rootScope.isAdmin = false;
		};

	}]
);