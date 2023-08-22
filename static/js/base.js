var apiURL, home, currentPage = 1,
    pageFor = "home",
    searchTerm = "",
    trendingType = "all",
    API = fetchAPIValueSync();

$(document).ready(function() {
    $("#searchBox").val("");
    $(".buttonNumber").val(1);
    getTrending(1, trendingType)

    $('#tredmovies').click(function() {
        pageFor = "home"
        trendingType = "movie";
        getTrending(1, trendingType);
    });

    $('#trendshows').click(function() {
        pageFor = "home"
        trendingType = "tv";
        getTrending(1, trendingType);
    });

    $('#resetButton').click(function() {
        $('#searchBox').val(''); // Clear input field
        $('#results').empty(); // Clear search results
        $('#message').empty(); // Clear message
        display(home);
    });

    $("#searchBox").on("input", function() {
        searchTerm = $(this).val();
        pageFor = "search";
        pageno = NaN
        $(".buttonNumber").val(1);
        if (searchTerm === "") {
            display(home);
        } else {
            performSearch(searchTerm);
            $("#message").text("Loading PLease Wait");
        }
    });

    $(".buttonNumber").on("input", function() {
        var pageno = $(this).val();
        pageno = parseInt(pageno)
        if (pageno < 1) {
            pageno = 1;
        }
        if (isNaN(pageno)) {
            currentPage = 1
            switchPage(pageFor, currentPage, searchTerm)
            getTrending(currentPage, trendingType)
        } else {
            currentPage = pageno;
            switchPage(pageFor, currentPage, searchTerm)
        }
    });

    $(".page-button").click(function() {
        const selectedPage = parseInt($(this).attr("data-page"));
        if (selectedPage !== currentPage) {
            currentPage = selectedPage;
            $(".buttonNumber").val(currentPage);
            switchPage(pageFor, currentPage, searchTerm)
        }
        scrollToTop();
    });

});

async function getTrending(page = 1, trendingType) {     //Fetch trending Data
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API}`
        }
    };
    await $.ajax({
        url: `https://api.themoviedb.org/3/trending/${trendingType}/day?language=en-US&page=${page}`,
        method: 'GET',
        headers: options.headers,
        dataType: 'json',
        success: function(response) {
            const results = response.results;
            home = results;
            display(results);
        },
        error: function(err) {
            console.error(err);
        }
    });
}

async function performSearch(name, page = 1) {     //Fetch Specific Query
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API}`
        }
    };
    await $.ajax({
        url: `https://api.themoviedb.org/3/search/multi?query=${name}&include_adult=true&language=en-US&page=${page}`,
        method: 'GET',
        headers: options.headers,
        dataType: 'json',
        success: function(response) {
            const results = response.results;
            display(results);
        },
        error: function(err) {
            console.error(err);
        }
    });
}

function display(results) {                             //Display fetched Data in Website
    var homeContainer = $("#results");
    homeContainer.empty();
    if (results) {
        for (let i = 0; i < results.length; i++) {
            var movie = results[i];
            var id = movie.id;
            var adult = movie.adult;
            var overview = movie.overview
            var rating = movie.vote_average
            var poster = movie.poster_path
            var lang = movie.original_language
            var type = movie.media_type
            var img = "https://image.tmdb.org/t/p/w500" + poster
            if (type == "tv") {
                var movietitle = movie.name;
                var date = movie.first_air_date
            } else {
                var movietitle = movie.title;
                var date = movie.release_date
            }

            if (adult == true) {
                var adult = " \(adult\)"
            } else {
                adult = ""
            }
            if ((poster != undefined)) {

                $("#message").text("");
                var movieCard = $("<div>").addClass("moviecard");
                var posterLink = $("<a>").attr("href", "https://tgarchive.eu.org/?search=" + movietitle).attr("target", "blank");
                var poster = $("<img>").attr("src", img).attr("alt", movietitle);
                poster.addClass("zoom-effect"); // Add a class for the zoom effect
                posterLink.append(poster)
                var title = $("<p>").html("<strong>Title: </strong>" + movietitle + " (" + lang + ")");
                var date = $("<p>").html("<strong>Released on:</strong>" + date + "<br><strong>Type:</strong> " + type + adult + "<br><strong>Rating: </strong>" + rating + "<br><strong>Summary: </strong>" + overview);
                var more = $("<a>").addClass("moreinfo");
                var more2 = $("<a>").attr("href", "https://www.imdb.com/find/?q=" + movietitle).attr("target", "blank").html("<button class='btn btn-info'>More Info.</button>");

                more.append(more2);
                movieCard.append(posterLink, title, date, more);
                movieCard.addClass("zoom-effect");
                homeContainer.append(movieCard);

            }
        }
    }
    if (results.length == 0) {
        $("#message").text(`NO movie/Series Found with name: ${searchTerm}`);

    }
}

function fetchAPIValueSync() {                  //Get API Value
    try {
        const request = new XMLHttpRequest();
        request.open("GET", "/getapi/", false); // Note the 'false' parameter for synchronous request
        request.setRequestHeader("Accept", "application/json");
        request.send();

        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            const APIValue = data.API;
            return APIValue;
        } else {
            throw new Error("Request failed with status " + request.status);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

function switchPage(pageFor, currentPage, searchTerm = "") {         //Decides what type of page is it
    if (pageFor == "home") {
        getTrending(currentPage, trendingType)
    } else {
        performSearch(searchTerm, currentPage)
    }

}

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // You can also use "auto" or "instant"
    });

}