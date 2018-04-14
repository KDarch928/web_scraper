// $("button").click(function(){
//     var button = $(this);
//     console.log(button);
// })

$(document).on("click", "#savecomment", function(){
    var comId = $(this).attr("data-id");
    var text = $("#bobyinput").val().trim();
    console.log(text);

    $.ajax({
        method: "POST",
        url: "/articles/" + comId,
        data: {
            title: text
        }
    }).then(function(data) {
        console.log(data);
        // $("#bodyinput").val("");
        // location.reload();
    });

    // $("#bodyinput").val("");
});