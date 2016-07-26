"use strict";

app.controller("NavCtrl", function($scope, $location, AuthFactory) {
  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      AuthFactory.logout();
      $location.url("/");
    }, function(error) {
      //An error happened
    });
  };

  $scope.hideIt = function() {
    $scope.hideMe = true;
    console.log("hi");
  };
});
