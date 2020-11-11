import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAv773xEN_r3_yYHppzrcwA601d_kYGffI",
    authDomain: "checkin-e8bea.firebaseapp.com",
    databaseURL: "https://checkin-e8bea.firebaseio.com",
    projectId: "checkin-e8bea",
    storageBucket: "checkin-e8bea.appspot.com",
    messagingSenderId: "683436459496",
    appId: "1:683436459496:web:6d2225d9844286bb46905d",
    measurementId: "G-D8V9MBGRDJ"
};

firebase.initializeApp(firebaseConfig);

export const fs = firebase.firestore();
export const auth = firebase.auth();