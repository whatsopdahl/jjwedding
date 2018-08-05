(function() {
  'use strict';

  let app=angular.module("weddingApp");

  app.factory("guestSrv", function() {
    return {
      createNewGuest : createNewGuest
    }

    function createNewGuest(partyId, mealOptions) {
      return {
        firstName : null,
        lastName : null,
        under21 : false,
        meal : {
          meal : null,
          mask : 0,
          notes : null
        },
        partyId : partyId
      }
    }
  });
})();
