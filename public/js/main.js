$(document).ready(function () {
    $(".delete_btn").on("click", function (e) {
        $target = $(e.target);
        const id = $target.attr("data-id");
        $.ajax({
            type: "DELETE",
            url: "/article/" + id,
            success: function () {
                window.location.href = "/"
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});