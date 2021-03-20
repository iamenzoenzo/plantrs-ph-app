import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyD-bwszv_-NHq6341_N0jnQDlw5IAvxVaE',
	authDomain: 'plantrs-ph.firebaseapp.com',
	databaseURL: 'https://plantrs-ph.firebaseio.com',
	projectId: 'plantrs-ph',
	storageBucket: 'plantrs-ph.appspot.com',
	messagingSenderId: '242172530328',
	appId: '1:242172530328:web:39b5ddc54ebc0f63308aed',
	measurementId: 'G-W1V31W176R',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };