
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


  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // User is not signed in.
        window.location = './admin.html';
    } 
    if(user){
      document.getElementById("wrap").style.visibility = "visible";
    }
  });

  //Log Out

  function logout()
  {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("logged out!")
      window.location = './admin.html'; //After successful login, user will be redirected to home.html
    
    }).catch(function(error) {
      //[TODO: HANDEL EXCEPTION]
    });
  }

  var rootRef = firebase.database().ref().child('users');

    rootRef.on("child_added", snap => {

      var sapId = snap.child("sapid").val();
      var name = snap.child("username").val();
      var fileUrl = snap.child("fileStatus").val();

      var t = $('#example1').DataTable();
      t.row.add( [
        sapId,
        name ,
        "<a href=\""+fileUrl+"\" target=\"_blank\">Download</a>"
    ] ).draw( false );

    });


    function showUserManagement(){
        $("#view_records").hide();
        $("#user_management").show();
        $("#viewRecords").removeClass("active");
        $("#userManagement").addClass("active");
       
    }

    function showViewRecords(){
      $("#user_management").hide();
        $("#view_records").show();
        $("#userManagement").removeClass("active");
        $("#viewRecords").addClass("active");
        
    }
