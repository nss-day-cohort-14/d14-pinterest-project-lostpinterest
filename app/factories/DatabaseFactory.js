"use strict";

app.factory("DatabaseFactory", function(FirebaseURL, $q, $http, AuthFactory){

	let getBoards = function() {
		let boards = [];
		return $q(function(resolve, reject) {
			// console.log("user id?", AuthFactory.getUser());
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

	let postNewBoard = function(newBoard){
		// items.push(newBoard);
		return $q(function(resolve, reject){
			$http.post(`${FirebaseURL}/boards.json`,
				JSON.stringify(newBoard))
			.success(function(ObjFromFirebase){
				let newBoardId = ObjFromFirebase.name;
				newBoard.boardid = newBoardId;
				console.log("<<<", newBoard.boardid);
				$http.put(`${FirebaseURL}/boards/${newBoardId}.json`, newBoard);
				resolve(ObjFromFirebase);
			})
			.error(function(error){
				reject(error);
			});
		});
	};

		let postNewPin = function(newBoard){
		return $q(function(resolve, reject){
			$http.post(`${FirebaseURL}/pins.json`,
				JSON.stringify(newPin))
			.success(function(ObjFromFirebase){
				console.log("ObjFromFirebase");
				let newPinId = ObjFromFirebase.name;
				newPin.boardid = newPinId;
				console.log("<<<", newPin.pinId);
				$http.put(`${FirebaseURL}/boards/${newPinId}.json`, newPin);
				resolve(ObjFromFirebase);
			})
			.error(function(error){
				reject(error);
			});
		});
	};





	let deleteBoard = function(removeId){
		let boardUrl = FirebaseURL + "/boards/" + removeId + ".json";
		return $q(function(resolve, reject){
			$http.delete(boardUrl)
				.success(function(){
					resolve();
				});
		});
	};





	// 	console.log("item.isCompleted", itemStatus);
	// };

	return {getBoards, deleteBoard, postNewBoard, postNewPin};

});

