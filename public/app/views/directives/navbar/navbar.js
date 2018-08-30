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