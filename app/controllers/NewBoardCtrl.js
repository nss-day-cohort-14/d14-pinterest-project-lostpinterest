"use strict";

app.controller("NewBoardCtrl", function($scope, DatabaseFactory, $location, AuthFactory) {

// establishing the keys and then will give them value later
  $scope.newBoard = {
    title: "",
    category: "",
    description: "",
    uid: ""
  };

// with $location, we can tell it when to go when it's done
  $scope.addNewBoard = function() {
    // uses getUser function in AuthFactory.js and assigns a new property of user to the object newBoard
    $scope.newBoard.uid = AuthFactory.getUser()
    // posts object to firebase
    DatabaseFactory.postNewBoard($scope.newBoard)
    // after postNewItem returns a promise, then go to list view
    .then(function(response) {
      console.log("response", response.name);
      return DatabaseFactory.getBoards()
    }).then(function() {
      $location.url("/boards");    
  })
  }
})