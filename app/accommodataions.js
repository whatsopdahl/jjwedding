(function() {
  'use strict';

  let app = angular.module('weddingApp');

  app.controller('accommodationsCtrl', accommodationsCtrl);

  accommodationsCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi'];
  function accommodationsCtrl($scope, uiGmapGoogleMapApi) {
    $scope.googleMap = {};
    $scope.vdMarker = {};
    $scope.directionsUrl = encodeURI("https://www.google.com/maps/dir/?api=1&destination=19 N 8th St, Minneapolis, MN 55403&destination_place_id=ChIJbcBa6JMys1IRf6FB7PDDTG4&travelmode=driving")
    $scope.loading = true;
    $scope.map = {
      center: { latitude: 44.9776616, longitude: -93.27698269999996},
      zoom: 15
    };
    let infowindowContent = '<h6 class="title">Hampton Inn & Suites</h6>'
      +'<p><a href="'+$scope.directionsUrl+'" target="_blank"><i class="material-icons">place</i> 19 N 8th St, Minneapolis, MN 55403</a></p>'
      +'<p><a target="_blank" href="http://hamptoninn3.hilton.com/en/hotels/minnesota/hampton-inn-and-suites-minneapolis-downtown-MSPMDHX/index.html"><i class="material-icons">public</i> hamptoninn3.hilton.com</a></p>';
    $scope.marker = {
      coords: $scope.map.center,
      options: {
        title: 'Hilton Inn & Suites'
      }
    }

    $scope.openInfoWindow = function() {
      $scope.infowindow.open($scope.googleMap.getGMap(), $scope.vdMarker.getGMarkers()[0]);
    }

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.loading = false;
      $scope.infowindow = new maps.InfoWindow({
        content: infowindowContent
      })
    })
  } 
})()