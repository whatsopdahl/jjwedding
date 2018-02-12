(function() {
  'use strict';

  var app = angular.module("weddingApp");

  app.directive("loadingComponent", loadingComponent);

  function loadingComponent() {
    return {
      restrict : 'E',
      templateUrl : 'app/templates/loading.html'
    };
  }

})();
