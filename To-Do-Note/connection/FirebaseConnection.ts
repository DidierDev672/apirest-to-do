const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require("./bookstore-c4060-firebase-adminsdk-ntlf0-b39c2bea8d.json");

initializeApp({
    credential: cert(serviceAccount)
});

export const db = getFirestore();