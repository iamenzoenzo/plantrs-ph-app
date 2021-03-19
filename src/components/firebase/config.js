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

export { projectStorage, projectFirestore, timestamp };
