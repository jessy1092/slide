$(document).ready(function () {
    impress().init();

    $("#test_header").hover( function () {
        $(this).css('color', 'blue');
    }, function () {
        $(this).css('color', 'red');
    });
});
