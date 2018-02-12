(function() {
  'use strict';

  var app = angular.module("weddingApp");

  app.directive("contactInfo", contactInfo);

  function contactInfo() {
    return {
      restrict : "E",
      templateUrl : "app/templates/contactInfo.html"
    }
  }
})();
