var checkLoginStatus;

(function() {
	'use strict';

	var app = angular.module('weddingApp', ['ngRoute', 'ngAnimate', 'uiGmapgoogle-maps', 'ngclipboard']);

	app.controller("mainCtrl", mainCtrl);

	mainCtrl.$inject = ["$scope", "$rootScope", "$location", "$window", "$animate"];
	function mainCtrl($scope, $rootScope, $location, $window, $animate) {
		$rootScope.$on('$locationChangeStart', function() {
			$scope.page = $location.path();
		});
	}
})();
