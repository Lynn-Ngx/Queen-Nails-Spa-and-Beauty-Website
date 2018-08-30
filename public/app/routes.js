var app = angular.module('routes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .when('/staff', {
                templateUrl: 'app/views/pages/staff/staff.html'
            })
            .when('/services', {
                templateUrl: 'app/views/pages/services/services.html'
            })

            .when('/contact', {
                templateUrl: 'app/views/pages/contact/contact.html',
                controller: 'contactCtrl',
                controllerAs: 'contact'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requiredBase: false
        });
    });
