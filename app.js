const angular = require('angular')

require('./node_modules/materialize-css/dist/js/materialize')
require('angular-route')
require('angular-animate')
require('angular-simple-logger')
require('angular-google-maps')
require('clipboard')
require('ngclipboard')

require('./css/styles.scss')

angular.module('weddingApp', [
    'ngRoute',
    'ngAnimate',
    'nemLogging',
    'uiGmapgoogle-maps',
    'ngclipboard'
])
/* configs */
.config(require('./app/app.config'))
.config(require('./app/googleMapConfig'))
/* components */
.component('navbar', require('./app/navbar'))
/* controllers */
.controller('accommodationsCtrl', require('./app/accommodations'))
.controller("galleryCtrl", require('./app/gallery'))
.controller('rsvpCtrl', require('./app/rsvp/rsvpCtrl'))
.controller('venueCtrl', require('./app/venue'))
/* directive */
.directive("contactInfo", require('./app/contactInfo'))
.directive("appFooter", require('./app/footer'))
.directive('imageDirective', require('./app/image'))
.directive("loadingComponent", require('./app/loading'))
.directive('rsvpModal', require('./app/rsvp/rsvpModal'))
.directive('confirmModal', require('./app/rsvp/confirmationModal'))
/* factories */ 
.factory("guestSrv", require('./app/guestSrv'))
/* services */
.service('dataSrv', require('./app/dataSrv'))

