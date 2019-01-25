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
    var database = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = "";

    // Capture Button Click
    $("#add-user").on("click", function (event) {
      event.preventDefault();

      // Grabbed values from text-boxes
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrain = $("#firstTrain-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      // Code for "Setting values in the database"
      database.ref().set({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function (snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().frequency);

      // Change the HTML to reflect
      $("#name-display").text(snapshot.val().name);
      $("#destination-display").text(snapshot.val().destination);
      $("#firstTrain-display").text(snapshot.val().firstTrain);
      $("#frequency-display").text(snapshot.val().frequency);

      // Handle the errors
    }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    //MOMENT.JS code----------------------------------------------------

    var randomDate = "02/23/1999";
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(randomDate, randomFormat);

    // Using scripts from moment.js write code below to complete each of the following.
    // Console.log to confirm the code changes you made worked.

    // 1 ...to convert the randomDate into three other date formats
    console.log(convertedDate.format("MM/DD/YY"));
    console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss"));
    console.log(convertedDate.format("X"));

    // 2 ...to determine the time in years, months, days between today and the randomDate
    console.log(convertedDate.toNow());
    console.log(convertedDate.diff(moment(), "years"));
    console.log(convertedDate.diff(moment(), "months"));
    console.log(convertedDate.diff(moment(), "days"));

    // 3 ...to determine the number of days between the randomDate and 02/14/2001
    var newDate = moment("02/14/2001", randomFormat);
    console.log(convertedDate.diff(newDate, "days"));

    // 4 ...to convert the randomDate to unix time (be sure to look up what unix time even is!!!)
    console.log(convertedDate.format("X"));

    // 5 ...to determine what day of the week and what week of the year this randomDate falls on.
    console.log(convertedDate.format("DDD"));
    console.log(convertedDate.format("dddd"));

