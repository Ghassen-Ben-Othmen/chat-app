const admin = require("firebase-admin");
const firebase = require("firebase");
const config = require("../config/config");
const serviceAccount = require("../config/serviceAccount.json");

// initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// initialize firebase
firebase.initializeApp(config);

exports.admin = admin;
exports.firebase = firebase;
