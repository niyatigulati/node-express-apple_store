console.log("javascript login page file is loaded")

var firebaseConfig = {
    apiKey: "AIzaSyAE0yJXWqkrYc7-4dTBalw0W7QnoDATdqk",
    authDomain: "fir-form-ae3ad.firebaseapp.com",
    databaseURL: "https://fir-form-ae3ad.firebaseio.com",
    projectId: "fir-form-ae3ad",
    storageBucket: "fir-form-ae3ad.appspot.com",
    messagingSenderId: "455755025639",
    appId: "1:455755025639:web:55fdf9bfd3792d6576a642",
    measurementId: "G-HLXYBMNV95"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




//Login Page


const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnlogin = document.getElementById('btn');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('log');

btnlogin.addEventListener('click', e => {
    console.log("log button clicked")
        //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;

    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {
        console.log(e.message)
    })
})

btnSignUp.addEventListener('click', e => {
    console.log("sign button clicked")
        //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;

    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => {
        console.log(e.message)
    })
})



//add a real time authentication Listener

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        location.replace("http://localhost:3000/index")
    } else {
        console.log("not logged in")
    }
})
console.log("logininin")