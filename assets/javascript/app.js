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

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // Grabs values from text-boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = moment($('#firstTrain-input').val().trim(), "HH:mm").format("");
    frequency = $("#frequency-input").val().trim();

    // Code for the push TO firebase; object holding key value pairs to push to firebase
    dataRef.ref().push({

        name: trainName,
        tdestination: destination,
        tFirst: firstTrain,
        tfreq: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().tdestination;
    var firstTrain = childSnapshot.val().tFirst;
    var frequency = childSnapshot.val().tfreq;

    // Log everything that's coming out of snapshot
    console.log("///////////////////////////////");
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);


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
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm a");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // full list of items to the well
    $("#current-trains").append("<div class='well'><span class='trainName'> " + childSnapshot.val().trainName +
        " </span><span class='destination'> " + childSnapshot.val().destination +
        " </span><span class='firstTrain'> " + childSnapshot.val().firstTrain +
        " </span><span class='frequency'> " + childSnapshot.val().frequency +
        " </span></div>");

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

