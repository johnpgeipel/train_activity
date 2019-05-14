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

