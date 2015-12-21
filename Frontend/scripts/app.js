'use strict';

var app = angular.module('app', [ 'ngRoute', 'textAngular', 'angularUtils.directives.dirPagination']);

app.constant('baseServiceUrl', 'XXXXXXXXXXX');

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/welcome.html',
			controller: 'HomeController',
			isLogin: true
		})
		.when('/howto', {
			templateUrl: 'views/howto.html',
			controller: 'HowToController',
			isLogin: true
		})
		.when('/article/:articleId', {
			templateUrl: 'views/article.html',
			controller: 'ArticleController',
			isLogin: true
		})
		.when('/share', {
			templateUrl: 'views/shareyourexperience.html',
			controller: 'ShareController',
			isLogin: true
		})
		.when('/contactus', {
			templateUrl: 'views/contactus.html',
			controller: 'ContactUsController',
			isLogin: true
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegisterController',
			isLogin: true
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController',
			isLogin: true
		})
		.otherwise({
			redirectTo: '/'
		});
}]);