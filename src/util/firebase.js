// import firebase from "firebase";

//   const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyD-bwszv_-NHq6341_N0jnQDlw5IAvxVaE",
//     authDomain: "plantrs-ph.firebaseapp.com",
//     databaseURL: "https://plantrs-ph.firebaseio.com",
//     projectId: "plantrs-ph",
//     storageBucket: "plantrs-ph.appspot.com",
//     messagingSenderId: "242172530328",
//     appId: "1:242172530328:web:39b5ddc54ebc0f63308aed",
//     measurementId: "G-W1V31W176R",
//     GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyAcqsXDR-HWzNQkALEtgAsxuAoNvNFOklE"
//   });

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyC6PgaK_U--o2iPbbxpC-oMWflDDo_zBYQ',
	authDomain: 'my-first-app-a99c5.firebaseapp.com',
	databaseURL: 'https://my-first-app-a99c5.firebaseio.com',
	projectId: 'my-first-app-a99c5',
	storageBucket: 'my-first-app-a99c5.appspot.com',
	messagingSenderId: '1010784049133',
	appId: '1:1010784049133:web:3d20fcfadf4bc9b15ef9e4',
	measurementId: 'G-FHZEFQB92P',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { projectStorage, projectFirestore, timestamp, db, auth, storage };
//   export { db, auth, storage };
