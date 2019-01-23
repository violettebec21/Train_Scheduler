
console.log("sanity");

$(document).ready(function () {

    //using from class activity "click json" and "button triggered ajax" for AJAX call, JSON, array of items, and dynamic button population

    // display initial array of tvShows
    var tvShows = ["The Office", "Mad Men", "Friends", "Unbreakable Kimmy Schmidt", "30 Rock", "Ricky and Morty", "South Park", "Spongebob", "Schitt's Creek", "Silicon Valley", "The Walking Dead", "The Middle", "Black Mirror"];

    // Function for dumping the JSON content for each button into the div
    function displaytvShowInfo() {

        var tvShows = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShows + "&api_key=8I87mPazwmPjBxwELpInl2BU9Wp4C1OB";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r") {

                    // Creating a div for the gif
                    //example of JQuery selector on HTML-- dynamically created HTML element
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var tvShowImage = $("<img>");

                    // Giving the image tag an src attribute of a property pulled off the result item
                    tvShowImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and tvShowImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(tvShowImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#tvShows-view").prepend(gifDiv);

                }
            }

        }).catch(function (err) {
            console.log(err);
        });
    }

    // Function for displaying tvShow data
    function renderButtons() {

        // Deleting the buttons prior to adding new tvShows
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of tvShows
        for (var i = 0; i < tvShows.length; i++) {

            // Then dynamically generating buttons for each tvShow in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of tvShow to our button
            a.addClass("tvShow");
            // Adding a data-attribute
            a.attr("data-name", tvShows[i]);
            // Providing the initial button text
            a.text(tvShows[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    renderButtons();

    // This function handles events where one button is clicked
    $("#add-tvShow").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var tvShow = $("#tvShow-input").val().trim();

        // Adding the tvShow from the textbox to our array
        tvShows.push(tvShow);
        console.log(tvShows);

        // Calling renderButtons which handles the processing of our tvShow array
        renderButtons();
    });

    // Function for displaying the tvShow info
    // Using $(document).on instead of $(".tvShow").on to add event listeners to dynamically generated elements
    $(document).on("click", ".tvShow", displaytvShowInfo);


    // Calling the renderButtons function to display the initial buttons
    renderButtons();

    //placing document.onclick with function AFTER my calling my renderButtons(); so this action happens AFTER my array and everything is processed
    $(document).on("click", ".gif", playPauseGif);

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


//notes from tutor session----------------
//below is how we would use .catch to log the specific error message

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     $("#tvShows-view").text(JSON.stringify(response));
//   }).catch(function(err){
//       console.log(err);
//   });
// }