angular.module('app.directives.sidebar', [])
    .directive('sidebar', function() {
        return {
            restrict: 'EA',
            scope: {

            },
            templateUrl:  "/app/views/directives/sidebar/sidebar.template.html",
            controller: function($scope){

                console.log('asdasdasd')
                const init = () => {

                }


                init()

            }
        }
    });