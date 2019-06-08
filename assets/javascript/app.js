



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

    //   declare variables for the onClick event
    var trainName;
    var destinationName;
    var firstTrain;
    var freqTrain = 0;
    var clockTime;

    // var clockTime = moment().format('LTS');
    // $(".clock").text(clockTime)

    function displayTime() {
        var time = moment().format('HH:mm');
        $('.clock').html(time);
        setTimeout(displayTime, 1000);
    }
$(document).ready(function() {
        displayTime();
    
 
  

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

    
    //   train input from forms
    trainName = $("#train-name-input").val().trim();
    destinationName = $("#destination-name-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    freqTrain = $("#frequency-input").val().trim();

    if (!trainName || !destinationName || !firstTrain || firstTrain>2400 || isNaN(firstTrain) || !firstTrain.toString().length===4 || !freqTrain || freqTrain <=0) {
      // invalidInfo();
      alert("The information you have entered is invalid. Please try again.");
      $("#train-name-input").val("");
      $("#destination-name-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
      
      
      
    } else {

    // create variable for holding new train info
      var newTrain = {
        name: trainName,
        destination: destinationName,
        firstTrain: firstTrain,
        frequency: freqTrain
        
        };
    
      database.ref().push(newTrain);

   
      $("#train-name-input").val("");
      $("#destination-name-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
    }
  });
    
database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        // declare variables for next arrival and minutes away
        var nextArr;
        var minAway;
        

        

        

        var currentTime = moment().format("hh:mm");
        console.log(currentTime)

        // set time back one year from snapshot value
        var firstTrainNew = moment(childSnapshot.val().firstTrain,"hh:mm").subtract(1, "year");

        // calculate differance between current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        console.log("Diff: " + diffTime);

        // timeRemainder calculates the modulus of the diffence and the snapshot of the frequency
        var timeRemainder = diffTime % childSnapshot.val().frequency;
        console.log("Remainder: " + timeRemainder)

        var minAway = childSnapshot.val().frequency - timeRemainder;
        
  
        if (!minAway || isNaN(minAway)) {
          // invalidInfo();
          alert("The information you entered is invalid. Please try again.");
          console.log("is NaN");
          // break
        } else {

        

        console.log("Min Away: " + minAway)

        var nextArr = moment().add(minAway, "minutes");
            nextArr = moment(nextArr).format("hh:mm");
        // if (!nextArr) {
        //     invalidInfo();
        //       // break
        //     }



        // Stores the data into variables to prepend the datatable
        var trainName = childSnapshot.val().name;
        var destinationName = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var freqTrain = childSnapshot.val().frequency;

        
        var trainRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destinationName),
            $("<td>").text(freqTrain),
            $("<td>").text(nextArr),
            $("<td>").text(minAway)
        );

        $("#schedule-table > tbody").append(trainRow);
        console.log(trainRow)

        }
      })
    
});

