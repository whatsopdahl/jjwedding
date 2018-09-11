const $ = require('jquery')

module.exports = {
	template: require('./templates/navbar.html'),
	controllerAs: '$ctrl',
	controller: class Navbar {
		/* @ngInject */
		constructor($rootScope, $location) {
			this.$rootScope = $rootScope;
			this.$rootScope.rsvping = false;
			this.$rootScope.$on('$locationChangeStart', () => {
				this.page = $location.path();
			});
		}

		$onInit() {
			$(document).ready(function() {
				$(".button-collapse").sideNav({
					menuWidth: 300, // Default is 300
					edge: 'right', // Choose the horizontal origin
					closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
					draggable: true // Choose whether you can drag to open on touch screens
				});
			});
		}

		isActive(page) {
			if (this.$rootScope.rsvping) {
				return false;
			} else if (this.page == page) {
				return true;
			}
		}

		rsvp() {
			this.$rootScope.rsvping = true;
			$("#rsvp-modal").modal('open');
		}
	}
}
