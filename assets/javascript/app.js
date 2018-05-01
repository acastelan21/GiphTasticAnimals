$(document).ready(function(){
    // animals for buttons
    var animals = ["kangaroo","otter","monkey","polar bear","panda", "toucan","shark","armadillo","lion","goat"]
    createButtons()
    
    //loop through animals to make buttons for each 
    function createButtons(){
      $("#setBtns").empty();
        for ( i = 0; i < animals.length; i++){
        //empty the buttons so they dont repeat
        
        var btns = $("<button>");
        btns.addClass("animal");
        btns.attr("data-name", animals[i]);
        btns.text(animals[i]);
        $("#setBtns").append(btns);
        console.log("working");
        
        
    
        }
        displayGifs()
    
    }
    
    
    function displayGifs() {
        
        $("button").on("click", function() {
            $("#gifs-here").empty();
            // Grabbing and storing the data-animal property value from the button
            var clickanimal = $(this).attr("data-name");
      
            // Constructing a queryURL using the animal name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              clickanimal + "&api_key=cpmSRXA1EF7j1c2OiyJCyJVf9j27uM9Q&limit=10";
      
            // Performing an AJAX request with the queryURL
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              // After data comes back from the request
              .then(function(response) {
                console.log(queryURL);
      
                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;
      
                // Looping through each result item
                for (var j = 0; j < results.length; j++) {
      
                  // Creating and storing a div tag
                  var animalsDiv = $("<div>");
                  animalsDiv.attr("id","imgs");
      
                  // Creating a paragraph tag with the result item's rating
    
                  var p = $("<p>").text("Rating: " + results[j].rating)
                  // Creating and storing an image tag
                  var animalsImage = $("<img>");
                  // Setting the src attribute of the image to a property pulled off the result item
                  animalsImage.attr("src", results[j].images.fixed_height_still.url);
                  animalsImage.attr("data-still", results[j].images.fixed_height_still.url)
                  animalsImage.attr("data-animate",results[j].images.fixed_height.url)
                  animalsImage.attr("data-state", "still")
                  animalsImage.addClass("gif")
                  // click and pause
                 
                  // Appending the paragraph and image tag to the animalDiv
                  animalsDiv.append(p);
                  animalsDiv.append(animalsImage);
      
                  // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                  $("#gifs-here").append(animalsDiv)
                  
                  
                  
                  
                }
                onClick()
              });
             
     
            });
            
    }
    function onClick() {
      $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
         
        }
      })
    }
    $("#add-animal").on("click", function(event){
      event.preventDefault();
      
      var addedanimal = $("#animal-input").val().trim();
      console.log(addedanimal);
      animals.push(addedanimal);
      createButtons()
      $("#animal-input").val(" ");
    })
    
    })