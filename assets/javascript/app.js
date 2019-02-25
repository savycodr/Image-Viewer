
// Listen to the button with the cat on it
$("#catButton").on("click", function() {
    // make a call to  Giphy API asking for ten datasets for a cat
    var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=xTa0qr0MAiqCvVgseueh2yCaBpml6y6h&q=cat&limit=3&offset=0&rating=G&lang=en"

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
            // we need to get the looping image
            var animatedUrl = results[i].images.fixed_width.url;
            console.log("the animated url " + animatedUrl);

            //create the  HTML
            //create a new image tag
            var stillImage = $("<img>");
            stillImage.attr("src", stillUrl);
            stillImage.attr("data-state", isStatic);
            stillImage.attr("class", "catImage")
            // Save this data for later
            stillImage.attr("data-stillUrl", stillUrl);
            stillImage.attr("data-animatedUrl", animatedUrl);
            // write to catDisplay
            $("#catDisplay").append(stillImage);
        };

        // listen to the gif for an onclick to animate or still the image
        $(".catImage").on("click", function(){

            var state = $(this).attr("data-state");
            console.log("We clicked a cat " + state);
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
    
        });// end of image click

        }); // end of then
    }); // end of btton click

   
