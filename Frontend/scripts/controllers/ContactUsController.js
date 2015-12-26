'use strict';

app.controller('ContactUsController', 
	['$scope', '$rootScope', function ($scope, $rootScope) {
		$scope.message = {};
		$scope.message.email = $rootScope.username;
		$scope.invalidSubject = false;
		$scope.invalidEmail = false;
		$scope.invalidContent = false;

		$scope.subjectChange = function () {
			if ($scope.invalidSubject && $scope.message.subject && $scope.message.subject.length >= 1) {
				$scope.invalidSubject = false;
			}
		};

		$scope.contentChange = function () {
			if ($scope.invalidContent && $scope.message.content && $scope.message.content.length >= 4) {
				$scope.invalidContent = false;
			}
		};

		$scope.send = function () {
			if (!$scope.message.subject || $scope.message.subject.length < 1) {
				$scope.invalidSubject = true;
			} else {
				$scope.invalidSubject = false;
			}

			if (!$scope.message.email || $scope.message.email.length <= 5) {
				$scope.invalidEmail = true;
			} else {
				$scope.invalidEmail = false;
			}

			if (!$scope.message.content || $scope.message.content.length < 4) {
				$scope.invalidContent = true;
			} else {
				$scope.invalidContent = false;
			}


			if (!$scope.invalidSubject && !$scope.invalidEmail && !$scope.invalidContent) {
				// Send message.
			}
		};
	}]
);