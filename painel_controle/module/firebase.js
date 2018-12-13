import firebase from 'node_modules/firebase/app';
import 'node_modules/firebase/auth';
import 'node_modules/firebase/database';

var config = {
  apiKey: "AIzaSyAGMsxDEhzcMKvgkDz-yMicw7W445Avjl8",
  authDomain: "educapp-32f89.firebaseapp.com",
  databaseURL: "https://educapp-32f89.firebaseio.com",
  projectId: "educapp-32f89",
  storageBucket: "educapp-32f89.appspot.com",
  messagingSenderId: "819038087337"
};
	var f = firebase.initializeApp(config);
	module.exports.FBApp = FbApp.database();
