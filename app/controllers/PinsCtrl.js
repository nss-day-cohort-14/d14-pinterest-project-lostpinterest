"use strict";

app.controller("PinsCtrl", function($scope, $routeParameters, DatabaseFactory, $location) {
  $scope.items = [];

  DatabaseFactory.getPins()
    .then(function(pinsCollection) {
      scope.pins = pinsCollection;
    });

  $scope.Remove = function(removeId) {
    DatabaseFactory.deletePin(removeId)
      .then(function() {
        DatabaseFactory.getPins()
        .then(function(pinCollection) {
          $scope.pins = pinCollection;
        });
    });
  };
});
