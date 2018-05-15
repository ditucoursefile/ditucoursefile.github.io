
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



firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // User is not signed in.
    window.location = './admin.html';
  }
  if (user) {
    document.getElementById("wrap").style.visibility = "visible";
  }
});

//Log Out

function logout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    window.location = './admin.html'; //After successful login, user will be redirected to home.html

  }).catch(function (error) {
    //[TODO: HANDEL EXCEPTION]
  });
}

var rootRef = firebase.database().ref().child('users');
rootRef.on("child_added", snap => {
  console.log("Entered rootRef");
  var sapId = snap.child("sapid").val();
  var name = snap.child("username").val();
  var courseName = snap.child("coursename").val();
  var courseId = snap.child("courseid").val();
  // var fileUrl = snap.child("fileStatus").val();
  //Create a storage reference
  var storageRef = firebase.storage().ref('files/' + sapId + '.pdf');
  storageRef.getDownloadURL().then(function (url) {
    // Insert url into an <img> tag to "download"
    var t = $('#example1').DataTable();
    t.row.add([
      sapId,
      name,
      courseName,
      courseId,
      "<a href=\""+url+"\" target=\"_blank\">Download</a>"

    ]).draw(false);


  }).catch(function (error) {

    switch (error.code) {
      case 'storage/object_not_found':
        alert('File does not exist!');
        break;

      case 'storage/unauthorized':
        alert('Sorry, You do not have access to view the file!');
        break;

      case 'storage/canceled':
        // User canceled the upload
        alert('User has canceled the upload!');
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        alert('Unknown Error! Please contact maintainence ...');
        break;
    }
  });
  // console.log(fileUrl);

});


function showUserManagement() {
  $("#view_records").hide();
  $("#user_management").show();
  $("#viewRecords").removeClass("active");
  $("#userManagement").addClass("active");

}

function showViewRecords() {
  $("#user_management").hide();
  $("#view_records").show();
  $("#userManagement").removeClass("active");
  $("#viewRecords").addClass("active");

}
