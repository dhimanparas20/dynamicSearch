var apiURL;
$(document).ready(function() {

  $('#resetButton').click(function() {
            $('#searchBox').val(''); // Clear input field
            $('#results').empty(); // Clear search results
            $('#message').empty(); // Clear message
        });

  $.ajax({
    url: "/geturl/",
    type: "GET",
    dataType: "json",
    success: function(response) {
        apiURL = response.URL;
    },
    error: function(error) {
        console.log("Server Error", error);
    }
  });

  $("#searchBox").val("");

  $("#searchBox").on("input", function() {
      var searchTerm = $(this).val();
      performSearch(searchTerm);
      $("#message").text("Loading PLease Wait");
  });

  /*
  $("#searchButton").click(function() {
      var searchTerm = $("#searchBox").val();
      console.log("Search term:", searchTerm);
  });
  */
});

async function performSearch(searchTerm) {
  var apiUrl1 = apiURL + encodeURIComponent(searchTerm);
  //console.log(apiUrl1);

  await $.ajax({
      url: apiUrl1,
      type: "GET",
      dataType: "json",
      success: function(response) {
          displayResults(response.Search);
      },
      error: function(error) {
          console.log("API call failed:", error);
      }
  });
}

function displayResults(results) {
  var resultsContainer = $("#results");
  resultsContainer.empty();
  //console.log(results);
  if (results) {
      results.forEach(function(movie) {
          //console.log(movie);
          if (movie.Poster != "N/A" ) {
          $("#message").text("");
          var movieCard = $("<div>").addClass("moviecard");
          https://tgarchive.eu.org/?search=
          var posterLink = $("<a>").attr("href", "https://www.imdb.com/title/" + movie.imdbID).attr("target","blank");
          var poster = $("<img>").attr("src", movie.Poster).attr("alt", movie.Title);
          poster.addClass("zoom-effect"); // Add a class for the zoom effect
          posterLink.append(poster)
          var title = $("<p>").html("<strong>Title: </strong>" + movie.Title);
          var date = $("<p>").html("<strong>Date of Release:</strong> " + movie.Year);
          var type = $("<p>").html("<strong>Type:</strong> " + movie.Type);
          var more = $("<a>").attr("href","https://tgarchive.eu.org/?search="+movie.Title).attr("target","blank").html("<strong>Download</strong>");

          movieCard.append(posterLink, title, date, type, more);
          movieCard.addClass("zoom-effect");
          resultsContainer.append(movieCard);
          }
      });
  }
  else{
    if ($("#searchBox").val() == ""){
      $("#message").text("Please Search A Movie/Series");
    }
    else{
      $("#message").text("NO movie/Series Found");
    }
  }
}