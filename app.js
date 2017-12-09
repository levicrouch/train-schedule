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

    // Log everything that's coming out of snapshot
    console.log("From database: snapshot.val().trainName", snapshot.val().trainName);
    console.log(snapshot.val().destination[0]);
    console.log(snapshot.val().firstTrain[0]);
    console.log(snapshot.val().frequency[0]);
    console.log(snapshot.val().dateAdded[0]);

      // Write values from database to the html document
      $(output.trainName).text(snapshot.val().trainName);
      

      // Handle the errors
});