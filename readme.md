####How to run the application

1. Check out the repository. The optimized code is in the production directory.
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and you can run it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

###Optimizations performed to optimize index.html

- The Open Sans woff2 fonts were converted to base64 strings and inserted directly into the css file as data URLs.
- The pizzeria.jpg image was reduced in dimensions on the index.html page to create pizzeria-resized.jpg.  
- The Google Analytics script was made async.  
- The print CSS was made non-critical by adding the media="print" query.  
- Gulp was used to optimize the index.html page. A package.json and gulp.js file can be found in the main directory. Among others, these plugins were used to optimize the index.html page:  
	- gulp-uglify, gulp-concat and gulp-rename to produce a single, minified javascript file.  
	- gulp-imagemin to reduce image sizes  
	- gulp-uncss to remove unused CSS (if any) and gulp-cssmin to minify CSS.  
	- gulp-inline-source to inline the CSS file.  
	- gulp-htmlmin to minify the HTML.  


###Optimizations performed to fix resizing time and framerate in pizza.html
- In changePizzaSizes:  
	- The determineDx function is entirely removed, since that calculated percentages in an extremely roundabout way. Instead, I assign percentages in a more direct way.  
	- randomPizzaContainers is defined once with document.getElementsByClassName("randomPizzaContainer"), outside of the for loop, instead of inside the loop.  
    - dx and newwidth are also no longer calculated within the for loop. 

- In updatePositions:  
	- First, items is now defined outside of updatePositions (upon page loads).
  	- Second, scrollTop is given its value just once, outside of the for loop.

- On pageload, the height of the window is checked, and pizzas that would appear below the bottom of the window are not created by using break; in the for loop.
- will-change : transform is added to each moving pizza so that they get their own frames, meaning that they won't trigger a repaint of the entire page.