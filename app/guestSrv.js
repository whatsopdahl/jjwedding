(function() {
  'use strict';

  let app=angular.module("weddingApp");

  app.factory("guestSrv", function() {
    return {
      createNewGuest : createNewGuest
    }

    function createNewGuest(partyId) {
      return {
        firstName : null,
        lastName : null,
        under21 : false,
        diet : {
          mask : 0,
          notes : null
        },
        partyId : partyId
      }
    }
  });
})();
