(function() {
	'use strict';

	var app = angular.module("weddingApp");

	app.controller("rsvpCtrl", rsvpCtrl);
	app.directive("rsvpModal", rsvpModal);
	app.directive("confirmModal", confirmationDirective);
	app.filter("dietRestrictionFilter", dietRestrictionFilter);

	rsvpCtrl.$inject = ["$rootScope", "$scope", "$log", "$timeout", "dataSrv", "guestSrv"];
	function rsvpCtrl($rootScope, $scope, $log, $timeout, dataSrv, guestSrv) {
		resetData();

		$scope.getParty = function() {
			if (!$scope.entryPage.partyKey) return;
			$scope.loading = true;
			dataSrv.getParty($scope.entryPage.partyKey)
				.then(data => {
					$scope.data = data
					setMaxSize()
					$scope.loading = false
					$scope.page = 3;
				})
				.catch(err => {
					console.log(err)
					$scope.error = err.data
					$scope.loading = false
				})
		}

		$scope.nextPage = function() {
			if ($scope.currPage == 0) {
				if ($scope.data.attending == false) {
					$("#confirm-modal").modal('open');
					return;
				}
				if ($scope.data.maxSize == 1) {
					$scope.data.size = 1;
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
					if ($scope.data.size) return true;
					return false;
				case 2:
					return verifyPartyMembers();
				case 3:
					return verifyMealInfo();
				case 4:
					return $scope.data.email;
				default :
					return false;
			}
		}

		// use bit-wise XOR to return the mask.
		$scope.calcDietMask = function(guest, restriction) {
			guest.meal.mask = guest.meal.mask ^ restriction.value;
		}

		$scope.isRestricted = function(guestMask, restrictionVal) {
			return (guestMask & restrictionVal);
		}

		$scope.confirm = function() {
			$scope.loading = true;
			$scope.data.rsvped = true;
			for (let i=0; i < $scope.data.members.length; i++) {
				let guest = $scope.data.members[i];
				delete guest.mealOptions;
			}
			dataSrv.saveRsvp($scope.data)
				.then(response => {
					console.log(`success response: ${JSON.stringify(response, null, 2)}`)
					$scope.loading = false;
					$("#rsvp-modal").modal('close');
					$rootScope.rsvping=false;
					resetData();
					Materialize.toast($('<span>Your RSVP has been saved <i class="material-icons success-text">check</i></span>'), 5000)
				})
				.catch(err => {
					$scope.loading = false
					$scope.data.rsvped = false
					Materialize.toast($('<span>An error occurred while saving - please try again later<i class="material-icons error-text">clear</i></span>'), 5000)
				})
		}

		$scope.toggleMealOptions = function(guest) {
			if (guest.under10) {
				guest.mealOptions = $scope.mealOptions;
				guest.under10 = false;
			} else {
				guest.mealOptions = $scope.childMealOptions;
				guest.under10 = true;
			}
			guest.meal.meal = null;
		}

		function initPartyMembers() {
			while ($scope.data.members.length > $scope.data.size) {
				$scope.data.members.pop();
			}
			$scope.memberInfoPrompt = ($scope.data.members.length == $scope.data.size) ? "Verify" : "Enter";
			for (let i=$scope.data.members.length; i < $scope.data.size; i++) {
				$scope.data.members[i] = guestSrv.createNewGuest($scope.data.partyId);
			}
			for (let i=0; i < $scope.data.members.length; i++) {
				$scope.data.members[i].mealOptions = $scope.mealOptions;
			}
		}

		function verifyPartyMembers() {
			for (let i=0; i < $scope.data.members.length; i++) {
				let member = $scope.data.members[i];
				if (!member.firstName || !member.lastName) return false;
			}
			return true;
		}

		function verifyMealInfo() {
			for (let i=0; i < $scope.data.members.length; i++) {
				let member = $scope.data.members[i];
				if (!member.meal.meal) return false;
			}
			return true;
		}

		function resetData() {
			$scope.data = {
				partyId : null,
				maxSize : 1,
				size : null,
				name : null,
				attending : null,
				rsvped : false,
				email : null,
				members : []
			};
			$scope.error = null;
			setMaxSize();
			$scope.maxPage = 5;
			$scope.currPage = 0;
			$scope.entryPage = { partyKey : null };
			$scope.loading = false;
		}

		function setMaxSize() {
			$scope.partyOptions = [];
			for (let i=1; i <= $scope.data.maxSize; i++) {
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
			// {
			// 	classification : "Vegetarian",
			// 	value : 1
			// },
			{
				classification : "Gluten-free",
				value : 2
			}
		];

		$scope.mealOptions = [
			{
			  name: 'Sea Bass (DF)',
			  description: 'Grilled Sea Bass with wasabi ginger sauce'
			},
			{
			  name: 'Chicken Breast (GF) (DF)',
			  description: 'Herb-roasted wingtip chicken breast with roasted garlic herb sauce'
			},
			{
			  name: 'Butternut Squash Ravioli (V)',
			  description: 'Served with mascarpone sage cream and vegetable ratatouille'
			}
		]

		$scope.childMealOptions = [
			{
				name: 'Crispy Chicken Strips',
				description: ''
			},
			{
				name: 'Mac & Cheese (V)',
				description: ''
			},
			{
				name: 'Mini Cheese Pizza (V)',
				description: ''
			},
			{
				name: 'Hot Dog',
				description: ''
			}
		]
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
				if (guest.meal.mask & restriction.value) {
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
