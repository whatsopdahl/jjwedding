(function() {
	'user strict';

	var app = angular.module("weddingApp");

	app.directive("appFooter", appFooter);

	function appFooter() {
		return {
			restrict : "E",
			templateUrl : "app/templates/footer.html",
			controller : ["$scope", "$window",  function($scope, $window) {
				$scope.hovering = false;
				$(document).ready(function() {
					$("#whatsopdahl-logo").find("img").height($("#social-btns").height());
				});
				angular.element($window).bind('resize', function() {
					$("#whatsopdahl-logo").find("img").height($("#social-btns").height());
				});
			}]
		}
	}
})();