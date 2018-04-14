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

$(document).on("click", "#deletecomment", function(){
    var commentId = $(this).attr("data-id");
    var articleId = $(this).val();

    $.ajax({
        method: "DELETE",
        url: "/delete/" + commentId,
        data: {
            artId: articleId
        }
    }).then(function(data){

    });
})