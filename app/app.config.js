module.exports = function($routeProvider) {
	$routeProvider
	.when("/", {
		template : require("./templates/home.html"),
		controller: ['$scope', function($scope) {
			$scope.mainPicUrl = 'img/Tree_Left_1.jpg';
		}]
	})
	.when("/accommodations", {
		template : require("./templates/accommodations.html"),
		controller: 'accommodationsCtrl'
	})
	.when("/gallery", {
		template : require("./templates/gallery.html"),
		controller : "galleryCtrl"
	})
	.when("/venue", {
		template : require("./templates/venue.html"),
		controller : 'venueCtrl'
	})
	.when("/registry", {
		template : require("./templates/registry.html")
	})
	.otherwise({ redirectTo : "/"});
}
