// Get the form element by its id
var form = document.getElementById("calculator-form");

// Add an event listener to the form when it is submitted
form.addEventListener("submit", function(event) {
    // Prevent the default action of the form
    event.preventDefault();

    // Get the input values from the form
    var size = document.getElementById("size").value;
    var design = document.getElementById("design").value;
    var location = document.getElementById("location").value;
    var features = document.getElementsByName("features[]");

    // Create an array to store the selected features
    var selectedFeatures = [];

    // Loop through the features array and check which ones are checked
    for (var i = 0; i < features.length; i++) {
        if (features[i].checked) {
            // Push the value of the checked feature to the selectedFeatures array
            selectedFeatures.push(features[i].value);
        }
    }

    // Create an object to store the data to be sent to the server
    var data = {
        size: size,
        design: design,
        location: location,
        features: selectedFeatures
    };

    // Create a new XMLHttpRequest object to communicate with the server
    var xhr = new XMLHttpRequest();

    // Open a POST request to the calculator.php file
    xhr.open("POST", "calculator.php");

    // Set the request header to indicate the content type
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define a function to handle the response from the server
    xhr.onload = function() {
        // Check if the status code is 200 (OK)
        if (xhr.status === 200) {
            // Parse the response text as JSON
            var response = JSON.parse(xhr.responseText);

            // Get the result div by its id
            var result = document.getElementById("result");

            // Display the result in the result div
            result.innerHTML = "The estimated cost of your shipping container home is $" + response.cost + ".";
        }
        else {
            // Display an error message in case of failure
            alert("Something went wrong. Please try again later.");
        }
    };

    // Send the data as a JSON string to the server
    xhr.send(JSON.stringify(data));
});
