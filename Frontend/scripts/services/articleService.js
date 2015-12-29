'use strict';

app.factory('articleService', ['$http', '$q', 'authSettings', 'authenticationService', 'queryService',
	function ($http, $q, authSettings, authenticationService, queryService) {

		var serviceBase = authSettings.baseUri;

		var _getAllArticles = function () {
			var resourceURL = serviceBase + '/api/article/GetAllArticles';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		var _getArticleById = function (articleId) {
			var resourceURL = serviceBase + '/api/article/GetArticleById/' + articleId;
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		var _createArticle = function (article) {
			var resourceURL = serviceBase + '/api/article/CreateArticle';
	        var promise = queryService.post(resourceURL, article, 'UTC');

	        return promise;
		};

		var _updateArticle = function (article) {
			var resourceURL = serviceBase + '/api/article/UpdateArticle';
	        var promise = queryService.put(resourceURL, article, 'UTC');

	        return promise;
		};

		var _changeArticleStatus = function (article) {
			var resourceURL = serviceBase + '/api/article/ChangeArticleStatus';
	        var promise = queryService.put(resourceURL, 'UTC');

	        return promise;
		};

		var _deleteArticle = function (articleId) {
			var resourceURL = serviceBase + '/api/article/DeleteArticle/' + articleId;
	        var promise = queryService.delete(resourceURL, 'UTC');

	        return promise;
		};

		var _getAllStatuses = function () {
			var resourceURL = serviceBase + '/api/article/GetAllStatuses';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		var _getAllCategories = function () {
			var resourceURL = serviceBase + '/api/article/GetAllCategories';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		return {
			getAllArticles: _getAllArticles,
			getArticleById: _getArticleById,
			createArticle: _createArticle,
			updateArticle: _updateArticle,
			changeArticleStatus: _changeArticleStatus,
			deleteArticle: _deleteArticle,
			getAllStatuses: _getAllStatuses,
			getAllCategories: _getAllCategories
		};
	}
]);