module.exports = /* @ngInject */ function dataSrv($http) {
	return {
		getGalleryImages 		: getGalleryImages,
		getParty				: getParty,
		saveRsvp				: saveRsvp,
		getDietOptions			: getDietOptions
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

	function getParty(id) {
		return $http.post('/rsvp/getPartyData',{partyKey: id})
			.then(response => {
				return response.data
			})
	}

	function saveRsvp(data) {
		return $http.post('/rsvp/saveRsvp', {partyData: data})
			.then(response => {
				return response.data
			})
	}

	function getDietOptions() {
		return $http.get('/rsvp/getDietOptions')
			.then(response => {
				return response.data
			})
	}
}