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

