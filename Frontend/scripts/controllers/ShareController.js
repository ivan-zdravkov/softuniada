'use strict';

app.controller('ShareController', 
	['$scope', function ($scope) {
		$scope.article = {};
		$scope.invalidTitle = false;
		$scope.invalidEmail = false;
		$scope.invalidContent = false;

		$scope.titleChange = function () {
			if ($scope.invalidTitle && $scope.article.title && $scope.article.title.length >= 1) {
				$scope.invalidTitle = false;
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
			if (!$scope.article.title || $scope.article.title.length < 1) {
				$scope.invalidTitle = true;
			} else {
				$scope.invalidTitle = false;
			}

			if (!$scope.article.email || $scope.article.email.length <= 5) {
				$scope.invalidEmail = true;
			} else {
				$scope.invalidEmail = false;
			}

			if (!$scope.article.content || $scope.article.content.length < 4) {
				$scope.invalidContent = true;
			} else {
				$scope.invalidContent = false;
			}


			if (!$scope.invalidTitle && !$scope.invalidEmail && !$scope.invalidContent) {
				// Send article.
			}
		};
	}]
);