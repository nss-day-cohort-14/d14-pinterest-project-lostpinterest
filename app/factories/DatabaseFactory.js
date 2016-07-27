"use strict";

app.factory("DatabaseFactory", function(FirebaseURL, $q, $http, AuthFactory){

	let currentBoardId = null;

	let getBoards = function() {
		let boards = [];
		return $q(function(resolve, reject) {
			// console.log("user id?", AuthFactory.getUser());
			$http.get(`${FirebaseURL}/boards.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
			.success(function(boardsObj) {
				// console.log("boardsObj", boardsObj);
				//create array from object and loop thru keys to push each board to the boards array
				Object.keys(boardsObj).forEach(function(key){
					boards.push(boardsObj[key]);
				});
				// console.log("boards:", boards);
				resolve (boards);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	let postNewBoard = function(newBoard){
		return $q(function(resolve, reject){
			$http.post(`${FirebaseURL}/boards.json`,
				JSON.stringify(newBoard))
			.success(function(ObjFromFirebase){
				let newBoardId = ObjFromFirebase.name;
				newBoard.boardid = newBoardId;
				// console.log("<<<", newBoard.boardid);
				$http.put(`${FirebaseURL}/boards/${newBoardId}.json`, newBoard);
				resolve(ObjFromFirebase);
			})
			.error(function(error){
				reject(error);
			});
		});
	};

		let postNewPin = function(newPin){
		return $q(function(resolve, reject){
			$http.post(`${FirebaseURL}/pins.json`,
				JSON.stringify(newPin))
			.success(function(ObjFromFirebase){
<<<<<<< HEAD
				console.log("ObjFromFirebase", ObjFromFirebase);
=======
				console.log("ObjFromFirebase");
>>>>>>> f5d32696f9db40dbfbe0bd0f5b77e9005adc54d2
				let newPinId = ObjFromFirebase.name;
				newPin.pinId = newPinId;
				console.log("<<<", newPin.pinId);
				$http.put(`${FirebaseURL}/pins/${newPinId}.json`, newPin);
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

	let setCurrentBoardId = function(boardId){
		currentBoardId = boardId;
		console.log("currentBoardId set to:", currentBoardId);
	};

	let getCurrentBoardId = function(){
		return currentBoardId;
	};


	let getPins = function(boardId) {
		currentBoardId = boardId;
		let pins = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/pins.json?orderBy="boardid"&equalTo="${boardId}"`)
			.success(function(pinsObj) {
				console.log("pinsObj", pinsObj);
				//create array from object and loop thru keys to push each pin to the pins array
				Object.keys(pinsObj).forEach(function(key){
					pins.push(pinsObj[key]);
				});
				console.log("pins:", pins);
				resolve (pins);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	let deletePin = function(removeId){
		let pinUrl = FirebaseURL + "/pins/" + removeId + ".json";
		return $q(function(resolve, reject){
			$http.delete(pinUrl)
				.success(function(){
					resolve();
				});
		});
	};


	return {getBoards, deleteBoard, postNewBoard, getCurrentBoardId, setCurrentBoardId, getPins, deletePin, postNewPin};
	
});



