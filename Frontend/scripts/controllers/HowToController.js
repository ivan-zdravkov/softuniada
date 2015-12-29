'use strict';

app.controller('HowToController', 
	['$scope', '$q', '$location', 'authenticationService', 'articleService', 'categoryService', 
		function ($scope, $q, $location, authenticationService, articleService, categoryService) {
			$scope.isDataLoading = false;
			$scope.isAdmin = authenticationService.isAdmin();
			$scope.articlesArray = [];

			var requestQueue = [];
			$scope.isDataLoading = true;
			requestQueue.push(articleService.getAllArticles().then(function (response) {
				// $scope.articlesArray = response;
				// $scope.showAllArticles();
			}));

			requestQueue.push(articleService.getAllStatuses().then(function (response) {
				// $scope.statuses = response;
			}));

			requestQueue.push(categoryService.getAllCategories().then(function (response) {
				// $scope.categories = response;
			}));

			$q.all(requestQueue).then(function () {
				$scope.isDataLoading = false;
			});

			$scope.showAllArticles = function () {
				$scope.articles = $scope.articles = $scope.articlesArray.filter(function (article) {
					return article.statusId === 1;
				});
			};
			
			$scope.showCategoryArticles = function (categoryId) {
				$scope.articles = $scope.articlesArray.filter(function (article) {
					return article.categoryId === categoryId && article.statusId === 1;
				});
			};

			$scope.showStatusArticles = function (statusId) {
				$scope.articles = $scope.articlesArray.filter(function (article) {
					return article.statusId === statusId;
				});
			};

			$scope.redirectToArticle = function (articleId) {
				$location.path('/article/read/' + articleId);
			};

			$scope.editArticle = function (articleId) {
				$location.path('/article/edit/' + articleId);
			};

			// ---------------------------------------------------------------------------------------------------------------------------------------
			// Dummy objects
			$scope.statuses = [
				{ id: 1, name: 'Aproved' },
				{ id: 2, name: 'Pending' },
				{ id: 3, name: 'Deleted' }
			];

			$scope.categories = [
				{ id: 1, name: 'Cloth Wasing' },
				{ id: 2, name: 'Ironing' },
				{ id: 3, name: 'Cleaning' },
				{ id: 4, name: 'Sport' },
				{ id: 5, name: 'Life Hacks' },
				{ id: 6, name: 'Cooking' },
				{ id: 7, name: 'Others' }
			];

			if ($scope.isReadMode) {
				$scope.selectedCategory = $scope.categories[2];
			}

			$scope.articlesArray.push({
				id: 1,
				title: 'How to build a real lightsaber',
				statusId: 2,
				categoryId: 1,
				createdDate: new Date(),
				image: 'http://vignette2.wikia.nocookie.net/swtor/images/9/91/Sentinel.png/revision/latest?cb=20110920182845',
				content: '<p>In this article, you will learn how to:</p><ul><li>be a Jedi</li><li>build a lightsaber</li><li>become master Jedi</li><li>rule the galaxy</li></ul><p><br/></p><p>Here we go:</p><p><img class="ta-insert-video" src="https://img.youtube.com/vi/sGbxmsDFVnE/hqdefault.jpg" ta-insert-video="https://www.youtube.com/embed/sGbxmsDFVnE" contenteditable="false" allowfullscreen="true" frameborder="0" style="height: 431px;width: 651px;"/><br/></p>'
			});

			$scope.articlesArray.push({
				id: 8,
				title: 'How to build a real lightsaber',
				statusId: 3,
				categoryId: 3,
				createdDate: new Date(),
				image: 'http://vignette2.wikia.nocookie.net/swtor/images/9/91/Sentinel.png/revision/latest?cb=20110920182845',
				content: '<p>In this article, you will learn how to:</p><ul><li>be a Jedi</li><li>build a lightsaber</li><li>become master Jedi</li><li>rule the galaxy</li></ul><p><br/></p><p>Here we go:</p><p><img class="ta-insert-video" src="https://img.youtube.com/vi/sGbxmsDFVnE/hqdefault.jpg" ta-insert-video="https://www.youtube.com/embed/sGbxmsDFVnE" contenteditable="false" allowfullscreen="true" frameborder="0" style="height: 431px;width: 651px;"/><br/></p>'
			});

			$scope.articlesArray.push({
				id: 2,
				title: 'How to become a Jedi',
				statusId: 1,
				categoryId: 2,
				createdDate: new Date(),
				image: 'http://addicted2success.com/wp-content/uploads/2014/08/jedi-knight-mentorship-for-success-in-business.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articlesArray.push({
				id: 2,
				title: 'How to become a Jedi',
				statusId: 1,
				categoryId: 2,
				createdDate: new Date(),
				image: 'http://addicted2success.com/wp-content/uploads/2014/08/jedi-knight-mentorship-for-success-in-business.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articlesArray.push({
				id: 3,
				title: 'How to become a Sith Lord',
				statusId: 1,
				categoryId: 4,
				createdDate: new Date(),
				image: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articlesArray.push({
				id: 4,
				title: 'How to become a Jedi Master',
				statusId: 1,
				categoryId: 6,
				createdDate: new Date(),
				image: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/5/4/1336122992437/Jedi-Master-Yoda-in-a-sce-006.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articlesArray.push({
				id: 5,
				title: 'How to become a Sith Lord',
				statusId: 2,
				categoryId: 7,
				createdDate: new Date(),
				image: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articlesArray.push({
				id: 6,
				title: 'How to become a Jedi Master',
				statusId: 3,
				categoryId: 2,
				createdDate: new Date(),
				image: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/5/4/1336122992437/Jedi-Master-Yoda-in-a-sce-006.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});
			$scope.showAllArticles();
			// ---------------------------------------------------------------------------------------------------------------------------------------
		}
	]
);