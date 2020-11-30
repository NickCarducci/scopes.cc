import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDPI3t8wz6RReyu-jUQGuKyoIYdTNDysws",
  authDomain: "scopebook-ewb6x.firebaseapp.com",
  databaseURL: "https://scopebook-ewb6x.firebaseio.com",
  projectId: "scopebook-ewb6x",
  storageBucket: "scopebook-ewb6x.appspot.com",
  messagingSenderId: "978202987446",
  appId: "1:978202987446:web:7909436e50fdd4fa9b4f17"
};
export const firebaseApp =
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);

firebaseApp &&
  firebaseApp.firestore().enablePersistence({ synchronizeTabs: true });

export default firebase;
