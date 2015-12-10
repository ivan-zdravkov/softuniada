'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute']);


app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/welcome.html',
			controller: 'AppController',
			isLogin: true
		})
		
		.otherwise({
			redirectTo: '/'
		});
}]);