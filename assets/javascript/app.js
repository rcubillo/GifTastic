var sports = ["Soccer", "Futbol", "Running", "Mixed Martial Arts", "Karate"];


 // Function for dumping the JSON content for each button into the div
 function displaySports() {
       //Emptys the gifs div before anything
       $("#gifs-appear-here").empty();

    var sport = $(this).attr("data-name");
    //adding the queryURL with my key and limit of 10 gifts
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=k0jh54lFDhHqPQvwTH0HM1MtO6WdkwoH&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response.data);
        var results = response.data;
         // Looping through each result item
         for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var sportDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var sportImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item. Using
            //fixed_height_small_still to get a static image.
            sportImage.attr("src", results[i].images.fixed_height_still.url);
            sportImage.attr("data-still" , results[i].images.fixed_height_still.url);
            sportImage.attr("data-animate" , results[i].images.fixed_height.url);
            sportImage.attr("data-state" , "still");
            sportImage.attr( "id" , "sportsrock");

            // Appending the paragraph and image tag to the sportDiv
            sportDiv.append(p);
            sportDiv.append(sportImage);
            // Prependng the sportDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(sportDiv);
          }
    });
  }


 // Function for displaying sports data
 function renderButtons() {
    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < sports.length; i++) {
      // Then dynamically generating buttons for each sport in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button class='btn btn-secondary'>");
      // Adding a class of movie to our button
      a.addClass("sport");
      // Adding a data-attribute
      a.attr("data-name", sports[i]);
      // Providing the initial button text
      a.text(sports[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

   // This function handles events where one button is clicked
   $("#add-sport").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var sport = $("#animal-input").val().trim();
    // Adding the sport from the textbox to our array
    sports.push(sport);
    console.log(sports);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  function clicker () {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else{
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      n++;
    console.log(n);
    }
 };


  $(document).on("click", "#sportsrock", clicker);

  // Function for displaying the topic info
  // Using $(document).on instead of $(".sport").on to add event listeners to dynamically generated elements
  $(document).on("click", ".sport", displaySports);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();