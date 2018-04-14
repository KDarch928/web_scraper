$(document).on("click", "#savecomment", function(){
    var comId = $(this).attr("data-id");
    var text = $("#" + comId + "").val().trim();
    console.log(text);

    $.ajax({
        method: "POST",
        url: "/articles/" + comId,
        data: {
            title: text
        }
    }).then(function(data) {
       
    });

    $("#" + comId + "").val("");
});