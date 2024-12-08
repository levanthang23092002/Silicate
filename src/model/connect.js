
// const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://silicate-5077b-default-rtdb.asia-southeast1.firebasedatabase.app"
// });
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://silicate-5077b-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = admin;
