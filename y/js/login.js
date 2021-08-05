window.onload = function() {

  var googlesignin = document.getElementById("googlesignin");
  // var applesignin = document.getElementById("applesignin");
  // var faceboooksignin = document.getElementById("faceboooksignin");
  // var twittersignin = document.getElementById("twittersignin");
  var signupbox = document.getElementById("signupsection");
  var enteryourdetailsbox = document.getElementById("enteryourdetails");
  var progressbar = document.getElementById("progressbar");
  var saveprofile = document.getElementById("save_profile");

  var USERID="";

  check_if_cookies_exist();

  googlesignin.addEventListener('click', (e) => {
    document.getElementById("signupsection").style.display = 'none';
    document.getElementById("progressbar").style.display = 'block';
    let provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(res => {
      console.log(res.user.uid)
      // setCookies("wenergiedesigntool.uid", res.user.uid, 100);
      signin_on_success(res.user.uid);
    }).catch(e => {
      console.log(e)
      document.getElementById("signupsection").style.display = 'block';
      document.getElementById("progressbar").style.display = 'none';
    })
    console.log("clicked google sign in button ");




  })

  // applesignin.addEventListener('click', (e) => {
  //
  //   var provider = new firebase.auth.OAuthProvider('apple.com');
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //
  //       // var credential = result.credential;
  //
  //       // var user = result.user;
  //
  //       // You can also get the Apple OAuth Access and ID Tokens.
  //       // var accessToken = credential.accessToken;
  //       // var idToken = credential.idToken;
  //
  //       // ...
  //       signin_on_success("abbs");
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //
  //       // ...
  //     });
  //   console.log("clicked apple sign in button ");
  //
  // })

  // faceboooksignin.addEventListener('click', (e) => {
  //
  //   console.log("clicked facebooke sign in button ");
  //
  // })
  //
  //
  // twittersignin.addEventListener('click', (e) => {
  //
  //   console.log("clicked twitter sign in button ");
  //
  // })



  function signin_on_success(userid) {

    USERID=userid;

    save_user(userid);

  }

  function check_if_cookies_exist() {


    //yes //check profile details added



    //else //show login function



    setTimeout(function() {
      document.getElementById("progressbar").style.display = 'none';
      document.getElementById("signupsection").style.display = 'block';
    }, 3000);


  }



  function save_cookies() {

  }


  saveprofile.addEventListener('click', (e) => {
    var confirm = 5;



    var regName =/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    var name = document.getElementById('username').value;
    console.log(name);
    console.log(regName.test(name));
    if (!regName.test(name)) {
      document.getElementById("error_username").style.display = 'block';
      setTimeout(function() {
        document.getElementById("error_username").style.display = 'none';
      }, 3000);
      confirm = confirm - 1;

    }else{
      console.log("valid");
    }

    var a = /^\d{10}$/;
    if (!a.test(document.getElementById("userphonenumber").value)) {
      document.getElementById("error_phonenumber").style.display = 'block';
      setTimeout(function() {
        document.getElementById("error_phonenumber").style.display = 'none';
      }, 3000);
      confirm = confirm - 1;
    }
    var b = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!b.test(document.getElementById("useremailid").value)) {
      document.getElementById("error_emailid").style.display = 'block';
      setTimeout(function() {
        document.getElementById("error_emailid").style.display = 'none';
      }, 3000);
      confirm = confirm - 1;
    }


    console.log(document.getElementById("company_name").value);
    if (!regName.test(document.getElementById("company_name").value)) {
      document.getElementById("error_companyname").style.display = 'block';
      setTimeout(function() {
        document.getElementById("error_companyname").style.display = 'none';
      }, 3000);
      confirm = confirm - 1;

    }


    if (confirm == 5) {
      console.log('saving profile');
        document.getElementById("enteryourdetails").style.display = 'none';
       document.getElementById("progressbar").style.display = 'block'
       save_profile_data(document.getElementById('username').value,document.getElementById("userphonenumber").value,document.getElementById("useremailid").value,document.getElementById("company_name").value);
    }




  })


  function save_user(value) {

    // firebase.database().ref('/USERS' + userid).set({
    //   status:1,
    //   lastsignin:new Date().getTime()
    // }, (error) => {
    //   if (error) {
    //         console.log(error);
    //   } else {
    //     // Data saved successfully!
    //     document.getElementById("signupsection").style.display = 'none';
    //     document.getElementById("enteryourdetails").style.display = 'block';
    //   }
    // });

    this.database = firebase.database();
    let userRef = this.database.ref('USERS');
    userRef.child(
      value).set({
      status: 1,
      lastsignin: new Date().getTime()

    }, (error) => {
      if (error) {
        console.log(error);
        alert("Error:1 Network issue");
        document.getElementById("signupsection").style.display = 'block';
        // document.getElementById("enteryourdetails").style.display = 'block';
        document.getElementById("progressbar").style.display = 'none'
      } else {



        check_if_profile_details_exist();
      }
    })
  }



  function check_if_profile_details_exist() {
    this.database = firebase.database();
    let path = this.database.ref('USERDATA/'+USERID);
    path.once("value", snapshot => {
      if (snapshot.exists()) {
        console.log("exists!");
        localStorage.setItem("USERID", USERID);
        window.document.location = './dashboard.html';

      } else {
        console.log("not exist");
        document.getElementById("progressbar").style.display = 'none'
        document.getElementById("enteryourdetails").style.display = 'block';
       

      }
    });






  }

   function save_profile_data(name ,phonenumber,emailid,companyname,userid){
     this.database = firebase.database();
     let userRef = this.database.ref('USERDATA');
     userRef.child(
       USERID).set({
       name:name,
       phonenumber:phonenumber,
       emailid:emailid,
       companyname:companyname,
       firstsignedin: new Date().getTime()

     }, (error) => {
       if (error) {
         console.log(error);
         alert("Error:1 Network issue");
         document.getElementById("enteryourdetails").style.display = 'block';
         document.getElementById("progressbar").style.display = 'none'
       } else {


        alert("successfully");

       }
     }
     );

   }


}
