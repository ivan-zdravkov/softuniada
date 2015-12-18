'use strict';

app.controller('LifeHacksController', 
	['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
		// $scope.articles = [];
		// $scope.articleId = $routeParams.articleId;
		// $scope.isDataLoading = true;

		// var asd = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

		// $scope.articles.push({
		// 	id: 1,
		// 	title: 'How to build a real lightsaber',
		// 	createdDate: new Date(),
		// 	imageURL: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
		// 	content: asd
		// });

		// $scope.articles.push({
		// 	id: 2,
		// 	title: 'How to be a Jedi',
		// 	createdDate: new Date(),
		// 	imageURL: 'http://4.bp.blogspot.com/-nz7e22sTknU/Vk14ra3xlqI/AAAAAAAAMlE/e2-Fp3N_atA/s1600/sergbvcj4.jpg',
		// 	content: asd
		// });

		$scope.redirectToArticle = function (articleId) {
			$location.path('/lifehacks/' + articleId);
		};

	}]
);