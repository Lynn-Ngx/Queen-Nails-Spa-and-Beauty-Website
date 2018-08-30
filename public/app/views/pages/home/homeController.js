angular.module('homeController', [])

    .controller('homeCtrl', function($rootScope, $scope, $location, $timeout, $http){

    const app = this;


    app.myMap = () => {
        console.log('clicked')
        var mapOptions = {
            center: new google.maps.LatLng(53.2938549, -6.3557327),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    app.myMap()

    $rootScope.safeApply = function() {
        if(!$rootScope.$$phase) $rootScope.$apply();
    };
});