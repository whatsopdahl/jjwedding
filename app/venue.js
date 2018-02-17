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
    $scope.googleMap = {};
    $scope.vdMarker = {};
    $scope.directionsUrl = encodeURI("https://www.google.com/maps/dir/?api=1&destination=1900 Lasalle Ave, Minneapolis, MN 55403&destination_place_id=ChIJmULEiccys1IRfE_IHJuyqpw&travelmode=driving")
    $scope.loading = true;
    $scope.map = {
      center: { latitude: 44.9658529, longitude: -93.2768952},
      zoom: 15
    };
    let infowindowContent = '<h6 class="title">Van Dusen Mansion</h6>'
      +'<p><a ng-href="'+$scope.directionsUrl+'" target="_blank"><i class="material-icons">place</i> 1900 Lasalle Ave, Minneapolis, MN 55403</a></p>'
      +'<p><a href="http://thevandusenmansion.com"><i class="material-icons">public</i> thevandusenmansion.com</a></p>';
    $scope.marker = {
      coords: { latitude: 44.9658529, longitude: -93.2768952},
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

    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }
})();
