'use strict';

app.controller('ContactUsController', 
	['$scope', function ($scope) {
		$scope.message = {};
		$scope.invalidSubject = false;
		$scope.invalidEmail = false;
		$scope.invalidContent = false;

		$scope.subjectChange = function () {
			if ($scope.invalidUsername && $scope.reg.username && $scope.reg.username.length >= 4) {
				$scope.invalidUsername = false;
			}
		};

		$scope.emailChange = function () {
			if ($scope.invalidEmail && $scope.reg.email && $scope.reg.email.length > 0) {
				$scope.invalidEmail = false;
			}
		};

		$scope.contentChange = function () {
			if ($scope.invalidPassword && $scope.reg.password && $scope.reg.password.length >= 4) {
				$scope.invalidPassword = false;
			}
		};

		$scope.send = function () {
			if (!$scope.reg.username || $scope.reg.username.length <= 4 || $scope.reg.username.indexOf(' ') !== -1) {
				$scope.invalidUsername = true;
			}

			if (!$scope.reg.email || $scope.reg.email.length <= 5) {
				$scope.invalidEmail = true;
			}

			if (!$scope.reg.password || $scope.reg.password.length < 4) {
				$scope.invalidPassword = true;
			}


			if (!$scope.invalidUsername && !$scope.invalidEmail && !$scope.invalidPassword && 
				!$scope.invalidConfPassword && !$scope.invalidPasswords) {
				// Send message.
			}
		};
	}]
);