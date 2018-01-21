(function() {
	'use strict';

	var app = angular.module('weddingApp');

	app.directive('navbar', navbar);
	app.controller('navCtrl', navCtrl);

	navCtrl.$inject = ["$log", "$scope", "$rootScope", "$location", "$timeout", "authSrv"];
	function navCtrl($log, $scope, $rootScope, $location, $timeout, authSrv) {
		$scope.login = function() {
			if ( !($scope.user) ) {
				$('#login-modal').modal('open');
			}
		}
		
		$scope.logout = authSrv.fbLogout;
		
		$(document).ready(function() {
			$(".dropdown-button").dropdown({ 
			    belowOrigin: true, 
			    alignment: 'left', 
			    inDuration: 200,
			    outDuration: 150,
			    constrain_width: true,
			    hover: true, 
			    gutter: 1
			});
			$(".button-collapse").sideNav({
				edge: 'right', // Choose the horizontal origin
    			closeOnClick: true
			});
		});
	}

	function navbar() {
		return {
			restrict: 'E',
			templateUrl: 'app/templates/navbar.html',
			controller : 'navCtrl'
		}
	}
})();