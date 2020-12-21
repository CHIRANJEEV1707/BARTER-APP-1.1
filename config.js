import firebase from 'firebase';
require ('@firebase/firestore')

var firebaseConfig = {
          apiKey: "AIzaSyAkkiEga2I5gMgLNP4y2BXyXoUrmqLWdO4",
          authDomain: "barter-app-c4529.firebaseapp.com",
          databaseURL: "https://barter-app-c4529.firebaseio.com",
          projectId: "barter-app-c4529",
          storageBucket: "barter-app-c4529.appspot.com",
          messagingSenderId: "253979075679",
          appId: "1:253979075679:web:e127fc19e0a84c787c27ea"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
      

        export default firebase.firestore();