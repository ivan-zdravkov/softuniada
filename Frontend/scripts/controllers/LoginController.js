'use strict';

app.controller('LoginController', 
	['$scope', function ($scope) {
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
				var loginObj = {
					email: $scope.email,
					passowrd: $scope.passowrd
				};

				// Login the user.
			}
		};
	}]
);