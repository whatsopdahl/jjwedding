(function(){
	'use strict';

	var app = angular.module("weddingApp");

	app.config(["$routeProvider", function($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl : "app/templates/home.html"
		})
		.when("/RSVP", {
			templateUrl : "app/templates/RSVP.html",
			controller : 'rsvpCtrl'
		})
		.when("/accomodations", {
			templateUrl : "app/templates/accomodations.html"
		})
		.when("/gallery", {
			templateUrl : "app/templates/gallery.html",
			controller : "galleryCtrl"
		})
		.when("/weddingparty", {
			templateUrl : "app/templates/weddingparty.html"
		})
		.when("/venue", {
			templateUrl : "app/templates/venue.html",
			controller : 'venueCtrl'
		})
		.when("/registry", {
			templateUrl : "app/templates/registry.html"
		})
		.otherwise({ redirectTo : "/"});
	}]);
})();
