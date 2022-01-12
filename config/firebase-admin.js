// this admin file takes care of encrypting (../secret.json) and check if allowed in app
const admin = require("firebase-admin");
const serviceAccount = require("../secret.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://journeymanapp-17b05.firebaseio.com",
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};
