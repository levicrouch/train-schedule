var painTrainLink = "https://www.youtube.com/watch?v=x5dJb2YG7vU&t=1m20s";

///////////////////////////////////////////////////////////////
// variables and objects
///////////////////////////////////////////////////////////////

// HTML input id's/classes object
var input = {
    trainName: "#form-train-name",
    destination: "#form-destination",
    firstTrain: "#form-first-train",
    frequency: "#form-frequency"
    
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
    submitButton: "#submit"
}
// aftter hitting submit, capture user supplied data
$(formData.submitButton).click(function(){
    formData.trainName = $(input.trainName).val();
    formData.destination = $(input.destination).val();
    formData.firstTrain = $(input.firstTrain).val();
    formData.frequency = $(input.frequency).val();
    for (const prop in formData) {
        
        console.log(`formData.${prop} = ${formData[prop]}`);
    }
});