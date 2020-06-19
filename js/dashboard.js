
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
    alert("Some Problem while logging out!");
  });
}

var rootRef = firebase.database().ref().child('users');
rootRef.on("child_added", snap => {
  console.log("Entered rootRef");
  var sapId = snap.child("sapid").val();
  var name = snap.child("username").val();
  var courseName = snap.child("coursename").val();
  var courseId = snap.child("courseid").val();
  var date = snap.child("submissiondate").val();
  var milliseconds = Date.parse(new Date(date));
  // var fileUrl = snap.child("fileStatus").val();
  //Create a storage reference
  var storageRef = firebase.storage().ref('files/' + sapId + '_'+ courseId +'_1.pdf'); //Course File
  var storageRef2 = firebase.storage().ref('files/' + sapId +'_'+ courseId + '_2.pdf'); //Attendance Register
  storageRef.getDownloadURL().then(function (url) {
    //Fetching Attendance Register Data
    storageRef2.getDownloadURL().then(function (xurl){
      // Insert url into an <img> tag to "download"
    var t = $('#example1').DataTable();
    t.row.add([
      sapId,
      name,
      courseName,
      courseId,
      `<span style='display: none;'>${millisecond}</span> date`,
      "<a href=\""+url+"\" target=\"_blank\">Course File</a>, <a href=\""+xurl+"\" target=\"_blank\">Attendance Register</a> "

    ]).draw(false);
    })


  }).catch(function (error) {

    switch (error.code) {
      case 'storage/object_not_found':
        console.log('File does not exist!');
        break;

      case 'storage/unauthorized':
      console.log('Sorry, You do not have access to view the file!');
        break;

      case 'storage/canceled':
        // User canceled the upload
        console.log('User has canceled the upload!');
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.log('Unknown Error! Please contact maintainence ...');
        break;
    }
  });

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
