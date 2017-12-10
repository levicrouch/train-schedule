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
    uponArrival: ".data-upon-arrival"
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
    formData.clear();
});
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (snapshot) {

    // Write values from database to the html document
    // Determine the current time in military time
    var currentTime = "09:50";
    // Calculate the next arrival time based on values of frequency and first train values
    var nextArrival = "10:00am";
    // Calculate the minutes away based on current time and next arrival times
    var minutesAway = 10;
    $(output.trainData).find("tbody").append($("<tr>").append
        ($("<td>").append(snapshot.val().trainName),
        $("<td>").append(snapshot.val().destination),
        $("<td>").append(snapshot.val().frequency),
        $("<td>").append(nextArrival),
        $("<td>").append(minutesAway),
        $("<td>").append("<img class='expectation' src='assets/images/pain-train-200.gif'>")
        )
    );
});