'use strict';

app.controller('ArticleController', 
	['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
		$('html,body').scrollTop(0);
		$scope.isEditMode = $routeParams.action === 'edit';
		$scope.isCreateMode = $routeParams.action === 'create';
		$scope.isReadMode = $routeParams.action === 'read';
		$scope.articleId = $routeParams.articleId;
		$scope.articleNotFound = false;

		if ($scope.isCreateMode) {
			$scope.article = {
				id: 0,
				title: '',
				imageURL: '',
				content: ''
			};
		}

		$scope.articles = [];
		$scope.isDataLoading = false;

		$scope.invalidTitle = false;
		$scope.invalidContent = false;

		$scope.articleNotFound = false;
		$scope.errorMessage = 'The article you are looking for does not exist.';

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

		$scope.articles.push({
			id: 1,
			title: 'How to build a real lightsaber',
			createdDate: new Date(),
			imageURL: 'http://vignette2.wikia.nocookie.net/swtor/images/9/91/Sentinel.png/revision/latest?cb=20110920182845',
			content: '<p>In this article, you will learn how to:</p><ul><li>be a Jedi</li><li>build a lightsaber</li><li>become master Jedi</li><li>rule the galaxy</li></ul><p><br/></p><p>Here we go:</p><p><img class="ta-insert-video" src="https://img.youtube.com/vi/sGbxmsDFVnE/hqdefault.jpg" ta-insert-video="https://www.youtube.com/embed/sGbxmsDFVnE" contenteditable="false" allowfullscreen="true" frameborder="0" style="height: 431px;width: 651px;"/><br/></p>'
		});
		$scope.articles.push({
			id: 2,
			title: 'How to become a Jedi',
			createdDate: new Date(),
			imageURL: 'http://addicted2success.com/wp-content/uploads/2014/08/jedi-knight-mentorship-for-success-in-business.jpg',
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		});
		$scope.articles.push({
			id: 4,
			title: 'How to become a Jedi Master',
			createdDate: new Date(),
			imageURL: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/5/4/1336122992437/Jedi-Master-Yoda-in-a-sce-006.jpg',
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		});
		$scope.articles.push({
			id: 3,
			title: 'How to become a Sith Lord',
			createdDate: new Date(),
			imageURL: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		})

		if ($scope.articleId) {
			$scope.articleId = +$scope.articleId;
			$scope.article = _.find($scope.articles, { id: $scope.articleId });

			if (!$scope.article) {
				$scope.articleNotFound = true;
			}

			if ($scope.isEditMode) {

			} else {

			}
		}

		$scope.save = function () {
			$scope.article.content = $scope.article.content
			.replace(/color: rgb\(.{0,13}\);|float: none;|background-color: rgb\(.{0,13}\);/gi, '')
			.replace(/ style=""/gi, '');

			if ($scope.isEditMode) {

			} else if ($scope.isCreateMode) {

			}
		};

		$scope.redirectToHowToPage = function () {
			$location.path('/howto');
		};

		$scope.previewArticle = function () {
			$scope.isPreview = !$scope.isPreview;
		};


	}]
);