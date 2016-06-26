'use strict';
//back /reload warning
//window.onbeforeunload = function() { return "You work will be lost."; };
var app = firebase.database();


// $( "#signIn" ).load( "ajax/dashboard.html", function() {
//   alert( "Load was performed." );
// });

//Ajax loads
  // $('#signIn').on('click', function(event){
  //   event.preventDefault();
  //   console.log("button clicked");

  //   $('body').load('dashboard.html');

  // });

  // $('#signUp').on('click', function(event){
  //   event.preventDefault();
  //   console.log("button clicked");
  //
  //   $('body').load('create.html');
  //
  // });

  $('.toggle').on('click', function(){
    $('#form-signin').toggleClass('hidden');
    $('#form-create').toggleClass('hidden');

  });

$('i.fa-caret-square-o-right').on('click', function(){
  $('.sidebar').toggleClass('collapsed');

  //if sidebar collapsed
  var $sidebar = $('.sidebar');
  if( $sidebar.hasClass('collapsed') ){
    //wrapper offset = 100px
    $('#sidebarTitle').toggleClass('hidden');
    $('.wrapper').removeClass('offset');
    $('span#dataAddress').addClass('hidden');
  } else{
    //else wrapper offset = widht of sidebar
    $('#sidebarTitle').toggleClass('hidden');
    $('.wrapper').addClass('offset');
    $('span#dataAddress').removeClass('hidden');
  };
});







function SetSrc() {
    document.getElementById('Iframe').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe2').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe3').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe4').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe5').src = document.getElementById('txtSRC').value;

    $("li").removeClass('active');
}

//Sign Out
$('#signOut').on('click', function(){
  firebase.auth().signOut();
  console.log('signed out and loading index');
});


//Sign in
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
        console.log('signed out and loading index');
        // $('body').load('index.html');
        //load index
      } else {
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            console.error(error);
            console.log(error);
            //display error on page
          }
          // [END_EXCLUDE]
        });
        // [END authwithemail]

      }
       document.getElementById('signIn').disabled = true;

    }

//Create user
    function handleSignUp() {
      var email = document.getElementById('createEmail').value;
      var password = document.getElementById('createPassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          console.error(error);
          alert(error);
        }
        // [END_EXCLUDE]
      });
      // [END createwithemail]
      console.log('user created');
      // load dashboard
      //$('body').load('dashboard.html');
    }

    /**
     * Handles registering callbacks for the auth status.
     *
     * This method registers a listener with firebase.auth().onAuthStateChanged. This listener is called when
     * the user is signed in or out, and that is where we update the UI.
     *
     * When signed in, we also authenticate to the Firebase Realtime Database.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var refreshToken = user.refreshToken;
          var providerData = user.providerData;
           console.log('signed in and loading dashboard');
             //load dashboard
          // $('body').load('dashboard.html');
           $('#forms').addClass('hidden');
          $('#dashboard').removeClass('hidden');

          // [START_EXCLUDE silent]
          //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('signIn').textContent = 'Sign out';
          // document.getElementById('quickstart-account-details').textContent = JSON.stringify({
          //   displayName: displayName,
          //   email: email,
          //   emailVerified: emailVerified,
          //   photoURL: photoURL,
          //   isAnonymous: isAnonymous,
          //   uid: uid,
          //   refreshToken: refreshToken,
          //   providerData: providerData
          // }, null, '  ');
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          $('#dashboard').addClass('hidden');
          $('#forms').removeClass('hidden');
          // [START_EXCLUDE silent]
          // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('signIn').textContent = 'Sign in';
          // document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
         document.getElementById('signIn').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]

      document.getElementById('signIn').addEventListener('click', toggleSignIn, false);
      document.getElementById('create').addEventListener('click', handleSignUp, false);
    }

    window.onload = function() {
      initApp();
    };




//add source to side menu
// function addSrc() {
//     var html = '<li><a href="' + document.getElementById("txtSRC").value + '"><i class="fa fa-circle-o" aria-hidden="true"></i>' + ' ' + document.getElementById('txtSRC').value + '</a></li>';

//     $(html).appendTo('#saved_menu ul');
// }


//remove source from side menu
// function removeSrc() {
//     $('ul#nav-sidebar li').on('click', function() {
//         console.log('trash clicked');
//         //  $('#saved_menu ul li').remove();

//     });
// }

//TODO TASKS
// CLEAN UP



// N/A partials for dashboard / create.htmls
// DONE load flicker
// DONE auth profiles
// DONE disable responsive
// DONE collapseable sidebar
// DONE disable back button action
// DONE load views via ajax calls
// DONE blank state sidebar
// DONE click saved to reload frames
// DONE make signin  = index
// DONE sign in/out routes
// DONE toggle trash icon on hover (done in css)

// styles
//branding
//colors
//DONE sidebar hover width
//DONE sidebar active state
//DONE type

//NEXT
// associate enter button press to GO
//Load time
//electron app
// *better way to store firebase keys
// input style parsing (if no http add http)?




//firebase
//auth
// var ref = new Firebase("https://demo.firebaseio-demo.com");
// var authClient = new FirebaseAuthClient(ref, function(error, user) {
//   if (error) {
//     alert(error);
//     return;
//   }
//   if (user) {
//     // User is already logged in.
//     doLogin(user);
//   } else {
//     // User is logged out.
//     showLoginBox();
//   }
// });

// //registration
// function showLoginBox() {
//   ...
//   // Do whatever DOM operations you need to show the login/registration box.
//   $("#registerButton").on("click", function() {
//     var email = $("#email").val();
//     var password = $("#password").val();
//     authClient.createUser(email, password, function(error,  user) {
//       if (!error) {
//         doLogin(user);
//       } else {
//         alert(error);
//       }
//     });
//   });
// }

// //login
// function showLoginBox() {
//   ...
//   // Do whatever DOM operations you need to show the login/registration box.
//   $("#loginButton").on("click", function() {
//     authClient.login("password", {
//       email: $("#email").val(),
//       password: $("#password").val(),
//       rememberMe: $("#rememberCheckbox").val()
//     });
//   });
// }



//Database
var savedSites = app.ref('saved_sites');

savedSites.on('value', function(results) {
    $('#saved_menu').empty();


        if (results.exists() !== true) {

         //console.log('no data');
            $('#saved_menu').append('<li class="text-center" style="margin-top: 10px;">You have nothing saved.</li>');
        }
    results.forEach(function(messageContainer) {

        var data = messageContainer.val();

        var html = '<li><a title="' + data.address + '"><i class="fa fa-circle-o" aria-hidden="true"></i><span id="dataAddress" class="hidden">'+ ' ' + data.address + '</span><i class="fa fa-trash-o" aria-hidden="true" id="trash"></i></a></li>';



        var $message = $(html).appendTo('#saved_menu');


        //click source to display in frames

        function recallSrc() {
    document.getElementById('Iframe').src  = data.address;
    document.getElementById('Iframe2').src = data.address;
    document.getElementById('Iframe3').src = data.address;
    document.getElementById('Iframe4').src = data.address;
    document.getElementById('Iframe5').src = data.address;
}
        $message.on('click', function(event) {
            event.preventDefault();
            $("li").removeClass('active');
            $(this).addClass('active');
            recallSrc();

        });

        //         $message.on('click', '#dataAddress', function(event) {
        //     event.preventDefault();
        //     $("li").removeClass('active');
        //     $(this).addClass('active');
        //     recallSrc();

        // });



        //remove source in firebase
        $message.on('click', '#trash', function(event) {
            event.preventDefault();
            app.ref('saved_sites/' + messageContainer.key).remove();

                  //if sidebar collapsed
  var $sidebar = $('.sidebar');
  if( $sidebar.hasClass('collapsed') ){
    //wrapper offset = 100px
    $('#sidebarTitle').addClass('hidden');
    $('.wrapper').removeClass('offset');
    $('span#dataAddress').addClass('hidden');
  } else{
    //else wrapper offset = widht of sidebar
    $('#sidebarTitle').removeClass('hidden');
    $('.wrapper').addClass('offset');
    $('span#dataAddress').removeClass('hidden');
  };
        });
    });
});


//store source in firebase
$('#newPost').submit(function(event) {
    // This prevents the browser from submitting the form
    event.preventDefault();

    var siteURL = $('#newPost input').val();

    app.ref('saved_sites').push({
        address: siteURL
    });

      //if sidebar collapsed
  var $sidebar = $('.sidebar');
  if( $sidebar.hasClass('collapsed') ){
    //wrapper offset = 100px
    $('#sidebarTitle').addClass('hidden');
    $('.wrapper').removeClass('offset');
    $('span#dataAddress').addClass('hidden');
  } else{
    //else wrapper offset = widht of sidebar
    $('#sidebarTitle').removeClass('hidden');
    $('.wrapper').addClass('offset');
    $('span#dataAddress').removeClass('hidden');
  };

});



// $('#saved_menu li a').on('click', function(event) {
//     event.preventDefault();
//     console.log('recalled clicked');
//     //add active class to <li> on click
//     $('#saved_menu li').addClass('active');
// });
