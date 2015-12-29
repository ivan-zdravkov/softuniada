'use strict';

app.controller('CategoryController', 
	['$scope', 'categoryService', 'notyService', function ($scope, categoryService, notyService) {
		$scope.isDataLoading = false;
		$scope.categories = [];
		$scope.newCategory = {};
		$scope.invalidCategoryName = false;

		// $scope.isDataLoading = true;
		// categoryService.getAllCategories().then(function (response) {
		// 	$scope.categories = response;
		// 	$scope.isDataLoading = false;
		// });

		$scope.createCategory = function () {
			if ($scope.newCategory.name && $scope.newCategory.name.length > 1) {
				$scope.isDataLoading = true;
				categoryService.createCategory($scope.newCategory).then(function (categoryId) {
					$scope.categories.push({
						id: categoryId,
						name: $scope.newCategory.name
					});

					$scope.newCategory.name = '';

					notyService.successMessage('Category successfully created.');
					$scope.isDataLoading = false;
				});
			} else {
				$scope.invalidCategoryName = true;
			}
		};

		$scope.updateCategory = function (categoryId) {
			var categoryForUpdate = _.find($scope.categories, { id: categoryId });

			if (categoryForUpdate && categoryForUpdate.name && categoryForUpdate.name.length > 1) {
				$scope.isDataLoading = true;
				categoryService.createCategory($scope.newCategory).then(function () {
					notyService.successMessage('Category successfully updated.');
					$scope.isDataLoading = false;
				});
			} else {
				$scope.invalidCategoryName = true;
			}
		};

		$scope.deleteCategory = function (categoryId) {
			var categoryForDelete = _.find($scope.categories, { id: categoryId });

			if (categoryForDelete) {
				$scope.isDataLoading = true;
				categoryService.createCategory($scope.newCategory).then(function () {
					$scope.categories = $scope.categories.filter(function (category) {
						return category.id !== categoryId;
					});

					notyService.successMessage('Category successfully deleted.');
					$scope.isDataLoading = false;
				});
			} else {
				notyService.successMessage('Category not found.');
			}
		};

		// ---------------------------------------------------------------------------------------------------------------------------------------
		// Dummy objects
		$scope.categories = [
			{ id: 1, name: 'Cloth Wasing' },
			{ id: 2, name: 'Ironing' },
			{ id: 3, name: 'Cleaning' },
			{ id: 4, name: 'Sport' },
			{ id: 5, name: 'Life Hacks' },
			{ id: 6, name: 'Cooking' },
			{ id: 7, name: 'Others' }
		];
		// ---------------------------------------------------------------------------------------------------------------------------------------
	}]
);