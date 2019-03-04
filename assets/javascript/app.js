var videogames = ["Cat", "Dog", "Mosquitoe", "Fly"];


 // Function for dumping the JSON content for each button into the div
 function displayAnimal() {
       //Emptys the gifs div before anything
       $("#gifs-appear-here").empty();

    var animal = $(this).attr("data-name");
    //adding the queryURL with my key and limit of 10 gifts
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=k0jh54lFDhHqPQvwTH0HM1MtO6WdkwoH&limit=10";

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
            var animalDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item. Using
            //fixed_height_small_still to get a static image.
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still" , results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate" , results[i].images.fixed_height.url);
            animalImage.attr("data-state" , "still");
            animalImage.attr( "id" , "gifImages");

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
          }
    });
  }


 // Function for displaying videogames data
 function renderButtons() {
    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < videogames.length; i++) {
      // Then dynamically generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie to our button
      a.addClass("animal");
      // Adding a data-attribute
      a.attr("data-name", videogames[i]);
      // Providing the initial button text
      a.text(videogames[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

   // This function handles events where one button is clicked
   $("#add-animal").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding the movie from the textbox to our array
    videogames.push(animal);
    console.log(videogames);

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


  $(document).on("click", "#gifImages", clicker);

  // Function for displaying the topic info
  // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
  $(document).on("click", ".animal", displayAnimal);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();
























// $("button").on("click", function() {
//     // Grabbing and storing the data-animal property value from the button
//     var animal = $(this).attr("data-animal");

//     // Constructing a queryURL using the animal name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       animal + "&api_key=k0jh54lFDhHqPQvwTH0HM1MtO6WdkwoH";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(function(response) {
//         console.log(queryURL);

//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {

//           // Creating and storing a div tag
//           var animalDiv = $("<div>");

//           // Creating a paragraph tag with the result item's rating
//           var p = $("<p>").text("Rating: " + results[i].rating);

//           // Creating and storing an image tag
//           var animalImage = $("<img>");
//           // Setting the src attribute of the image to a property pulled off the result item
//           animalImage.attr("src", results[i].images.fixed_height.url);

//           // Appending the paragraph and image tag to the animalDiv
//           animalDiv.append(p);
//           animalDiv.append(animalImage);

//           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//           $("#gifs-appear-here").prepend(animalDiv);
//         }
//       });

//       function renderButtons() {

//         // Deleting the buttons prior to adding new movies
//         // (this is necessary otherwise you will have repeat buttons)
//         $("#buttons-view").empty();

//         // Looping through the array of movies
//         for (var i = 0; i < results.length; i++) {

//           // Then dynamically generating buttons for each movie in the array
//           // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//           var a = $("<button>");
//           // Adding a class of movie to our button
//           a.addClass("animal");
//           // Adding a data-attribute
//           a.attr("data-animal", results[i]);
//           // Providing the initial button text
//           a.text(results[i]);
//           // Adding the button to the buttons-view div
//           $("#buttons-view").append(a);
//         }
//       } 
//   });