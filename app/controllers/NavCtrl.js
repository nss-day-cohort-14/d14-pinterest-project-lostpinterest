"use strict";

app.controller("NavCtrl", function($scope, $location, AuthFactory) {

  $scope.logout = function() {
    let currentUserId = AuthFactory.getUser();
    console.log("currentUserId", currentUserId);
    firebase.auth().signOut()
    .then(function() {
      console.log("log out called");
      currentUserId = AuthFactory.logout();
      $location.url("/");
      $scope.$apply();
      console.log("currentUserId", currentUserId);
    })
  };

  // $scope.hideIt = function() {
  //   $scope.hideMe = true;
  //   console.log("hi");
  // };
});
