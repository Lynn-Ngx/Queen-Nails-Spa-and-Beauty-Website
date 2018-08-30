angular.module('mainController', [])

.controller('mainCtrl', function($rootScope, $scope, $location, $timeout, $http){

    const app = this;

    //      $rootScope.$on('$routeChangeStart', () => {
    //
    //      });


    const test = () => {
        console.log('test')
    }

    app.sendMail = (data) => {
        console.log('mail', data)

        $http.post('api/sendMail', data).then((data) => {

            document.getElementById('emailNotSent').style.display = 'none'
            document.getElementById('emailSent').style.display = 'block'



        });

    }

    app.myMap = () => {
        console.log('clicked')
        var mapOptions = {
            center: new google.maps.LatLng(51.5, -0.12),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    $rootScope.safeApply = function() {
        if(!$rootScope.$$phase) $rootScope.$apply();
    };
});