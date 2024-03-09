let admin = require("firebase-admin");
let serviceAccount = require("/etc/secrets/adminsdk.json");
// let serviceAccount = require("./adminsdk.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
