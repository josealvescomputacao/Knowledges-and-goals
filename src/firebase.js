import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCWGUoYbBYdKBjJOr1WIZdixmpni4qJLtA",
    authDomain: "knowledgesandgoals.firebaseapp.com",
    databaseURL: "https://knowledgesandgoals.firebaseio.com",
    projectId: "knowledgesandgoals",
    storageBucket: "knowledgesandgoals.appspot.com",
    messagingSenderId: "541510709559"
}
firebase.initializeApp(config)


export const providers = {
   google: new firebase.auth.GoogleAuthProvider(),
   facebook: new firebase.auth.FacebookAuthProvider()
}  

export const auth = firebase.auth()
export const database = firebase.database()
export const storage = firebase.storage()
