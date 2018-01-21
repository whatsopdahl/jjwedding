(function() {
	'use strict';

	var app = angular.module("weddingApp");

	app.controller("rsvpCtrl", rsvpCtrl);
	app.directive("confirmModal", confirmationDirective);

	rsvpCtrl.$inject = ["$rootScope", "$scope", "$log", "dataSrv"];
	function rsvpCtrl($rootScope, $scope, $log, dataSrv) {
		$scope.maxPage = 3;
		$scope.currPage = 0;
		$scope.form = {"firstName" : '',
					   "lastName"  : '',
					   "inviteId"   : null,
					   "email"      : '',
					   "attending"  : null,
					   "party"      : 1,
					   "mealId"		: null,	
					   "party-members" : [] };

		// if (!$rootScope.user) {
		// 	$('#login-modal').modal('open');
		// } else {
		// 	$scope.user = $rootScope.user;
		// 	//fillFormData();
		// }

		//$scope.user = dataSrv.getInviteeByUser();

		//fillFormData();

		function fillFormData() {
			var inviteInfo = dataSrv.getInviteeByUser();
			$scope.form.firstName = $scope.user.first_name;
			$scope.form.lastName = $scope.user.last_name;
			$scope.form.email = $scope.user.email;
			$scope.partyOptions = [];
			for (var i=1; i <= inviteInfo.party; i++) {
				$scope.partyOptions.push(i);
			}
		}

		$scope.nextPage = function() {
			if ($scope.currPage == 1 && $scope.form.attending == false) {
				$(document).ready(function() {
					$("#confirm-modal").modal('open');
				});
				return;
			}
			$scope.currPage++;
			loadSelect();
		}

		$scope.prevPage = function() {
			$scope.currPage--;
			loadSelect();
		}

		$scope.filled = function() {
			switch ($scope.currPage) {
				case 0:
					if (!$scope.form.firstName) {
						return false;
					}
					if (!$scope.form.lastName) {
						return false;
					}
					if (!$scope.form.email) {
						return false;
					}
					return true;
				case 1:
					if ($scope.form.attending == null) {
						return false;
					}
					return true;
				case 2:
					if (!$scope.form.party){
						return false;
					}
					return true;
				case 3:
					if (!$scope.meal) {
						return false;
					}
					return true;
					break;
				default:
					throw Error("Did not recognize page!");
					break;
			}
		}

		$scope.jumpTo = function(page) {
			if (page < $scope.currPage)
			$scope.currPage = page;
		}

		$scope.submit = function() {
			$log.debug("submitted", $scope.form);
		}

		$scope.login = function() {
			$("#login-modal").modal('open');
		}

		function loadSelect() {
			$(document).ready(function() {
				$('select').material_select();
			});
		}
	}

	function confirmationDirective() {
		return {
			'restrict' : 'E',
			'templateUrl' : 'app/templates/confirm.html'
		}
	}
})();