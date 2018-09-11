const $ = require('jquery')

module.exports = /* @ngInject */ function galleryCtrl($scope, dataSrv) {
	$scope.imgUrls = dataSrv.getGalleryImages();
	$scope.showPhoto = function(url) {
		$scope.focusUrl = url;
		angular.element("#photo-modal").modal('show');
	}
	//init materialboxed
	$(document).ready(function(){
		$('.materialboxed').materialbox();
	});
}
