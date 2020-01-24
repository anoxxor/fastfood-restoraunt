(function() {

let scrollDur = 600;

function updateNav() {
    let currIndex = $.scrollify.currentIndex();
    let currElem = $(".nav__item").get(currIndex);
    let currElem$ = $(currElem);

    $('.nav__item.active').removeClass('active');

    let indicator$ = $('.nav__indicator')
    if (!indicator$.length) {
        indicator$ = $('<div class="nav__indicator" style="opacity: 0"></div>');
        $('.nav').append(indicator$);
    }

    let currTop = currElem$.position().top;
    let indicatorTop = currTop + currElem$.outerHeight(true)/2 - indicator$.outerHeight(true)/2;
    
    currElem$.addClass('active');
    indicator$
        .stop()
        .addClass('moving')
        .animate(
            {top: indicatorTop},
            scrollDur,
            'easeOutQuad',
            function() {
                $(this).removeClass('moving').animate({opacity: 1});
            });
}

function updateMenuSection() {
    const MENU_INDEX = 2;

    if ($.scrollify.currentIndex() === MENU_INDEX) {
        $('.side-menu').addClass('hidden'); 
        $('.nav').addClass('hidden');
        $('.nav-slideIn').removeClass('hidden');
        return;
    }
        
    $('.side-menu').removeClass('hidden');
    $('.nav').removeClass('hidden');
    $('.nav-slideIn').addClass('hidden');
}



$.easing.easeOutCubic = (t) => {
    return 1-Math.pow(1-t,3);
}

$.easing.easeOutQuad = (x,t,b,c,d) => {
    return-c*(t/=d)*(t-2)+b;
}

$.scrollify({
    section: 'section, footer',
    scrollSpeed: scrollDur,
    easing: 'easeOutCubic',
    before: () => {
        updateNav();
        updateMenuSection();
    }
});
$.scrollify.update();
setTimeout(() => {
    updateNav();
    updateMenuSection();
}, 100);



$(window).on('resize', () => {updateNav()});

$('.nav__item, [data-role="nav-link"]').click(function(e) {
    e.preventDefault();
    $.scrollify.move($(this).data('target'));
})

$('.nav-slideIn-btn').click(function() {
    $('.nav').removeClass('hidden');
    $('.nav-slideIn').addClass('hidden');
})

$('.menu').click(function() {
    $('.nav').addClass('hidden');
    $('.nav-slideIn').removeClass('hidden');
})

})();