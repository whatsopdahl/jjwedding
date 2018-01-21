(function() {
	'use strict';

	var app = angular.module("weddingApp");

	app.constant('AUTH_EVENTS', {
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  userNotFound: 'user-not-found',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized',
	  userChanged : 'auth-user-changed'
	});

	app.constant('GOOGLE_AUTH', {
		'client_id' : '96564396103-uereddimc124c96439gg631um1an7311.apps.googleusercontent.com',
		'client_secret' : 'QRy5SQdYtJR9WH0nSb6Tuddv'
	});

	app.factory("authSrv", authSrv);
	app.directive("loginModal", loginModal);
	app.controller("loginCtrl", loginCtrl);
	app.directive("googleSignInButton", googleSignInButton);

	loginCtrl.$inject = ["$scope", "authSrv"];
	function loginCtrl($scope, authSrv) {
		$scope.fbLogout = authSrv.fbLogout;
		$scope.googleOnSignIn = authSrv.googleOnSignIn;
	}

	authSrv.$inject = ["$rootScope", "$log"];
	function authSrv($rootScope, $log) {
		return {
			checkLoginStatus 	: checkLoginStatus,
			fbLogout 			: fbLogout,
			googleOnSignIn		: googleOnSignIn
		}

		function fbLogout() {
			FB.logout(function(response) {
				$rootScope.user = null;
				$rootScope.$apply();
			});
		}

		function checkLoginStatus() {
			FB.getLoginStatus(function(response) {
			    statusChangeCallback(response);
			});
		}

		function getFbProfile(uid) {
			$log.debug("getting Profile");
			var requestUrl = "/"+uid;
			FB.api(requestUrl, 
				{fields: "id,first_name,last_name,picture"},
				function(response) {
					$log.debug(response);
					if (response && !response.error) {
						$rootScope.user = {};
						$rootScope.user["first_name"] = response.first_name;
						$rootScope.user["last_name"] = response.last_name;
						$rootScope.user["email"] = response.email;
						$rootScope.user["photoUrl"] = response.picture.data.url;
						$rootScope.$apply();
					}
				}
			);
		}

		function statusChangeCallback(response) {
			  	if (response.status === 'connected') {
			    	// Logged into your app and Facebook.
			    	var uid = response.authResponse.userID;
    				//var accessToken = response.authResponse.accessToken;
			    	$rootScope.user = getFbProfile(uid);
			    	if (angular.element("#login-modal").is(":visible")){
			    		angular.element("#login-modal").modal("hide");
					}
			  	} else {
			    	$rootScope.user = null;
			  	}
		}

		function googleOnSignIn(response) {
			console.log(response);
		}
	}

	function loginModal() {
		return {
			restrict : "E",
			templateUrl : "app/templates/login.html",
			controller : "loginCtrl"
		}
	}

	googleSignInButton.$inject = ["authSrv"];
	function googleSignInButton(authSrv) {
		return {
			restrict : "E",
			template: "<div id='google-sign-in-btn'></div>",
			controller : function(authSrv) {
				function onSuccess(googleUser) {
			      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
			    }
			    function onFailure(error) {
			      console.log(error);
			    }
			    function renderButton() {
			      gapi.signin2.render('google-sign-in-btn', {
			        'scope': 'profile email',
			        'width': 240,
			        'height': 50,
			        'longtitle': true,
			        'theme': 'light',
			        'onsuccess': onSuccess,
			        'onfailure': onFailure
			      });
			    }
			}
		}
	}
})();