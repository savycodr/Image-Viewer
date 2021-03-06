# Image Viewer
This is an application that displays images from a call to the Giphy API. A query can be dynamically made from the user's input. The user can select images that they want to save in their favorites. The favorites are persisted even after the user closes the applicaiton. They will still exist when the user opens the Image Viewer again. Click [HERE]( https://savycodr.github.io/image-viewer/) to see the application.

## Instructions
* There are three green buttons on the left side of screen. When the user pushes a button, 10 images are displayed that match the animal on the button.
* There is an input field on the left side of the screen. The user can input a new search term. When the user inputs a new term, a new button appears on the left of the screen.
* The user can call up 10 new images related to the new button by selecting the button.
* The user can save their favorite images by selecting the check button under the image.
* The user can see their favorite images by selecting the Show Favorites button on the left side of screen.
* The user can delete the image from their favorites by selecting the x button under the image.
* The user can return to the search screen by selecting the Return to Search button.

## Technology

* This application uses JQuery to dynamically update the DOM. There are two displays that are shown in the application. One display for the search results and another display for the favorites.

* The application uses localStorage to store the user's favorite gifs.

* A AJAX request is made to the Giphy API server. The data is returned in JSON format.

* Utilizes Bootstrap CSS library. Uses Icons from Font Awesome library. Uses a font called Permanent Marker from Google Fonts.

* The application is mobile responsive. It is fun to play on a tablet or phone.
