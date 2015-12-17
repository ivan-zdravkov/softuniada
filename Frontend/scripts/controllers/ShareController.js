'use strict';

app.controller('ShareController', 
	['$scope', function ($scope) {
		$scope.article = {};
		$scope.invalidSubject = false;
		$scope.invalidEmail = false;
		$scope.invalidContent = false;

		$scope.subjectChange = function () {
			if ($scope.invalidSubject && $scope.article.subject && $scope.article.subject.length >= 1) {
				$scope.invalidSubject = false;
			}
		};

		$scope.emailChange = function () {
			if ($scope.invalidEmail && $scope.article.email && $scope.article.email.length > 0) {
				$scope.invalidEmail = false;
			}
		};

		$scope.contentChange = function () {
			if ($scope.invalidContent && $scope.article.content && $scope.article.content.length >= 4) {
				$scope.invalidContent = false;
			}
		};

		$scope.send = function () {
			if (!$scope.article.subject || $scope.article.subject.length < 1) {
				$scope.invalidSubject = true;
			}

			if (!$scope.article.email || $scope.article.email.length <= 5) {
				$scope.invalidEmail = true;
			}

			if (!$scope.article.content || $scope.article.content.length < 4) {
				$scope.invalidContent = true;
			}


			if (!$scope.invalidSubject && !$scope.invalidEmail && !$scope.invalidContent) {
				// Send article.
			}
		};
	}]
);