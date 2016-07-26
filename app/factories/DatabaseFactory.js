"use strict";

app.factory("DatabaseFactory", function(FirebaseURL, $q, $http, AuthFactory){

	let getBoards = function() {
		let boards = [];
		return $q(function(resolve, reject) {
			// console.log("user id?", AuthFactory.getUser());
			// $http.get(`${FirebaseURL}/items.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
			$http.get(`${FirebaseURL}/boards.json?orderBy="uid"&equalTo="aaa666bbb5555"`)
			.success(function(boardsObj) {
				console.log("boards", boardsObj);
				let boardsCollection = boardsObj;
				//create array from object and loop thru keys - saving fb key for each item inside the obj as an id property
				Object.keys(boardsCollection).forEach(function(key){
					boardsCollection[key].id=key;
					items.push(boardsCollection[key]);
				});
				resolve (items);
				console.log("items:", items);
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

	// let deleteItem = function(removeId){
	// 	let itemUrl = FirebaseURL + "/items/" + removeId + ".json";
	// 	return $q(function(resolve, reject){
	// 		$http.delete(itemUrl)
	// 			.success(function(){
	// 				resolve();
	// 			});
	// 	});
	// }



	// 	console.log("item.isCompleted", itemStatus);
	// };

	return {getBoards};
	
});