var checkLoginStatus;

(function() {
	'use strict';

	var app = angular.module('weddingApp', ['ngRoute', 'ngAnimate', 'ngMessages']);

	app.controller("mainCtrl", mainCtrl);

	mainCtrl.$inject = ["$log", "$scope", "$rootScope", "$location", "$window"];
	function mainCtrl($log, $scope, $rootScope, $location, $window) {
		$rootScope.$on('$locationChangeStart', function() {
			$scope.page = $location.path();
		});
	}

	// scroll.$inject = ["$window", "$log"];
	// function scroll($window, $log) {
	// 	return {
	// 		restrict : "A",
	// 		link : function(scope, element) {
	// 			var offset = element[0].offsetTop;
	// 			angular.element($window).bind("scroll", function(event) {
	// 				if (this.pageYOffset > offset) {
	// 					element.addClass('sticky-top');
	// 					$('#story').css('margin-top', element[0].offsetHeight);
	// 				} else {
	// 					element.removeClass('sticky-top');
	// 					$('#story').css('margin-top', 0);
	// 				}
	// 			});
	// 		}
	// 	}
	// }
})();
