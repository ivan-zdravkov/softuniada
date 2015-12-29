'use strict';

app.controller('ShareController', 
	['$scope', '$rootScope', '$location', 'notyService', 'mailService', function ($scope, $rootScope, $location, notyService, mailService) {
		$scope.article = {};
		$scope.article.from = $rootScope.username;
		$scope.invalidTitle = false;
		$scope.invalidContent = false;
		$scope.isPreview = false;
		$scope.isDataLoading = false;

		$scope.titleChange = function () {
			if ($scope.invalidTitle && $scope.article.title && $scope.article.title.length >= 1) {
				$scope.invalidTitle = false;
			}
		};

		$scope.contentChange = function () {
			if ($scope.invalidContent && $scope.article.content && $scope.article.content.length >= 4) {
				$scope.invalidContent = false;
			}
		};

		$scope.previewArticle = function () {
			$scope.isPreview = !$scope.isPreview;
		};

		$scope.send = function () {
			if (!$scope.article.title || $scope.article.title.length < 1) {
				$scope.invalidTitle = true;
			} else {
				$scope.invalidTitle = false;
			}

			if (!$scope.article.content || $scope.article.content.length < 4) {
				$scope.invalidContent = true;
			} else {
				$scope.invalidContent = false;
			}

			if (!$scope.invalidTitle && !$scope.invalidContent) {
				$scope.isDataLoading = true;
				mailService.sendMail($scope.message).then(function () {
					notyService.successMessage('Your message was sent successfully.');
					$scope.isDataLoading = false;
					$location.path('/');
				});
			}
		};
	}]
);