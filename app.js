///////////////////////////////////////////////////////////////
// variables and objects
///////////////////////////////////////////////////////////////

// Debug
var debug = true;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBUc0WBppyXGEGszjuslJvOFzA90ENsygU",
    authDomain: "paintrainschedule.firebaseapp.com",
    databaseURL: "https://paintrainschedule.firebaseio.com",
    projectId: "paintrainschedule",
    storageBucket: "paintrainschedule.appspot.com",
    messagingSenderId: "581050482081"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

var painTrainLink = "https://www.youtube.com/watch?v=x5dJb2YG7vU&t=1m20s";

// HTML input id's/classes object
var input = {
    trainName: "#form-train-name",
    destination: "#form-destination",
    firstTrain: "#form-first-train",
    frequency: "#form-frequency",
    form: ".form-control"

}
// HTML output object
var output = {
    trainData: ".train-data",
    trainName: ".data-train-name",
    destination: ".data-destination",
    frequency: ".data-frequency",
    nextArrival: ".data-next-arrival",
    minutesAway: ".data-minutes-away",
    expectation: ".expectation",
    easterEgg: "#embed-video",
    jumbotron: ".jumbotron",
    body: "body"
}
// userData object
var formData = {
    trainName: "",
    destination: "",
    firstTrain: "",
    frequency: 0,
    submitButton: "#submit",
    clear: function () {
        // clears out the data entered in the form
        $(input.trainName).val('');
        $(input.destination).val('');
        $(input.firstTrain).val('');
        $(input.frequency).val('');
    }
}

$(output.easterEgg).hide();
///////////////////////////////////////////////////////////////
// Enter Data from form to Firebase
///////////////////////////////////////////////////////////////

// aftter hitting submit, capture user supplied data
$(formData.submitButton).click(function () {
    // Prevent the buttons default behavior
    event.preventDefault();
    // Capture the data entered in the form
    formData.trainName = $(input.trainName).val();
    formData.destination = $(input.destination).val();
    formData.firstTrain = $(input.firstTrain).val();
    formData.frequency = $(input.frequency).val();
    if (debug) {
        for (const prop in formData) {

            console.log(`formData.${prop} = ${formData[prop]}`);
        }
    }

    // write inputted data to the firebase database
    database.ref().push({
        trainName: formData.trainName,
        destination: formData.destination,
        firstTrain: formData.firstTrain,
        frequency: formData.frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    // Clear out the form data
    formData.clear();
});

///////////////////////////////////////////////////////////////
// Load Data from Firebase
///////////////////////////////////////////////////////////////
database.ref().on("child_added", function (snapshot) {


    // Determine the current time in military time
    var calculatedCurrentTime = moment.utc(moment().format("HH:mm"));
    console.log("calculatedCurrentTime:", calculatedCurrentTime);

    // convert the frequency to a number
    var frequency = parseInt(snapshot.val().frequency);
    console.log("frequency:", frequency);

    // Convert the first train time to a moment object so we can run calculations
    var firstTrainTime = snapshot.val().firstTrain;
    var firstTrainTimeCalculated = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("firstTrainTimeCalculated:", firstTrainTimeCalculated);

    // Calculate the difference from the current time to the time the first train left
    var diffTime = moment().diff(moment(firstTrainTimeCalculated), "minutes");
    console.log("diffTime:", diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;
    console.log(timeRemainder);

    // Minutes until next train arrives
    var minutesNextTrain = frequency - timeRemainder;
    console.log("minutesNextTrain:", minutesNextTrain);

    // Next Train
    var nextArrival = moment().add(minutesNextTrain, "minutes");
    // nextArrival = JSON.stringify(nextArrival);
    console.log("nextArrival:", moment(nextArrival).format("HH:mm"));

    // Write values from database to the html document
    $(output.trainData).find("tbody").append($("<tr>").append
        ($("<td>").append(snapshot.val().trainName),
        $("<td>").append(snapshot.val().destination),
        $("<td>").append(snapshot.val().frequency),
        $("<td>").append(moment(nextArrival).format("HH:mm")),
        $("<td>").append(minutesNextTrain),
        $("<td>").append("<img class='expectation' src='assets/images/pain-train-200.gif'>")
        )
    );
});
$(output.trainData).click(function () {
    $(output.jumbotron).hide();
    $(output.easterEgg).show();
});