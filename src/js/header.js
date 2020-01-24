(function() {

let scrollAnimTimeout = 500;

function scrollHandler() {
    let scrolled = !!$(window).scrollTop();
    if (scrolled) {
        $('.header').addClass('bg-dark');
    } else {
        $('.header').removeClass('bg-dark');
    }
}

$(window).on("load", () => {
    setTimeout(function() {
        $(window).on("scroll", scrollHandler);
        $(window).trigger("scroll");
    }, scrollAnimTimeout);
});

$('.header__menu').click(function() {
    $('.side-menu').toggleClass('hidden');
});

})();