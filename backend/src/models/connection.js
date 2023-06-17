const firebaseApp = require("firebase/app");
const firestore = require("firebase/firestore");
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};
  
const firebaseInit =  firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(firebaseInit);

module.exports = {firestore, db};