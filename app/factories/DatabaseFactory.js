"use strict";

app.factory("DatabaseFactory", function(FirebaseURL, $q, $http, AuthFactory){

	let getBoards = function() {
		let boards = [];
		return $q(function(resolve, reject) {
			console.log("user id?", AuthFactory.getUser());
			$http.get(`${FirebaseURL}/boards.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
			.success(function(boardsObj) {
				console.log("boardsObj", boardsObj);
				//create array from object and loop thru keys to push each board to the boards array
				Object.keys(boardsObj).forEach(function(key){
					boards.push(boardsObj[key]);
				});
				console.log("boards:", boards);
				resolve (boards);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	// let postNewItem = function(newItem){
	// 	// items.push(newItem);
	// 	return $q(function(resolve, reject){
	// 		$http.post(`${FirebaseURL}/items.json`,
	// 			JSON.stringify(newItem))
	// 		.success(function(ObjFromFirebase){
	// 			resolve(ObjFromFirebase);
	// 		})
	// 		.error(function(error){
	// 			reject(error);
	// 		});
	// 	});
	// };


	let deleteBoard = function(removeId){
		let boardUrl = FirebaseURL + "/boards/" + removeId + ".json";
		return $q(function(resolve, reject){
			$http.delete(boardUrl)
				.success(function(){
					resolve();
				});
		});
	}



	// 	console.log("item.isCompleted", itemStatus);
	// };

	return {getBoards, deleteBoard};
	
});