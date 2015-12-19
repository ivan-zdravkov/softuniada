'use strict';

app.controller('ArticleController', 
	['$scope', '$routeParams', function ($scope, $routeParams) {
		$scope.articleId = $routeParams.articleId;
		$scope.articles = [];
		$scope.isDataLoading = true;

		setTimeout(function () {
			$scope.isDataLoading = false;
			$scope.$apply();
		}, 5000);

		$scope.articles.push({
			id: 1,
			title: 'How to build a real lightsaber',
			createdDate: new Date(),
			imageURL: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
			content: '<p>In this article, you will learn how to:</p><ul><li>be a Jedi</li><li>build a lightsaber</li><li>become master Jedi</li><li>rule the galaxy</li></ul><p><br/></p><p>Here we go:</p><p><img class="ta-insert-video" src="https://img.youtube.com/vi/sGbxmsDFVnE/hqdefault.jpg" ta-insert-video="https://www.youtube.com/embed/sGbxmsDFVnE" contenteditable="false" allowfullscreen="true" frameborder="0" style="height: 431px;width: 651px;"/><br/></p>'
		});

		$scope.articles.push({
			id: 2,
			title: 'How to be a Jedi',
			createdDate: new Date(),
			imageURL: 'http://4.bp.blogspot.com/-nz7e22sTknU/Vk14ra3xlqI/AAAAAAAAMlE/e2-Fp3N_atA/s1600/sergbvcj4.jpg',
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		});

		if ($scope.articleId) {
			$scope.articleId = parseInt($scope.articleId);
			$scope.selectedArticle = _.find($scope.articles, { id: $scope.articleId });
			if (!$scope.selectedArticle) {
				$scope.selectedArticle = {
					content: 'The article you are looking for does not exist.'
				}
			}
		}
	}]
);