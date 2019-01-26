//--------------------------------------------------------------------------------------------
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCpHP0-JYza3kWogRG4LtbArYMKizqAbg",
    authDomain: "mycoolerdemo.firebaseapp.com",
    databaseURL: "https://mycoolerdemo.firebaseio.com",
    projectId: "mycoolerdemo",
    storageBucket: "mycoolerdemo.appspot.com",
    messagingSenderId: "938477946827"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var dataRef = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = "";
var nextArrival = 0;
var minsAway = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // Grabs values from text-boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = moment($('#firstTrain-input').val().trim(), "HH:mm").format("");
    frequency = $("#frequency-input").val().trim();
    nextArrival = moment($('#nextArrival-input').val().trim(), "HH:mm").format("");
    minsAway = $("#minsAway-input").val().trim();

    // Code for the push TO firebase; object holding key value pairs to push to firebase
    dataRef.ref().push({

        name: trainName,
        tdestination: destination,
        tFirst: firstTrain,
        tfreq: frequency,
        nextArrival: nextArrival,
        minsAway: minsAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().tdestination;
    var firstTrain = childSnapshot.val().tFirst;
    var frequency = childSnapshot.val().tfreq;
    var nextArrival = childSnapshot.val().arrive;
    var minsAway = childSnapshot.val().tMinutesTillTrain;

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextArrival);
    console.log(childSnapshot.val().minsAway);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //next train
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    var nextArrivalConverted = moment(nextArrival).format("hh:mm a");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(tMinutesTillTrain),
      );
      // Append the new row to the table
      $("#train-table").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

