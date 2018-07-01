// Client ID and API key from the Developer Console
var CLIENT_ID = '518095425004-b4nt89h53kr7k06ktdfn6l749p13k0gu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD4PI70B-f-4ejSR2dGz3-F3NwZG8ObSTc';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var sendButton = document.getElementById('send-button');
var getButton = document.getElementById('get-button');
var myuldatalist = document.getElementById('mydataa');
var myuldatanav = document.getElementById('hideme2');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;

    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        sendButton.style.display = 'block';
        getButton.style.display = 'block';
        myuldatalist.style.display = "block";
        myuldatanav.style.display = "block";
        listUpcomingEvents();
    } else {
        myuldatanav.style.display = "none";
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        sendButton.style.display = 'none';
        getButton.style.display = 'none';
        myuldatalist.style.display = "none";
    }
}
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\\n');
    pre.appendChild(textContent);
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        if (events.length > 0) {
            alert('Connected Successfully To GOOGLE Calender -' + events.length + '- events found.');
            // for (i = 0; i < events.length; i++) {
            // var event = events[i];
            // var when = event.start.dateTime;
            // if (!when) {
            // when = event.start.date;
            // }
            // alert(event.summary + ' (' + when + ')')
            // }
            // $.ajax({
            //   type : 'POST',
            //     url :"/addfromapi",
            //     data:,
            //   success : function(response){
            //     alert('successfully synced from google calender');
            // window.location.reload();
            // },
            //   error :function(err){
            //     alert(err);
            //   }
            // });

        } else {
            alert('Connected Successfully To GOOGLE Calender - No upcoming events found.');
        }
    });
}
