'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute']);


app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/welcome.html',
			controller: 'HomeController',
			isLogin: true
		})
		.when('/howto', {
			templateUrl: 'views/howto.html',
			controller: 'HomeController',
			isLogin: true
		})
		.when('/lifehacks', {
			templateUrl: 'views/lifehacks.html',
			controller: 'HomeController',
			isLogin: true
		})
		.when('/share', {
			templateUrl: 'views/shareyourexperience.html',
			controller: 'HomeController',
			isLogin: true
		})
		.when('/contactus', {
			templateUrl: 'views/contactus.html',
			controller: 'HomeController',
			isLogin: true
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'HomeController',
			isLogin: true
		})
		
		// .otherwise({
		// 	redirectTo: '/'
		// });
}]);