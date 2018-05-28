(function() {
	'use strict';

	var app = angular.module("weddingApp");

	app.factory("dataSrv", dataSrv);

	dataSrv.$inject = ["$http"];
	function dataSrv($http) {
		return {
			getGalleryImages 		: getGalleryImages,
			isInvited				: isInvited,
			getInviteeByUser		: getInviteeByUser,
			hasRSVPed				: hasRSVPed
		}

		function getGalleryImages() {
			let urls = [
				"img/Bridge_2.jpg", 
				"img/Lake_1_BW.jpg",
				"img/Lake_2.jpg",
				"img/thanksgiving.jpg",
				"img/Lake_3_BW.jpg",
				"img/Lake_Laughing_BW.jpg",
				"img/Ring_Progression_1.jpg",
				"img/Ring_Progression_2.jpg",
				"img/Ring_Progression_3.jpg",
				"img/Ring_Progression_5.jpg",
				"img/Standing_Focused.jpg",
				"img/Tree_Left_1.jpg",
				"img/Tree_Left_2.jpg",
				"img/Woods_Crossed_Arm_Hug.jpg",
				"img/Woods_Forward_Facing.jpg",
			]

			let imgObjs = []
			urls.forEach(url => {
				let caption = 'Photo by Ally Fillmore'
				if (url === 'img/thanksgiving.jpg') {
					caption = 'Photo by Jim Dengler'
				}
				imgObjs.push({
					url: url,
					caption: caption
				})
			})

			return imgObjs
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