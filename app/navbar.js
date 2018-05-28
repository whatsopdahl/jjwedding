(function() {
	'use strict';

	var app = angular.module('weddingApp');

	app.directive('navbar', navbar);
	app.controller('navCtrl', navCtrl);

	navCtrl.$inject = ["$log", "$scope", "$rootScope", "$location"];
	function navCtrl($log, $scope, $rootScope, $location) {
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

		$(document).ready(function() {
			$(".button-collapse").sideNav({
				menuWidth: 300, // Default is 300
      	edge: 'right', // Choose the horizontal origin
      	closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      	draggable: true // Choose whether you can drag to open on touch screens
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
