(() => {

let tracked = 'section, footer';
let topOffsets;
let lastIndex;
let navLinks = $('.nav__item, [data-role="nav-link"]');
let autoscroll = false;

function updateOffsets() {
    topOffsets = [];
    $(tracked).each(function(_, elem) {
        topOffsets.push($(elem).offset().top);
    });
}
updateOffsets();

function elemChangeHandler(index) {
    let sideMenu$ = $('.side-menu');
    if (index === 2 || index === 3) {
        sideMenu$.addClass('hidden');
        $('.nav').addClass('hidden');
        $('.nav-slideIn').removeClass('hidden');
    } else {
        if (!sideMenu$.hasClass('user-hidden')) sideMenu$.removeClass('hidden');
        $('.nav').removeClass('hidden');
        $('.nav-slideIn').addClass('hidden');
    }

    updateIndicator(index);    
}

function updateIndicator(index) {
    $('.nav__item.active').removeClass('active');
    console.log(index);
    let curNavItem$ = $($('.nav__item').get(index));
    curNavItem$.addClass('active');

    let indicator$ = $('.nav__indicator');
    if (!indicator$.length) {
        indicator$ = $('<div class="nav__indicator"></div>').hide();
        $('.nav').append(indicator$);
    }
    indicator$.addClass('moving');
    indicator$.stop().animate({
        top: curNavItem$.position().top + curNavItem$.outerHeight(true)/2 - indicator$.outerHeight(true)/2,
    },
    () => {indicator$.removeClass('moving').show()});
}

function scrollTo(index, callback) {
    if (index > topOffsets.length-1) index = topOffsets.length - 1;
    if (index < 0) index = 0;
    let offsetTop = topOffsets[index];
    elemChangeHandler(index);
    autoscroll = true;
    $('body, html').stop().animate({scrollTop: offsetTop}, 600, () => {
        autoscroll = false;
        lastIndex = index;
        if (typeof callback === 'function') callback();
    });
}

navLinks.click(function(e) {
    let target = $(this).data('target');
    if (target !== lastIndex) scrollTo(target);
})

$(window).on('resize', () => {
    updateOffsets();
    updateIndicator(lastIndex);
})

$(window).on('scroll', function() {
    if (autoscroll) return;

    let window$ = $(window);
    let scrollCenter = window$.scrollTop() + $('section').height()/2; // в хроме $(window).height() возвращает высоту всего документа, а не вьюпорта
    let curElemIndex;
    for (let i=0; i < topOffsets.length; i++) {
        if ( (scrollCenter >= topOffsets[i] && scrollCenter < topOffsets[i+1]) || (scrollCenter >= topOffsets[i] && typeof topOffsets[i+1] === 'undefined') ) {
            curElemIndex = i;
        }
    }
    if (curElemIndex !== lastIndex) {
        lastIndex = curElemIndex;
        elemChangeHandler(curElemIndex);
    } 
})

$('.nav-slideIn-btn').click(function() {
    $('.nav').removeClass('hidden');
    $('.nav-slideIn').addClass('hidden');
});

$('.menu').click(function() {
    $('.nav').addClass('hidden');
    $('.nav-slideIn').removeClass('hidden');
});












function magnetic()
{
    function overDownHandler()
    {
        console.log('overdown');
    }

    function overUpHandler()
    {
        console.log('overup');
    }

    function downHandler(touchLine)
    {
        let curElemIndex = lastIndex;
        if (curElemIndex === topOffsets.lenhts - 1) {
            overDownHandler();
            return;
        }
        scrollTo(curElemIndex + 1);

    }

    function upHandler(touchLine) {
        let curElemIndex = lastIndex;
        if (curElemIndex === 0) {
            overUpHandler();
            return;
        };
        scrollTo(curElemIndex - 1);
    }

    $(window).on('touchstart', onTouchstart);
    $(window).on('touchend', onTouchend);
    $(window).on('wheel mousewheel MozMousePixelScroll', onWheel);

    let touchstartPos;

    function onWheel(e)
    {
        if (autoscroll) return;
        e = e.originalEvent;
        var delta = e.deltaY || e.detail || e.wheelDelta;
        delta < 0 ? upHandler() : downHandler();
    }

    function onTouchstart(e)
    {
        if (autoscroll) return;
        touchstartPos = e.changedTouches[0].pageY;
    }

    function onTouchend(e)
    {
        if (autoscroll) return;
        let touchLine = e.changedTouches[0].pageY - touchstartPos;
        touchLine > 0 ? upHandler() : downHandler();
    }
}

})();