(function() {
    'use strict';

    var app = angular.module("weddingApp");

    app.directive('imageDirective', image);

    function image() {
        return {
            restrict: 'E',
            template: '<img class="{{className}}" ng-src="{{srcPrefix + \'_thumbnail.\' + srcSuffix}}" data-caption="{{caption}}"/>',
            link: function($scope) {
                let srcVals = $scope.src.split('.')
                $scope.srcPrefix = srcVals[0]
                $scope.srcSuffix = srcVals[1]
            },
            scope: {
                className: "@",
                src: "=",
                caption: "@"
            }
        }
    }
})();