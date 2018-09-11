module.exports = function confirmationModal() {
    return {
        restrict : 'E',
        template : require('./confirm.html'),
        scope : {
            data : '=',
            confirm : '=',
            jumpTo : '=',
            restrictions : '='
        }
    }
}