'use strict';

var app = angular.module('app', ['ngRoute', 'textAngular', 'angularUtils.directives.dirPagination']);

app.constant('authSettings', {
	// baseUri: 'http://95.158.165.1',
	baseUri: "http://localhost:13447"
});

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/welcome.html',
			controller: 'HomeController'
		})
		.when('/howto', {
			templateUrl: 'views/howto.html',
			controller: 'HowToController'
		})
		.when('/article/:action', {
			templateUrl: 'views/article.html',
			controller: 'ArticleController',
			isLogin: true
		})
		.when('/article/:action/:articleId', {
			templateUrl: 'views/article.html',
			controller: 'ArticleController'
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
			controller: 'RegisterController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/users', {
			templateUrl: 'views/user.html',
			controller: 'UserController',
			isLogin: true
		})
		.when('/404', {
			templateUrl: 'views/notFound.html',
		})
		.otherwise({
		    redirectTo: '/404'
		});
}]);