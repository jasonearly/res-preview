'use strict';
//back /reload warning
window.onbeforeunload = function() {
    return "You work will be lost.";
};
var app = firebase.database();

//Log in / Create account menu toggle
$('.toggle').on('click', function() {
    $('#form-signin').toggleClass('hidden');
    $('#form-create').toggleClass('hidden');

});

function isCollapsed() {
    //if sidebar collapsed
    var $sidebar = $('.sidebar');
    if ($sidebar.hasClass('collapsed')) {
        //wrapper offset = 100px
        $('#sidebarTitle').addClass('hidden');
        $('.wrapper').removeClass('offset');
        $('span#dataAddress').addClass('hidden');
    } else {
        //else wrapper offset = widht of sidebar
        $('#sidebarTitle').removeClass('hidden');
        $('.wrapper').addClass('offset');
        $('span#dataAddress').removeClass('hidden');
    };
}


$('#collapseMenu').on('click', function() {
    $('.sidebar').toggleClass('collapsed');
    isCollapsed();

});


//Gets address and displays in frames
function SetSrc() {
    document.getElementById('Iframe').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe2').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe3').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe4').src = document.getElementById('txtSRC').value;
    document.getElementById('Iframe5').src = document.getElementById('txtSRC').value;

    $("li").removeClass('active');
}

//Sign Out
$('#signOut').on('click', function() {
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

        var html = '<li><a title="' + data.address + '"><i class="fa fa-circle-o" aria-hidden="true"></i><span id="dataAddress" class="hidden">' + ' ' + data.address + '</span><i class="fa fa-trash-o" aria-hidden="true" id="trash"></i></a></li>';

        var $message = $(html).appendTo('#saved_menu');


        //click source to display in frames
        function recallSrc() {
            document.getElementById('Iframe').src = data.address;
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

        //remove source in firebase
        $message.on('click', '#trash', function(event) {
            event.preventDefault();
            app.ref('saved_sites/' + messageContainer.key).remove();
            isCollapsed();
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

    isCollapsed();

});