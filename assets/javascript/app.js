$(document).ready(function() 
{
// the initial animal buttons
var animals = ["cat", "pig", "dog"];
console.log("calling renderButton");
// an array of ids of favorite gifs
var favorites = populateFavorites();

// hide the favorites screen
$("#favorite-animal-view").hide();
$("#return-column").hide();


renderButtons();

// this function displays the gifs if the animal button is pushed
function displayAnimalGifs() {

  console.log("We captured your button click ");
  // get the animal to query
  var animal = $(this).attr("data-animal");
  console.log("We captured your button click " + animal);

  // make a call to  Giphy API asking for ten datasets for animal
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xTa0qr0MAiqCvVgseueh2yCaBpml6y6h&q=" + animal + "&limit=10&offset=0&rating=G&rating=PG&lang=en";

  // call display gifs false means as a search display not as a favorites display
  displayGifs(queryURL, "false");
};

// can we make this a function to share with  display favorites?

function displayGifs(queryURL, isFavorite){

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // an counter for total numer of gifs added (helps for making rows in html)
    var numOfGifs = 0;

    // keep track of the current row we are writing to
    var currentRow;


    //write the data to an array
    var results = response.data;
    console.log("the number of results " + results.length);

    //We need to cycle through all three results
    for (i = 0; i < results.length; i++) {
      // We need to get the rating
      var gifRating = results[i].rating;
      gifRating = gifRating.toUpperCase();
      // Get the title
      var gifTitle = results[i].title;
      console.log("the rating " + gifRating);
      console.log("the title " + gifTitle);
      //start the display as still
      var isStatic = true;
      // We need to get the stil image
      var stillUrl = results[i].images.fixed_width_still.url;
      console.log("the still url " + stillUrl);
      // we need to get the animated image
      var animatedUrl = results[i].images.fixed_width.url;
      console.log("the animated url " + animatedUrl);

      //create the  HTML
      //create a row every three images
      if (numOfGifs%3 === 0) {
        console.log("creating row " + i);
        currentRow = $("<div>");
        currentRow.attr("class", "row image-row");

        if (isFavorite === "true")
        {
          // write to animal-view
          $("#favorite-animal-view").append(currentRow);
        }
        else{
          $("#animal-view").prepend(currentRow);
        }
      }
      // create a column
      var col = $("<div>");
      col.attr("class", "col-md-4");
      currentRow.append(col);

      // create a card
      var card = $("<div>");
      card.attr("class", 'card');
      col.append(card);

      //create a new image tag
      var stillImage = $("<img>");
      stillImage.attr("src", stillUrl);
      stillImage.attr("data-state", isStatic);
      stillImage.attr("class", "animalImage card-img-top");

      // Save this data for later
      stillImage.attr("data-stillUrl", stillUrl);
      stillImage.attr("data-animatedUrl", animatedUrl);

      card.append(stillImage);

      // create the card body
      var body = $("<div>");
      body.attr("class", "card-body");
      card.append(body);
      var title = $("<h5>");
      title.attr("class", "card-title");
      title.text(gifTitle);
      body.append(title);
      var cardText = $("<p>");
      cardText.attr("class", "card-text");
      cardText.text("Rating: " + gifRating);
      body.append(cardText);
      var aButton = $("<a>");
      aButton.attr("data-id", results[i].id);
      console.log("the id is " + results[i].id);
      aButton.attr("href", "#");

      // if this is in the normal display, create a add button
      if (isFavorite === "false")
      {
        aButton.attr("class", "btn btn-secondary btn-sm favoriteButton");
        aButton.html("&#10003 Add to Favorites");
      } else
      // if this is the favorite display, create a delete button
      {
        aButton.attr("class", "btn btn-secondary btn-sm deleteButton");
        //var delButtonLabel = "<i class=\"fa fa-close\" style=\"font-size:36px\"></i>";
        var delButtonLabel = "X Delete from Favorites";
        aButton.html(delButtonLabel);
      }
      body.append(aButton);
      // increase the number of gifs displayed
      numOfGifs++;
      
    };

    // listen to the gif for an onclick to animate or still the image
    $(".animalImage").on("click", function () {

      var state = $(this).attr("data-state");
      console.log("We clicked a animal " + state);
      // change from static to moving
      if (eval(state)) {
        var url = $(this).attr("data-animatedUrl");
        $(this).attr("src", url);
        $(this).attr("data-state", false);
      }
      // change from moving to static
      else {
        var url = $(this).attr("data-stillUrl");
        $(this).attr("src", url);
        $(this).attr("data-state", true);
      }
    }); //end of click

  }); // end of then
}; // end of display animal gifs


// Listen to the create a new animal button
// this will empty the buttonDiv and redraw all of the buttons
$("#add-animal").on("click", function (event) {

  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Capture what the user input
  var userAnimal = $("#animal-input").val().trim();
  // Check that the user input is not blank
  console.log("animal entered " + userAnimal);
  if (userAnimal !== "") {
    // add to the  animals array
    animals.push(userAnimal);
    // clear the input field
    $("#animal-input").val("");
    renderButtons();
  }
});

function renderButtons() {
  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttonsDiv").empty();
  // create a button for each animal in array
  for (var i = 0; i < animals.length; i++) {
    var animal = animals[i];
    // create a new button 
    var aniButton = $("<button>");
    // give the button a label with the animal the user input
    aniButton.text(animal);
    // set the class so that we know a listener will be applied
    aniButton.attr("class", "animalButton btn btn btn-success");
    // set the animal into the buttons data
    aniButton.attr("data-animal", animal);
    // append to the buttonsDiv
    $("#buttonsDiv").append(aniButton);

  }

  // Listen to the buttons with the animal on it
  $(".animalButton").on("click", displayAnimalGifs);

}

// listen to the favorite button to add to favorites and local storage
  $(document).on("click", ".favoriteButton", function(event) {
  event.preventDefault();

  // grab a unique identifier that was stored in the button and save to array
  var favID = $(this).attr("data-id");

  // check whether the id is already in the favorites array
  var isDuplicate = favorites.includes(favID);
  // If the favorite is not already in the array
  if (!isDuplicate){
    favorites.push(favID);
    var stringFavs = "";
    // put array into local storage
    // var stringFavs = JSON.stringify(favorites);
    for (var i=0; i<favorites.length - 1; i++)
    {
      stringFavs = stringFavs + favorites[i] + ",";
    }
    stringFavs = stringFavs + favorites[favorites.length - 1];

    console.log("stringify favorites " + stringFavs);
    // need to remove the quotes and the brackets
    localStorage.setItem("favorites", stringFavs);
  }
});

// listen to the show favorites button to change display to favorites and local storage
$(document).on("click", "#show-favorites", function(event) {
    event.preventDefault();
    $("#left-column").hide();
    $("#return-column").show();
    $("#animal-view").hide();
    $("#favorite-animal-view").show();
    console.log("calling displayFavorites");
    displayFavorites();

});

// listen to the show favorites button to change display to favorites and local storage
$(document).on("click", "#returnToSearch", function(event) {
  event.preventDefault();
  $("#left-column").show();
  $("#return-column").hide();
  $("#animal-view").show();
  $("#favorite-animal-view").hide();
  console.log("calling return to search");
  //displayFavorites();

});

// parses the comma separated string stored in localStorage and returns an array
function populateFavorites(){
  var favorites1 = [];
  var list = localStorage.getItem("favorites");
  if (list !== null )
  {
    favorites1 = list.split(",");
  }
  return favorites1;
};

// display favorites
function displayFavorites()
{
  $("#favorite-animal-view").empty(); // empties out the html

  // get the favorites from local storage
  var favGifs = localStorage.getItem("favorites");
  console.log("THIS SHOULD BE EMPTY["+ favGifs+"]");

  // create a url to get the favorites
  var favQueryURL = "https://api.giphy.com/v1/gifs?api_key=xTa0qr0MAiqCvVgseueh2yCaBpml6y6h&ids=" + favGifs;
  console.log("your favorites  query are " + favQueryURL);
  
  // need some code reuse here will call nearly the same as display animal gifs
  // how to display in a new window?
  displayGifs(favQueryURL, "true");
};

// listen to the delete button to delete from favorites and local storage
$(document).on("click", ".deleteButton", function(event) {
  
  event.preventDefault();

  // grab a unique identifier that was stored in the button and save to array
  var favID = $(this).attr("data-id");

  //  get favorites from localstorage
  // need to delete this instance off the array of favorites
  for( var i = 0; i < favorites.length; i++){ 
    if ( favorites[i] === favID) {
      favorites.splice(i, 1); 
    }
  }
  console.log("delete has been clicked, remaining favorites are "  + favorites);

  var stringFavs = "";
  // put array into local storage
  // var stringFavs = JSON.stringify(favorites);

  // lets make sure the favorites isn't empty now
  if (favorites.length > 0)
  {
    // Build up the query string
    for (var i=0; i<favorites.length - 1; i++)
    {
      stringFavs = stringFavs + favorites[i] + ",";
    }
    stringFavs = stringFavs + favorites[favorites.length - 1];

    console.log("stringify favorites " + stringFavs);
    // need to remove the quotes and the brackets
    localStorage.setItem("favorites", stringFavs);

    displayFavorites();
  } else if ( favorites.length === 0)
  {
    $("#favorite-animal-view").empty();
    localStorage.setItem("favorites", "");
  }

});


});