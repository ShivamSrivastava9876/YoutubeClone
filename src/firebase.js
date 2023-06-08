import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA-y48Wod8aL7jl1DA9BzRjgVv0OKgwL5I",
    authDomain: "yt-clone-project-react.firebaseapp.com",
    projectId: "yt-clone-project-react",
    storageBucket: "yt-clone-project-react.appspot.com",
    messagingSenderId: "417096543725",
    appId: "1:417096543725:web:ed3c0f6026b02deb55cbe4"
  };

  export const appConnect = initializeApp(firebaseConfig);
  export const auth = getAuth(appConnect);