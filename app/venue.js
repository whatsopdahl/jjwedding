(function() {
  'use strict';

  let app = angular.module('weddingApp');

  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBFA-ENDYT03G2enOrJQ3-ka0GpkmLKuus',
        v: '3', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });

  app.controller('venueCtrl', venueCtrl);

  venueCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi'];
  function venueCtrl($scope, uiGmapGoogleMapApi) {
    let location = {
      latitude: 44.964165,
      longitude: -93.279701
    }
    const uberClientId = 'ihZk3Y3T-KIKzAe1yebVcSFFrU0Me5pK'
    $scope.address = '1900 LaSalle Ave, Minneapolis, MN 55403'
    $scope.rideShareAddress = '101 Groveland Ave S, Minneapolis, MN 55401'
    $scope.parkingAddress = ''
    $scope.googleMap = {};
    $scope.vdMarker = {};
    $scope.directionsUrl = encodeURI("https://www.google.com/maps/dir/?api=1&destination="+$scope.address+"&destination_place_id=ChIJmULEiccys1IRfE_IHJuyqpw&travelmode=driving")
    $scope.sideDriveDirectionsUrl = encodeURI("https://www.google.com/maps/dir/?api=1&destination="+$scope.rideShareAddress+"&travelmode=driving")
    $scope.uberUrl = encodeURI("https://m.uber.com/ul/?clientID="+uberClientId+"&action=setPickup&destination[formatted_address]="+$scope.rideShareAddress+"&dropoff[nickname]=Van Dusen Mansion")
    $scope.loading = true;
    $scope.map = {
      center: location,
      zoom: 15
    };
    let infowindowContent = '<h6 class="title">Van Dusen Mansion</h6>'
      +'<p><a title="Parking" href="'+$scope.directionsUrl+'" target="_blank"><i class="material-icons">local_parking</i> 1900 Lasalle Ave, Minneapolis, MN 55403</a></p>'
      +'<p><a title="Ride share" href="'+$scope.uberUrl+'" target="_blank"><i class="material-icons">directions_car</i> 101 Groveland Ave S, Minneapolis, MN 55403</a></p>';
    $scope.marker = {
      coords: location,
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
})();
