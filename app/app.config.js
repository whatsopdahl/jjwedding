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
		.when("/accommodations", {
			templateUrl : "app/templates/accommodations.html",
			controller: 'accommodationsCtrl'
		})
		.when("/gallery", {
			templateUrl : "app/templates/gallery.html",
			controller : "galleryCtrl"
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
