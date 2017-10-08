import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCAndawPNofKLlN9W3EjWGYtqYnH1CneSc",
    authDomain: "movie-trailer-175012.firebaseapp.com",
    databaseURL: "https://movie-trailer-175012.firebaseio.com",
    projectId: "movie-trailer-175012",
    storageBucket: "movie-trailer-175012.appspot.com",
    messagingSenderId: "584104791052"
  };

firebase.initializeApp(config);

export default firebase
