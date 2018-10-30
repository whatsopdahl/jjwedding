const _ = require('lodash')
const $ = require('jquery')

module.exports = /* @ngInject */ function venueCtrl($scope, uiGmapGoogleMapApi) {
  let location = {
    latitude: 44.964165,
    longitude: -93.279701
  }
  $scope.address = '1900 LaSalle Ave, Minneapolis, MN 55403'
  $scope.rideShareAddress = '101 Groveland Ave S, Minneapolis, MN 55401'
  $scope.parkingAddress = '1920 Pillsbury Avenue South, Minneapolis, 55403'
  $scope.googleMap = {};
  $scope.vdMarker = {};
  $scope.directionsUrl = encodeURI("https://www.google.com/maps/dir/?api=1&destination="+$scope.parkingAddress+"&travelmode=driving")
  $scope.sideDriveDirectionsUrl = encodeURI("https://www.google.com/maps/dir/?api=1&destination="+$scope.rideShareAddress+"&travelmode=driving")
  $scope.loading = true;
  $scope.map = {
    center: location,
    zoom: 15
  };
  let infowindowContent = '<h6 class="title">Van Dusen Mansion</h6>'
    +'<p><a title="Parking" href="'+$scope.directionsUrl+'" target="_blank"><i class="material-icons">local_parking</i> '+$scope.parkingAddress+'</a></p>'
    +'<p><a title="Ride share" href="'+$scope.sideDriveDirections+'" target="_blank"><i class="material-icons">directions_car</i> '+$scope.rideShareAddress+'</a></p>';
  $scope.marker = {
    coords: _.cloneDeep(location),
    options: {
      title: 'Van Dusen Mansion'
    }
  }

  $scope.openInfoWindow = function() {
    $scope.infowindow.open($scope.googleMap.getGMap(), $scope.vdMarker.getGMarkers()[0]);
  }

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.loading = false;
    $scope.infowindow = new maps.InfoWindow({
      content: infowindowContent
    });
  });

  $scope.copied = function() {
    Materialize.toast($('<span>Address Copied <i class="material-icons success-text">check</i></span>'), 2500)
  }

  $(document).ready(function(){
    $('.parallax').parallax();
  });
}
