$(document).ready(function () {

    var cartoons = ["Bugs Bunny", "The Simpsons", "SpongeBob", "Dexter's Laboratory", "Mickey Mouse"];

    function displayGifs() {
        var cartoon = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=ivZ1e4C58StoCCZcRa3s4zTvf47LqPZ6&limit=15";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#gifArea").empty();

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var imgDiv = $("<div>").addClass("userPick");

                var ratings = results[i].rating;
                console.log(ratings);
                
                var stillImg = results[i].images.fixed_width_still.url;
                var playImg = results[i].images.fixed_width.url;

                //var rated = $("<p>").addClass("rating").attr("data-rating",ratings);
                
                //var ratingP = $("<p>").addClass("rating");
                //ratingP.append(ratings);
                //$("#gifArea").append(ratingP);
                

                var gif = $("<img>").addClass("gif").attr("src", stillImg).attr("data-still", stillImg).attr("data-animate", playImg).attr("data-state", "still");

                imgDiv.append(gif);
                $("#gifArea").append(imgDiv);

            }
            $(".gif").on("click",
                function () {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }

                });

        })


    }

    function renderButtons() {
        $("#gifButtons").empty();

        for (var i = 0; i < cartoons.length; i++) {
            var c = $("<button>");
            c.addClass("gifBtn btn btn-outline-dark");
            c.attr("data-name", cartoons[i]);
            c.text(cartoons[i]);

            $("#gifButtons").append(c);
        }
    }

    $("#addGif").on("click", function (event) {
        event.preventDefault();
        var cartoon = $("#gifInput").val().trim();

        cartoons.push(cartoon);

        renderButtons();

    });

    $(document).on("click", ".gifBtn", displayGifs);

    renderButtons();

});