"use strict";

var app = angular.module("LostPinterest", ['ngRoute'])
  .constant('FirebaseURL', "https://lostpinterest.firebaseio.com/");

app.config(function($routeProvider, FBCreds) {
  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };
  firebase.initializeApp(authConfig);

  $routeProvider
  	.when('/boards', {
  		templateUrl: "partials/boards.html",
  		controller: "BoardsCtrl"
  	})
  	.when('/pins', {
  		templateUrl: "partials/pins.html",
  		controller: "PinsCtrl"
  	})
  	.when('/newBoard', {
      templateUrl: "partials/newBoard.html",
      controller: "NewBoardCtrl"
    })
    .when('/newPins', {
  		templateUrl: "partials/newPins.html",
  		controller: "NewPinsCtrl"
  	})
    .when('/', {
      templateUrl: "partials/splash.html",
      controller: "SplashCtrl"
    }).otherwise('/');
});

