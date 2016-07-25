"use strict";

var app = angular.module("LostPinterest", ['ngRoute'])
.constant('FirebaseURL', "https://lostpinterest.firebaseio.com/");

app.config(function($routeProvider) {
  // let authConfig = {
  //   apiKey: FBCreds.apiKey,
  //   authDomain: FBCreds.authDomain
  // };
  // firebase.initializeApp(authConfig);

  $routeProvider
    .when('/', {
      templateUrl: "partials/splash.html",
      controller: "SplashCtrl"
    }).otherwise('/');
});

