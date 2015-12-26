'use strict';

app.controller('LoginController', 
	['$scope', '$location', '$rootScope', 'userService', function ($scope, $location, $rootScope, userService) {
		$scope.invalidEmail = false;
		$scope.invalidPassword = false;

		$scope.emailChange = function() {
			if ($scope.invalidEmail && $scope.email && $scope.email.length > 0) {
				$scope.invalidEmail = false;
			}
		};

		$scope.passChange = function() {
			if ($scope.invalidPassword && $scope.password && $scope.password.length > 0) {
				$scope.invalidPassword = false;
			}
		};

		$scope.login = function () {
			if (!$scope.email) {
				$scope.invalidEmail = true;
			} else {
				$scope.invalidEmail = false;
			}

			if (!$scope.password) {
				$scope.invalidPassword = true;
			} else {
				$scope.invalidPassword = false;
			}

			if (!$scope.invalidEmail && !$scope.invalidPassword) {
				var user = {
					username: $scope.email,
					password: $scope.password
				};

				var token = {
					"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2MzNkMDNlNS04NmZiLTRiNjEtOWZlYy0yNWZmZmZmNTM0YjciLCJ1bmlxdWVfbmFtZSI6ImRvaXR5b3Vyc2VsZi53ZWJtYWlsQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vYWNjZXNzY29udHJvbHNlcnZpY2UvMjAxMC8wNy9jbGFpbXMvaWRlbnRpdHlwcm92aWRlciI6IkFTUC5ORVQgSWRlbnRpdHkiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImNjZDBjMDgzLTMyZDQtNGVjMC04MjRjLTI0Njc3OTdjN2RlYiIsInJvbGUiOlsiVXNlciIsIkFkbWluaXN0cmF0b3IiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMzQ0NyIsImF1ZCI6IjYwMzlmNmUxMjNiNjQ2YTc5OTEzY2JmMjc2NmMwNWEyIiwiZXhwIjoxNDUxMjE5MjMwLCJuYmYiOjE0NTExMzI4MzB9.bx61rCYCKbEhI8YF0TVu16umwH72BtW0HOIZVZf3o9o",
					"token_type": "bearer",
					"isAdmin": true,
					"expires_in": 86399,
					"username": user.username
				};
				localStorage.setItem('user', JSON.stringify(token));
				$rootScope.isLoggedIn = true;
				$rootScope.isAdmin = true;
				$rootScope.username = user.username;
				$location.path('/');
				// userService.loginUser(user).then(function (response) {
					// $location.path('/');
				// });
			}
		};
	}]
);