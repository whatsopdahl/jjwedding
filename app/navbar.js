(function() {
	'use strict';

	var app = angular.module('weddingApp');

	app.directive('navbar', navbar);
	app.controller('navCtrl', navCtrl);

	navCtrl.$inject = ["$log", "$scope", "$rootScope", "$location", "authSrv"];
	function navCtrl($log, $scope, $rootScope, $location, authSrv) {
		$rootScope.rsvping = false;

		$scope.isactive = function(page) {
			if ($rootScope.rsvping) {
				return false;
			} else if ($scope.page == page) {
				return true;
			}
		}

		$scope.rsvp = function() {
			$rootScope.rsvping = true;
			$("#rsvp-modal").modal('open');
		}
	}

	function navbar() {
		return {
			restrict: 'E',
			templateUrl: 'app/templates/navbar.html',
			controller : 'navCtrl'
		}
	}
})();
