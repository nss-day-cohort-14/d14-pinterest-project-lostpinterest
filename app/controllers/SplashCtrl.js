"use strict";

app.controller("SplashCtrl", function($scope, $location, AuthFactory) {

  $scope.newUser = {
    userId: ""
  };

  $scope.login = function() {
  AuthFactory.authWithProvider()
    .then(function(result) {
      var user = result.user.uid;
      console.log("logged in for sure", user);
      $location.path("boards");
      $scope.$apply();
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  };

  $scope.registerLogin = function() {
    $scope.newUser.userId = AuthFactory.getUser();
    console.log("UID????", $scope.newUser.userId);
    // Waiting on DatabaseFactory functions to be written to be able to push currentUserId to firebase
    // DatabaseFactory.postNewUser($scope.newUser)
    // .then(function(response) {
    //   $location.url("/users");
    // });
  };

  // $scope.logout = function() {
  //   firebase.auth().signOut().then(function() {
  //     AuthFactory.logout();
  //   }, function(error) {
  //     //An error happened
  //   });
  // };
});

// console.log("Hi");
