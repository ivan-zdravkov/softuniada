'use strict';

app.factory('categoryService', ['authSettings', 'queryService',	function (authSettings, queryService) {

	var serviceBase = authSettings.baseUri;

	var _getAllCategories = function () {
		var resourceURL = serviceBase + '/api/Category/GetAllCategories';
        var promise = queryService.get(resourceURL, 'UTC');

        return promise;
	};

	var _createCategory = function (category) {
		var resourceURL = serviceBase + '/api/Category/CreateCategory';
        var promise = queryService.post(resourceURL, 'UTC');

        return promise;
	};

	var _updateCategory = function (category) {
		var resourceURL = serviceBase + '/api/Category/UpdateCategory';
        var promise = queryService.put(resourceURL, category, 'UTC');

        return promise;
	};

	var _deleteCategory = function () {
		var resourceURL = serviceBase + '/api/Category/DeleteCategory';
        var promise = queryService.delete(resourceURL, 'UTC');

        return promise;
	};

	return {
		getAllCategories: _getAllCategories,
		createCategory: _createCategory,
		updateCategory: _updateCategory,
		deleteCategory: _deleteCategory
	};
}]);