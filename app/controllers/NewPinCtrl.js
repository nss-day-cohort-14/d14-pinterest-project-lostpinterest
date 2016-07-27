"use strict";


app.controller("NewPinCtrl", function($scope, DatabaseFactory, $location, AuthFactory) {

// establishing the keys and then will give them value later
  $scope.newPin = {
    title: "",
    url: "",
    comments: "",
    uid: ""
  };

// with $location, we can tell it when to go when it's done
  $scope.addNewPin = function() {
    // uses getUser function in AuthFactory.js and assigns a new property of user to the object newPin
    $scope.newPin.uid = AuthFactory.getUser()
    $scope.newPin.boardid = DatabaseFactory.getCurrentBoardId();
    // posts object to firebase
    DatabaseFactory.postNewPin($scope.newPin)
    // after postNewItem returns a promise, then go to list view
    .then(function(response) {
      console.log("response", response.name);
      return DatabaseFactory.getPins($scope.newPin.boardid);
    }).then(function(data) {
      console.log("data", data);
      $location.url("/pins");    
    })
  }
})