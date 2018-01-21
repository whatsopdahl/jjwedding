var checkLoginStatus;

(function() {
	'use strict';

	var app = angular.module('weddingApp', ['ngRoute']);

	app.controller("mainCtrl", mainCtrl);
	app.directive("scroll", scroll);

	app.run(["$rootScope", "$window", "authSrv", function($rootScope, $window, authSrv){
		/**
		 *  Facebook Auth Initialized
		 */
		checkLoginStatus = function() {
			authSrv.checkLoginStatus();
		}

		$window.fbAsyncInit = function() {
		  	FB.init({
		  		/* Facebook App Id */
		    	appId      : '1309173769148582',
		    	/* Channel file to help increase cross domain communication
		    	 * for certain browsers */
		    	channelUrl : 'app/templates/channel.html',
		    	status	   : true,
		    	cookie     : true,
		    	xfbml      : true,
		    	version    : 'v2.8'
		  	});
		  	authSrv.checkLoginStatus();
		};

		(function(d) {
			// load facebook js sdk
			var id = "facebook-jssdk";
		  	var js, fjs = d.getElementsByTagName('script')[0];
		  	if (d.getElementById(id)) return;
		  	js = d.createElement('script'); js.id = id;
		  	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1309173769148582";
		  	fjs.parentNode.insertBefore(js, fjs);
		}(document));
	}]);

	mainCtrl.$inject = ["$log", "$scope", "$rootScope", "$location", "$window"];
	function mainCtrl($log, $scope, $rootScope, $location, $window) {
		$rootScope.$on('$locationChangeStart', function() {
			$scope.page = $location.path();
		});

		$rootScope.$watch(function() {
			$scope.user = $rootScope.user;
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
