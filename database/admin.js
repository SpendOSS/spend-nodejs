let admin = require("firebase-admin");
require("dotenv").config();
let serviceAccount;
if(process.env.ENVIRONMENT === 'development'){
  serviceAccount = require("./adminsdk.json");
} else {
  serviceAccount = require("/etc/secrets/adminsdk.json");
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
