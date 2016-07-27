"use strict";

app.controller("PinsCtrl", function($scope, $routeParams, DatabaseFactory, $location) {
	$scope.pins = [];

  let currentBoard = DatabaseFactory.getCurrentBoardId();
  console.log("currentBoard", currentBoard);

  DatabaseFactory.getPins(currentBoard)
  	.then(function(pinsCollection) {
	    $scope.pins = pinsCollection;
  });


  $scope.RemovePin = function(removeId){
  	console.log("removing pin: ", removeId);
		DatabaseFactory.deletePin(removeId)
			.then(function(){
				DatabaseFactory.getPins(currentBoard)
				.then (function(pinsCollection){
					$scope.pins=pinsCollection;
				});
			});
			
	};
});
