const firebase=require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDkuLMZpYJJl92-lU8PCkBk69UitOUwBFI",
    authDomain: "codeletpro.firebaseapp.com",
    projectId: "codeletpro",
    storageBucket: "codeletpro.appspot.com",
    messagingSenderId: "146742017688",
    appId: "1:146742017688:web:d00898726d96110700daed",
    measurementId: "G-F3JPHCR3ZD"
};

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const User=db.collection("Users");
const Question=db.collection("Questions");
module.exports = { User, Question, db };