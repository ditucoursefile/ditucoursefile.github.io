
// Firebase Config

// Initialize Firebase

  var config = {
    apiKey: "AIzaSyB3h7qEN2d2ib7BolmphX3j-ifWQbABMJk",
    authDomain: "fir-form-7a181.firebaseapp.com",
    databaseURL: "https://fir-form-7a181.firebaseio.com",
    projectId: "fir-form-7a181",
    storageBucket: "fir-form-7a181.appspot.com",
    messagingSenderId: "44081002430"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(user => {
    
    if(user) {
      document.getElementById("msgBox").innerHTML = 'Loading ... Please Wait! ';
      window.location = './dashboard.html'; //After successful login, user will be redirected to home.html
    }
    if(!user){
      document.getElementById("login").style.visibility = "visible";
    }

  });

//Log In
function login(){
  document.getElementById("msgBox").innerHTML = 'Validating User ... ';
  txtEmail = document.getElementById("txtEmail").value;
  txtPassword = document.getElementById("txtPassword").value;
  btnLogin = document.getElementById("btnLogin").value;
  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password' || errorCode === 'auth/wrong-email') {
      document.getElementById("msgBox").innerHTML= "Wrong Username or Password";
    }
    else if (errorCode === 'auth/user-disabled') {
      document.getElementById("msgBox").innerHTML= "Your account has been disabled";
    }
    else{
      document.getElementById("msgBox").innerHTML="We don't recognize you!"
    }
    // ...
  });
  
  document.getElementById("msgBox").innerHTML = 'Loading ... Please Wait! ';
  
  //Login Successfull!
  firebase.auth().onAuthStateChanged(user => {
    
    if(user) {
      window.location = './dashboard.html'; //After successful login, user will be redirected to home.html
    }
  });
}
  
