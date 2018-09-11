module.exports = function rsvpModal() {
    return {
        restrict : 'E',
        template : require('./RSVP.html'),
        controller: 'rsvpCtrl'
    }
}