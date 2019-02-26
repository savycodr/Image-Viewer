var animals = ["cat", "pig", "dog"];
console.log("calling renderButton");
renderButtons();

// this function displays the gifs if the animal button is pushed
function displayAnimalGifs() {

    console.log("We captured your button click ");
    // get the animal to query
    var animal = $(this).attr("data-animal");
    console.log("We captured your button click " + animal);

    // make a call to  Giphy API asking for ten datasets for animal
    var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=xTa0qr0MAiqCvVgseueh2yCaBpml6y6h&q=" + animal + "&limit=3&offset=0&rating=G&lang=en";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);

        //write the data to an array
        var results = response.data;
        console.log("the number of results " + results.length);

        //We need to cycle through all three results
        for (i=0; i<results.length; i++)
        {
            // We need to get the rating
            var gifRating = results[i].rating;
            console.log("the rating " + gifRating);
            //start the display as still
            var isStatic = true;
            // We need to get the stil image
            var stillUrl= results[i].images.fixed_width_still.url;
            console.log("the still url " + stillUrl);
            // we need to get the animated image
            var animatedUrl = results[i].images.fixed_width.url;
            console.log("the animated url " + animatedUrl);

            //create the  HTML
            //create a new image tag
            var stillImage = $("<img>");
            stillImage.attr("src", stillUrl);
            stillImage.attr("data-state", isStatic);
            stillImage.attr("class", "animalImage")
            // Save this data for later
            stillImage.attr("data-stillUrl", stillUrl);
            stillImage.attr("data-animatedUrl", animatedUrl);
            // write to animal-view
            $("#animal-view").prepend(stillImage);
        };

        // listen to the gif for an onclick to animate or still the image
        $(".animalImage").on("click", function(){

            var state = $(this).attr("data-state");
            console.log("We clicked a animal " + state);
            // change from static to moving
            if (eval(state))
            {
                var url = $(this).attr("data-animatedUrl");
                $(this).attr("src", url);
                $(this).attr("data-state", false);
            }
            // change from moving to static
            else{
                var url = $(this).attr("data-stillUrl");
                $(this).attr("src", url);
                $(this).attr("data-state", true);
            }
        }); //end of click

        }); // end of then
}; // end of display animal gifs

   
// Listen to the create a new animal button
// this will empty the buttonDiv and redraw all of the buttons
$("#add-animal").on("click", function(event) {

  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

   // Capture what the user input
   var userAnimal = $("#animal-input").val().trim();
   // Check that the user input is not blank
   console.log("animal entered " + userAnimal);
   if (userAnimal !== "")
   {
     // add to te  animals array
     animals.push(userAnimal);

     renderButtons();
   }
});

function renderButtons(){
  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttonsDiv").empty();
  // create a button for each animal in array
  for (var i=0; i<animals.length; i++)
  {
     var animal = animals[i];
    // create a new button 
    var aButton = $("<button>");
    // give the button a label with the animal the user input
    aButton.text(animal);
    // set the class so that we know a listener will be applied
    aButton.attr("class", "animalButton");
    // set the animal into the buttons data
    aButton.attr("data-animal", animal);
    // append to the buttonsDiv
    $("#buttonsDiv").append(aButton);
  }
    // Listen to the buttons with the animal on it
    //$(".animalButton").on("click", displayAnimalGifs());
    $(".animalButton").on("click", displayAnimalGifs);

}
