(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require('angular');
require('angular-route');
require('angular-animate');

require('./routes.js');
require('./views/controller/contactController.js');
require('./views/controller/mainController.js');
require('./views/pages/home/homeController.js');

//
require('./views/directives/navbar/navbar.js');
require('./views/directives/images/toggle/toggle.js');
require('./views/directives/typewriter/typewriter.directive.js');
require('./views/directives/footer/footer.directive.js');

require('./views/directives/sidebar/sidebar.directive.js');

angular.module('roomApp', ['routes', 'contactController', 'mainController', 'homeController', 'app.directives.navbar', 'app.directives.toggle', 'app.directives.typewriter', 'app.directives.sidebar', 'app.directives.customFooter'])


},{"./routes.js":2,"./views/controller/contactController.js":3,"./views/controller/mainController.js":4,"./views/directives/footer/footer.directive.js":5,"./views/directives/images/toggle/toggle.js":6,"./views/directives/navbar/navbar.js":7,"./views/directives/sidebar/sidebar.directive.js":8,"./views/directives/typewriter/typewriter.directive.js":9,"./views/pages/home/homeController.js":10,"angular":"angular","angular-animate":"angular-animate","angular-route":"angular-route"}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
angular.module('contactController', [])

    .controller('contactCtrl', function($http, $location, $timeout, $rootScope){

        const app = this;

    });
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
/**
 * @numberOfFields needs to be updated as per amount of fields in less file
 * @mediaMaxWidth in less file should match the maxWidth in the directive controller
 */

angular.module('app.directives.navbar', [])
    .directive('navbar', function() {
        return {
            restrict: 'EA',
            scope: {

            },
            templateUrl:  "/app/views/directives/navbar/navbar.html",
            controller: function($scope, $rootScope){
                let wrapperHasBeenHidden = false
                const maxWdith = 700

                $scope.fields = [
                    {
                        name: 'Home',
                        href: '/'
                    },
                    {
                        name: 'Prices',
                        href: '/services'
                    },
                    {
                        name: 'Gallery',
                        href: '/staff'
                    },
                    {
                        name: 'Contact Us',
                        href: '/contact'
                    }
                ]


                //get array of names of fields
                const fields = ['Contact', 'Services', 'Location', 'Staff']
                const url = window.location.href.split("/")
                const tempField =  url[url.length - 1].replace(/^\w/, c => c.toUpperCase())
                $scope.selectedField = (fields.includes(tempField)) ? tempField : 'Home'

                const init = () => {
                    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

                    if (w <= maxWdith && !wrapperHasBeenHidden){
                        document.getElementById('navbarWrapper').classList.toggle('hidden')
                        wrapperHasBeenHidden = true
                    }
                }


                init()

                window.onresize = () => {
                    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

                    if (w <= maxWdith && !wrapperHasBeenHidden){
                        document.getElementById('navbarWrapper').classList.toggle('hidden')
                        wrapperHasBeenHidden = true
                    }else if (w >= maxWdith && wrapperHasBeenHidden){
                        wrapperHasBeenHidden = false
                        document.getElementById('navbarWrapper').classList.remove('hidden')
                        document.getElementById('navbarWrapper').classList.remove('un-hidden')
                    }
                }

                $scope.fieldClicked = (fieldThatWsClicked) => {
                    window.scrollTo(0,0)
                    $scope.selectedField = fieldThatWsClicked
                    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

                    if (w <= maxWdith){
                        hideNavbar()

                    }
                }

                $scope.toggleNavbar = () => {
                    if (document.getElementById('navbarWrapper').classList.contains('hidden')) showNavbar()
                    else hideNavbar()
                }

                const hideNavbar = () => {
                    document.getElementById('navbarWrapper').classList.remove('un-hidden')
                    document.getElementById('navbarWrapper').classList.add('hidden')
                }

                const showNavbar = () => {
                    document.getElementById('navbarWrapper').classList.remove('hidden')
                    document.getElementById('navbarWrapper').classList.add('un-hidden')
                }



                $scope.scrollPosition = 0
                window.addEventListener('scroll', (value) => {
                    $scope.scrollPosition = window.pageYOffset
                    $rootScope.safeApply()
                })

            }
        }
    });
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
angular.module('app.directives.typewriter', [])
    .directive('typewriter', function() {
        return {
            restrict: 'EA',
            scope: {

            },
            templateUrl:  "/app/views/directives/typewriter/typewriter.template.html",
            controller: function($scope){

                const wordsToTypeWrite = [
                    'a manicure',
                    'a pedicure',
                    'some waxing'
                ]

                $scope.currentTypedWord = ''


                const delay = (time) => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve()
                        }, time)
                    })
                }

                const typeWriteWord = (word) => {
                    return new Promise(resolve => {
                        const lengthOfWord = word.length;
                        let currentIndexOnWord = 0
                        let incrementBy = 1

                        const typewriting = setInterval(async () => {
                            if (incrementBy === 1){
                                if (currentIndexOnWord < lengthOfWord){
                                    $scope.currentTypedWord += word[currentIndexOnWord]
                                    currentIndexOnWord += incrementBy;
                                }else {
                                    incrementBy = -1
                                    // await delay(1000)
                                }

                            }else {

                                if (currentIndexOnWord > 0){
                                    $scope.currentTypedWord = $scope.currentTypedWord.substring(0, $scope.currentTypedWord.length - 1)
                                    currentIndexOnWord += incrementBy;
                                }else {
                                    clearInterval(typewriting)
                                    resolve()
                                }
                            }

                            $scope.$apply();


                        }, 100)
                    })
                }

                let indexOfCurrentWordTypewriting = 0;



                const startTypescript = async() => {
                    while(true){
                        if (indexOfCurrentWordTypewriting === wordsToTypeWrite.length) {
                            indexOfCurrentWordTypewriting = 0
                        }

                        await typeWriteWord(wordsToTypeWrite[indexOfCurrentWordTypewriting])
                        indexOfCurrentWordTypewriting += 1
                    }
                }

                startTypescript()



            }
        }
    });
},{}],10:[function(require,module,exports){
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
},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
