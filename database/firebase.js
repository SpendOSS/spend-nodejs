const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCgXQXt-NmsihxfFrcoCsnLeDZpgs_Hyzs",
  authDomain: "spendui.firebaseapp.com",
  projectId: "spendui",
  storageBucket: "spendui.appspot.com",
  messagingSenderId: "259240200432",
  appId: "1:259240200432:web:29aaf8e9bccedd638f5a35",
  measurementId: "G-5L9LHB0TKG"
};

firebase.initializeApp(firebaseConfig); //initialize firebase app
module.exports = { firebase }; //export the app
