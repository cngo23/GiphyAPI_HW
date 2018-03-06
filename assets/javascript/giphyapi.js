$(document).ready(function() {

    var cartoons = ["Bugs Bunny", "The Simpsons", "SpongeBob", "Shrek"];

    function displayGifs() {
        var cartoon = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=ivZ1e4C58StoCCZcRa3s4zTvf47LqPZ6";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
           
            //api info goes here

            

        })
    }

    function renderButtons() {
        $("#gifButtons").empty();

        for (var i = 0; i < cartoons.length; i++) {
            var c = $("<button>");
            c.addClass("gifbtn");
            c.attr("data-name", cartoons[i]);
            c.text(cartoons[i]);

            $("#gifButtons").append(c);
        }
    }

    $("#addGif").on("click", function(event) {
        event.preventDefault();
        var cartoon = $("#gifInput").val().trim();

        cartoons.push(cartoon);

        renderButtons();

    });

    $(document).on("click",".img",displayGifs);

    renderButtons();

});