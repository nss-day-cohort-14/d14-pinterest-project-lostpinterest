"use strict";

app.controller("SplashCtrl", function($scope, $location, AuthFactory) {

  $scope.login = function() {
  AuthFactory.authWithProvider()
    .then(function(result) {
      var user = result.user.uid;
      console.log("logged in for sure", user);
      $location.path("/");
      $scope.$apply();
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  };

  // $scope.registerLogin = function() {

  // };

  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      AuthFactory.logout();
    }, function(error) {
      //An error happened
    });
  };
});

console.log("Hi");
