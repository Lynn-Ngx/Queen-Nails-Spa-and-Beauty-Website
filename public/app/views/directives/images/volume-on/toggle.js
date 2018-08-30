angular.module('app.directives.toggle', [])
    .directive('toggle', function() {
        return {
            restrict: 'EA',
            scope: {
                svgHeight: '@',
                svgWidth: '@',
                svgFill: '@'

            },
            templateUrl:  "/app/views/directives/images/toggle/toggle.html",
            controller: function($scope){

                console.log($scope)

            }
        }
    });