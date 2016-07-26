"use strict";

app.controller("ItemViewCtrl", function($scope, $routeParams, DatabaseFactory) {
  $scope.items = [];
  // $scope.selectedItem = {};

  DatabaseFactory.getBoards()
  .then(function(boardsCollection) {
    console.log(boardsCollection);
    $scope.items = boardsCollection;


    // filter and return a new array
    // looping through an array an array of objects and is only going to add a new item to the array if this condition is met
    $scope.selectedItem = $scope.items.filter(function(item) {
      return item.id === $routeParams.itemId;
    })[0]
  })
});