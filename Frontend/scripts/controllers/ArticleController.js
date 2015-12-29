'use strict';

app.controller('ArticleController', 
	['$scope', '$q', '$routeParams', '$location', 'articleService', 'categoryService', 'notyService', 
		function ($scope, $q, $routeParams, $location, articleService, categoryService, notyService) {

			$('html,body').scrollTop(0);
			$scope.isDataLoading = false;
			$scope.isEditMode = $routeParams.action === 'edit';
			$scope.isCreateMode = $routeParams.action === 'create';
			$scope.isReadMode = $routeParams.action === 'read';
			$scope.articleId = $routeParams.articleId;
			$scope.articleNotFound = false;
			$scope.statuses = [];
			$scope.categories = [];
			$scope.articles = [];
			$scope.isDataLoading = false;
			$scope.invalidTitle = false;
			$scope.invalidContent = false;
			$scope.invalidStatus = false;
			$scope.invalidCategory = false;
			$scope.articleNotFound = false;
			$scope.errorMessage = 'The article you are looking for does not exist.';
			$scope.selectedStatus = {};
			$scope.selectedCategory = {};

			if ($scope.isCreateMode) {
				$scope.article = {
					id: 0,
					title: '',
					image: '',
					content: ''
				};
			}

			var requestQueue = [];
			$scope.isDataLoading = true;
			if (($scope.isEditMode || $scope.isReadMode) && !isNaN($scope.articleId) && $scope.articleId > 0) {
				requestQueue.push(articleService.getArticleById($scope.articleId).then(function (response) {
					// $scope.article = response;
				}));
			}

			if ($scope.isCreateMode || $scope.isEditMode) {
				requestQueue.push(articleService.getAllStatuses().then(function (response) {
					// $scope.statuses = response;
				}));
			}

			requestQueue.push(categoryService.getAllCategories().then(function (response) {
				// $scope.categories = response;
			}));

			$q.all(requestQueue).then(function () {
				if ($scope.article) {
					if ($scope.isEditMode || $scope.isReadMode) {
						$scope.selectedCategory = _.find($scope.categories, { id: $scope.article.categoryId });
					}

					if ($scope.isEditMode) {
						$scope.selectedStatus = _.find($scope.statuses, { id: $scope.article.statusId });
					}
				}
				
				$scope.isDataLoading = false;
			});

			$scope.titleChange = function () {
				if ($scope.invalidTitle && $scope.article.title && $scope.article.title.length >= 1) {
					$scope.invalidTitle = false;
				}
			};

			$scope.contentChange = function () {
				if ($scope.invalidContent && $scope.article.content && $scope.article.content.length >= 1) {
					$scope.invalidContent = false;
				}
			};

			$scope.statusChange = function () {
				if ($scope.invalidStatus && $scope.selectedStatus.id) {
					$scope.invalidStatus = false;
				}
			};

			$scope.categoryChange = function () {
				if ($scope.invalidCategory && $scope.selectedCategory.id) {
					$scope.invalidCategory = false;
				}
			};

			$scope.selectStatus = function (status) {
				$scope.selectedStatus = status;
				$scope.article.statusId = status.id;
				$scope.statusChange();

				if ($scope.isEditMode) {
					var articleStatusObj = {
						articleId: $scope.article.id,
						statusId: status.id
					};

					$scope.isDataLoading = true;
					articleService.changeArticleStatus(articleStatusObj).then(function (response) {
						notyService.successMessage('Article status successfully updated.');
						$scope.isDataLoading = false;
					});
				}
			};

			$scope.selectCategory = function (category) {
				$scope.selectedCategory = category;
				$scope.article.categoryId = category.id;
				$scope.categoryChange();
			};

			$scope.save = function () {
				if (!$scope.article.title || $scope.article.title.length < 1) {
					$scope.invalidTitle = true;
				} else {
					$scope.invalidTitle = false;
				}

				if (!$scope.article.content || $scope.article.content.length < 1) {
					$scope.invalidContent = true;
				} else {
					$scope.invalidContent = false;
				}

				if (!$scope.selectedStatus.id) {
					$scope.invalidStatus = true;
				} else {
					$scope.invalidStatus = false;
				}

				if (!$scope.selectedCategory.id) {
					$scope.invalidCategory = true;
				} else {
					$scope.invalidCategory = false;
				}

				if (!$scope.invalidTitle && !$scope.invalidContent && !$scope.invalidStatus && !$scope.invalidCategory) {
					$scope.article.content = $scope.article.content
					.replace(/color: rgb\(.{0,13}\);|float: none;|background-color: rgb\(.{0,13}\);/gi, '')
					.replace(/ style=""/gi, '');

					if ($scope.isEditMode && $scope.article.id > 0) {
						$scope.isDataLoading = true;
						articleService.updateArticle($scope.article).then(function (response) {
							notyService.successMessage('Article successfully updated.');
							$scope.isDataLoading = false;
							$scope.redirectToHowToPage();
						});
					} else if ($scope.isCreateMode && $scope.article.id === 0) {
						$scope.isDataLoading = true;
						articleService.createArticle($scope.article).then(function (response) {
							notyService.successMessage('Article successfully created.');
							$scope.isDataLoading = false;
							$scope.redirectToHowToPage();
						});
					}
				}
			};

			$scope.redirectToHowToPage = function () {
				$location.path('/howto');
			};

			$scope.previewArticle = function () {
				$scope.isPreview = !$scope.isPreview;
			};

			$scope.delete = function () {
				$scope.isDataLoading = true;
				articleService.deleteArticle($scope.article.id).then(function (response) {
					notyService.successMessage('Article successfully deleted.');
					$scope.isDataLoading = false;
					$scope.redirectToHowToPage();
				});
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

			$scope.articles.push({
				id: 1,
				title: 'How to build a real lightsaber',
				statusId: 2,
				categoryId: 1,
				createdDate: new Date(),
				image: 'http://vignette2.wikia.nocookie.net/swtor/images/9/91/Sentinel.png/revision/latest?cb=20110920182845',
				content: '<p>In this article, you will learn how to:</p><ul><li>be a Jedi</li><li>build a lightsaber</li><li>become master Jedi</li><li>rule the galaxy</li></ul><p><br/></p><p>Here we go:</p><p><img class="ta-insert-video" src="https://img.youtube.com/vi/sGbxmsDFVnE/hqdefault.jpg" ta-insert-video="https://www.youtube.com/embed/sGbxmsDFVnE" contenteditable="false" allowfullscreen="true" frameborder="0" style="height: 431px;width: 651px;"/><br/></p>'
			});

			$scope.articles.push({
				id: 8,
				title: 'How to build a real lightsaber',
				statusId: 3,
				categoryId: 3,
				createdDate: new Date(),
				image: 'http://vignette2.wikia.nocookie.net/swtor/images/9/91/Sentinel.png/revision/latest?cb=20110920182845',
				content: '<p>In this article, you will learn how to:</p><ul><li>be a Jedi</li><li>build a lightsaber</li><li>become master Jedi</li><li>rule the galaxy</li></ul><p><br/></p><p>Here we go:</p><p><img class="ta-insert-video" src="https://img.youtube.com/vi/sGbxmsDFVnE/hqdefault.jpg" ta-insert-video="https://www.youtube.com/embed/sGbxmsDFVnE" contenteditable="false" allowfullscreen="true" frameborder="0" style="height: 431px;width: 651px;"/><br/></p>'
			});

			$scope.articles.push({
				id: 2,
				title: 'How to become a Jedi',
				statusId: 1,
				categoryId: 2,
				createdDate: new Date(),
				image: 'http://addicted2success.com/wp-content/uploads/2014/08/jedi-knight-mentorship-for-success-in-business.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articles.push({
				id: 2,
				title: 'How to become a Jedi',
				statusId: 1,
				categoryId: 2,
				createdDate: new Date(),
				image: 'http://addicted2success.com/wp-content/uploads/2014/08/jedi-knight-mentorship-for-success-in-business.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articles.push({
				id: 3,
				title: 'How to become a Sith Lord',
				statusId: 1,
				categoryId: 4,
				createdDate: new Date(),
				image: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articles.push({
				id: 4,
				title: 'How to become a Jedi Master',
				statusId: 1,
				categoryId: 6,
				createdDate: new Date(),
				image: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/5/4/1336122992437/Jedi-Master-Yoda-in-a-sce-006.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articles.push({
				id: 5,
				title: 'How to become a Sith Lord',
				statusId: 2,
				categoryId: 7,
				createdDate: new Date(),
				image: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/04/1-JJKathy-NO-LOGO.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

			$scope.articles.push({
				id: 6,
				title: 'How to become a Jedi Master',
				statusId: 3,
				categoryId: 2,
				createdDate: new Date(),
				image: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/5/4/1336122992437/Jedi-Master-Yoda-in-a-sce-006.jpg',
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});

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
			// ---------------------------------------------------------------------------------------------------------------------------------------
		}
	]
);