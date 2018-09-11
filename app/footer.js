const $ = require('jquery')

module.exports = /* @ngInject */ function appFooter() {
	return {
		restrict : "E",
		template : require('./templates/footer.html'),
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
