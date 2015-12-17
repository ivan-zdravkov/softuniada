'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'textAngular']);


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
		.when('/lifehacks', {
			templateUrl: 'views/lifehacks.html',
			controller: 'LifeHacksController',
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