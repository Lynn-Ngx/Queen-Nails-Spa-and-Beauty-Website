/**
 * @numberOfFields needs to be updated as per amount of fields in less file
 * @mediaMaxWidth in less file should match the maxWidth in the directive controller
 */

angular.module('app.directives.customFooter', [])
    .directive('customFooter', function() {
        return {
            restrict: 'EA',
            scope: {

            },
            templateUrl:  "/app/views/directives/footer/footer.template.html",
            controller: function($scope, $rootScope){


            }
        }
    });