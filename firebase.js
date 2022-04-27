// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import {
	getFirestore,
	collection,
	doc,
	addDoc,
	getDocs,
	onSnapshot,
	getDoc,
	deleteDoc,
	updateDoc
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCaFAqE0e8TcsSCTdl3fRaJI9BLDwf3spo',
	authDomain: 'fir-node-84234.firebaseapp.com',
	projectId: 'fir-node-84234',
	storageBucket: 'fir-node-84234.appspot.com',
	messagingSenderId: '584327676765',
	appId: '1:584327676765:web:29442f977936d175619eb4'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Add task
export const saveTask = async (title, description) => {
	try {
		await addDoc(collection(db, 'tasks'), { title, description });
	} catch (error) {
		console.error('Error adding task: ', error);
	}
};

// Get tasks
export const getTasks = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'tasks'));
		return querySnapshot;
	} catch (error) {
		console.error('Error obtaining getTasks: ', error);
		return null;
	}
};

// On change tasks
export const onChangeTasks = async callback => {
	try {
		await onSnapshot(collection(db, 'tasks'), callback);
	} catch (error) {
		console.error('Error obtaining tasks on change event: ', error);
	}
};

// get task
export const getTask = async id => {
	try {
		const querySnapshot = await getDoc(doc(db, 'tasks', id));
		return querySnapshot.data();
	} catch (error) {
		console.error('Error deleting task: ', error);
		return null;
	}
};

// Delete task
export const deleteTask = async id => {
	try {
		await deleteDoc(doc(db, 'tasks', id));
	} catch (error) {
		console.error('Error deleting task: ', error);
	}
};

// Update task
export const updateTask = async (id, data) => {
	try {
		await updateDoc(doc(db, 'tasks', id), data);
	} catch (error) {
		console.error('Error updating task: ', error);
	}
};
