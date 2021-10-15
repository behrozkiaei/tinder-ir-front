// Import the functions you need from the SDKs you need

import {
    initializeApp
} from "firebase/app";


import {
    getMessaging
} from "firebase/messaging";
import {
    onBackgroundMessage
} from "firebase/messaging/sw";

const firebaseConfig = {
    apiKey: "AIzaSyBxeVrVVWXKCFupPnjszD90Dl-mHVA8-Zo",
    authDomain: "tinder-ir.firebaseapp.com",
    projectId: "tinder-ir",
    storageBucket: "tinder-ir.appspot.com",
    messagingSenderId: "834912299201",
    appId: "1:834912299201:web:17bfdc4a75ce1b01290c40",
    measurementId: "G-XK9LHB51FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// {
//     "subject": "mailto: <behrozkiaei1@gmail.com>",
//     "publicKey": "BHcXlIz0DUJl0zelpS5frclinCfZE2mZffMus7jJjIBcF5K_D45iC2Rzz1dW2hi8Dbup4ViymCOgcNCRkLH3Xh0",
//     "privateKey": "uyPair3gqVt0jCwJc3c2yTFQ2-6wLyryZtvDZR4aC-Q"
// }