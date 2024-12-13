$(document).ready(function() {
    // Ensure the counterUp plugin is applied
    $('.icon .counter .numb').counterUp({
        delay: 20, 
        time: 1000 
    });

    // Add the "show" class after counter animation completes
    setTimeout(function() {
        $('.icon .text').addClass("show");
    }, 1000); 
});
