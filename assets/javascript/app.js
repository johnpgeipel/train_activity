// Firebase config script
var firebaseConfig = {
    apiKey: "AIzaSyAP32V0fY_5UhW9yzWxz22j7ew_8XQlep4",
    authDomain: "train-scheduler-d0ac8.firebaseapp.com",
    databaseURL: "http://train-scheduler-d0ac8.firebaseio.com",
    projectId: "train-scheduler-d0ac8",
    storageBucket: "train-scheduler-977b8.appspot.com",
    // messagingSenderId: "163941457447",
    // appId: "1:163941457447:web:afb7b523735e5bc3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

    //   train input from forms
    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-name-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var freqTrain = $("#frequency-input").val().trim();

    // create variable for holding new train info
    var newTrain = {
        name: trainName,
        destination: destinationName,
        first: firstTrain,
        frequency: freqTrain
    };

    // adds newTrain info to the firebase database
    database.ref().push(newTrain);

    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.first)
    console.log(newTrain.frequency)

    // Alerts user to new train being added to roster
    alert("New train added!");

    // Clears the input fields after submission of newTrain info
    $("#train-name-input").val("");
    $("#destination-name-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Stores the data into variables to prepend the database
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var freqTrain = childSnapshot.val().frequency;

    // use moment.js to determine the next arriving train
    // use moment.js to determine the ETA in minutes based on the arrival time and current time

   
    

    // moment.js to determine difference in currentTime and first train

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // moment.js to establish current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freqTrain;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freqTrain - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrainTime = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"));
    // possibly use interval or clock to show countdown of arrival

    // append results to the row in the New Train data table
    var trainRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(freqTrain),
        $("<td>").text(moment(nextTrainTime).format("hh:mm")),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#schedule-table > tbody").append(trainRow);
    console.log(trainRow)
})



