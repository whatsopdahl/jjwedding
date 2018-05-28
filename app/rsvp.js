(function() {
	'use strict';

	var app = angular.module("weddingApp");

	app.controller("rsvpCtrl", rsvpCtrl);
	app.directive("rsvpModal", rsvpModal);
	app.directive("confirmModal", confirmationDirective);
	app.filter("dietRestrictionFilter", dietRestrictionFilter);

	rsvpCtrl.$inject = ["$rootScope", "$scope", "$log", "$timeout", "dataSrv", "guestSrv"];
	function rsvpCtrl($rootScope, $scope, $log, $timeout, dataSrv, guestSrv) {
		//init variables
		resetData();

		$scope.getParty = function() {
			if (!$scope.entryPage.partyKey) return;
			//TODO: async function
			$scope.loading = true;
			$timeout(() => {
				$scope.loading = false;
				$scope.data.partyId=4;
				$scope.data.name = "Donner";
				$scope.data.partyMembers = [guestSrv.createNewGuest(4)];
				$scope.data.partyMembers[0].firstName="John";
				$scope.data.partyMembers[0].lastName="Donner";
				$scope.data.guestsAllowed = 2;
			 	$scope.data.phone = "6129787404";
			 	$scope.data.email = "jane.doe@gmail.com";
				initGuestsAllowed();
			}, 1000);
		}

		$scope.nextPage = function() {
			if ($scope.currPage == 0) {
				if ($scope.data.attending == false) {
					$("#confirm-modal").modal('open');
					return;
				}
				if ($scope.data.guestsAllowed == 1) {
					$scope.data.partySize = 1;
					$scope.currPage++;
				}
			}
			if ($scope.currPage == 1 && $scope.canAdvance()) {
				initPartyMembers();
			}
			if ($scope.currPage == 4 && $scope.canAdvance()) {
				$("#confirm-modal").modal('open');
				return;
			}
			$scope.currPage++;
			loadSelect();
		}

		$scope.prevPage = function() {
			if ($scope.currPage == 0) {
				return
			}
			$scope.currPage--;
			loadSelect();
		}

		$scope.restart = function() {
			$scope.loading = true;
			resetData();
		}

		$scope.jumpTo = function(page) {
			if ($scope.canJump(page)) {
				$scope.currPage = page;
				loadSelect();
			}
		}

		$scope.canJump = function(page) {
			return $scope.currPage >= page;
		}

		$scope.close = function() {
			$rootScope.rsvping = false;
		}

		$scope.canAdvance = function() {
			switch ($scope.currPage) {
				case 0:
					if ($scope.data.attending != null) return true;
					return false;
				case 1:
					if ($scope.data.partySize) return true;
					return false;
				case 2:
					return verifyPartyMembers();
				case 3:
					return true;
				case 4:
					return $scope.data.email;
				default :
					return false;
			}
		}

		// use bit-wise XOR to return the mask.
		$scope.calcDietMask = function(guest, restriction) {
			guest.diet.mask = guest.diet.mask ^ restriction.value;
		}

		$scope.isRestricted = function(guestMask, restrictionVal) {
			return (guestMask & restrictionVal);
		}

		$scope.confirm = function() {
			console.log("RSVPed confirmed");
			$scope.loading = true;
			//TODO: async call to save RSVP data
			$timeout( () => {
				$scope.loading = false;
				$("#rsvp-modal").modal('close');
				$rootScope.rsvping=false;
				resetData();
				$scope.data.rsvped = true;
				Materialize.toast($('<span>Your RSVP has been saved <i class="material-icons success-text">check</i></span>'), 5000)
			}, 2000);
		}

		function initPartyMembers() {
			while ($scope.data.partyMembers.length > $scope.data.partySize) {
				$scope.data.partyMembers.pop();
			}
			$scope.memberInfoPrompt = ($scope.data.partyMembers.length == $scope.data.partySize) ? "Verify" : "Enter";
			for (let i=$scope.data.partyMembers.length; i < $scope.data.partySize; i++) {
				$scope.data.partyMembers[i] = guestSrv.createNewGuest($scope.data.partyId);
			}
		}

		function verifyPartyMembers() {
			for (let i=0; i < $scope.data.partyMembers.length; i++) {
				let member = $scope.data.partyMembers[i];
				if (!member.firstName || !member.lastName) return false;
			}
			return true;
		}

		function resetData() {
			//TODO : remove this when we get data async
			$scope.data = {
				partyId : null,
				guestsAllowed : 1,
				partySize : null,
				name : null,
				attending : null,
				rsvped : false,
				email : null,
				phone : null,
				partyMembers : []
			};
			initGuestsAllowed();
			$scope.maxPage = 5;
			$scope.currPage = 0;
			$scope.entryPage = { partyKey : null };
			$scope.loading = false;
		}

		function initGuestsAllowed() {
			$scope.partyOptions = [];
			for (let i=1; i <= $scope.data.guestsAllowed; i++) {
				$scope.partyOptions.push(i);
			}
		}

		function loadSelect() {
			$(document).ready(function() {
				$('select').material_select();
			});
		}

		//TODO: replace these with asyc grabbing of data
		$scope.dietaryRestrictions =[
			{
				classification : "Vegetarian",
				value : 1
			},
			{
				classification : "GLuten-free",
				value : 2
			}
		];
	}

	function rsvpModal() {
		return {
			restrict : 'E',
			templateUrl : 'app/templates/RSVP.html',
			controller : 'rsvpCtrl'
		}
	}
	function confirmationDirective() {
		return {
			'restrict' : 'E',
			'templateUrl' : 'app/templates/confirm.html',
			'scope' : {
				data : '=',
				confirm : '=',
				jumpTo : '=',
				restrictions : '='
			}
		}
	}

	function dietRestrictionFilter() {
		return function(guest, restrictions) {
			let list = "";
			for (let restriction of restrictions) {
				if (guest.diet.mask & restriction.value) {
					list+=restriction.classification;
					list+=" & ";
				}
			}
			if (list.length == 0) {
				return "None";
			}
			return list.substr(0, list.length-3);
		}
	}
})();
