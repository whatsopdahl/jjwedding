(function() {
	'use strict';

	var app = angular.module("weddingApp");

	app.factory("dataSrv", dataSrv);

	app.constant("GALLERY_URL", "http://localhost:8000/");

	dataSrv.$inject = ["$http", "GALLERY_URL"];
	function dataSrv($http, GALLERY_URL) {
		return {
			getGalleryImages 		: getGalleryImages,
			isInvited				: isInvited,
			getInviteeByUser		: getInviteeByUser,
			hasRSVPed				: hasRSVPed
		}

		function getGalleryImages() {
			return [{"url": GALLERY_URL+"img/ring_icon.png", 
					 "caption" : "The icon for the website"},
					{"url": GALLERY_URL+"img/mainPic.jpg",
					 "caption": "A pic from thanksgiving"}];
			return $http.get(GALLERY_URL).then(function(response) {
				return response.data;
			});
		}

		function isInvited(name) {
			return true;
			return $http.get(URL).then(function(response) {
				return response.data;
			});
		}

		function getInviteeByUser(user) {
			return {"first_name" : "Jim Bob",
					"last_name"  : "Cooter",
					"email"      : "JBCooter@pornhub.gov",
					"party"		 : 2};
		}

		function getInviteeById(id) {
			return getInviteebyUser();
		}

		function hasRSVPed(user) {
			return false
		}
	}
})();