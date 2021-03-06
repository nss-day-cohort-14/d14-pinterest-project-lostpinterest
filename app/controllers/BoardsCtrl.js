"use strict";

app.controller("BoardsCtrl", function($scope, $routeParams, DatabaseFactory, $location) {
  $scope.boards = [];


  DatabaseFactory.getBoards()
  	.then(function(boardsCollection) {
	    // console.log(boardsCollection);
	    $scope.boards = boardsCollection;
  });



  	//scope in this controller relates to the partial boards.html because it was defined in the route provider in app.js


  $scope.RemoveBoard = function(removeId) {
  	console.log("removing: ", removeId);
		DatabaseFactory.deleteBoard(removeId)
			.then(function(){
				DatabaseFactory.getBoards()
				.then (function(boardCollection){
					$scope.boards = boardCollection;
				});
			});			
	};

	$scope.GoToPinsView = function(boardId) {
		console.log("go to pins board id:", boardId);
		DatabaseFactory.setCurrentBoardId(boardId);
		$location.url("/pins");
		// return DatabaseFactory.getPins(boardId)
		// 	.then (function(){
		// 		console.log("now go to pins view!");
		// 		$location.url("/pins");
		// 	});
	};

});





// if (AuthFactory.isAuthenticated() === true){

// 		console.log("true!" );
// 		DatabaseFactory.getItemList()
// 			.then(function(itemCollection) {
// 				$scope.items=itemCollection;
// 				$location.url("#/items/list");
// 			});
// 	} else {
// 		console.log("nope!" );
// 	}
