"use strict";

(function () {
  var scrollAnimTimeout = 500;

  function scrollHandler() {
    var scrolled = !!$(window).scrollTop();

    if (scrolled) {
      $('.header').addClass('bg-dark');
    } else {
      $('.header').removeClass('bg-dark');
    }
  }

  $(window).on("load", function () {
    setTimeout(function () {
      $(window).on("scroll", scrollHandler);
      $(window).trigger("scroll");
    }, scrollAnimTimeout);
  });
  $('.header__menu').click(function () {
    $('.side-menu').toggleClass('hidden');
  });
})();

(function () {
  var scrollDur = 600;

  function updateNav() {
    var currIndex = $.scrollify.currentIndex();
    var currElem = $(".nav__item").get(currIndex);
    var currElem$ = $(currElem);
    $('.nav__item.active').removeClass('active');
    var indicator$ = $('.nav__indicator');

    if (!indicator$.length) {
      indicator$ = $('<div class="nav__indicator" style="opacity: 0"></div>');
      $('.nav').append(indicator$);
    }

    var currTop = currElem$.position().top;
    var indicatorTop = currTop + currElem$.outerHeight(true) / 2 - indicator$.outerHeight(true) / 2;
    currElem$.addClass('active');
    indicator$.stop().addClass('moving').animate({
      top: indicatorTop
    }, scrollDur, 'easeOutQuad', function () {
      $(this).removeClass('moving').animate({
        opacity: 1
      });
    });
  }

  function updateMenuSection() {
    var MENU_INDEX = 2;

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

  $.easing.easeOutCubic = function (t) {
    return 1 - Math.pow(1 - t, 3);
  };

  $.easing.easeOutQuad = function (x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  };

  $.scrollify({
    section: 'section, footer',
    scrollSpeed: scrollDur,
    easing: 'easeOutCubic',
    before: function before() {
      updateNav();
      updateMenuSection();
    }
  });
  $.scrollify.update();
  setTimeout(function () {
    updateNav();
    updateMenuSection();
  }, 100);
  $(window).on('resize', function () {
    updateNav();
  });
  $('.nav__item, [data-role="nav-link"]').click(function (e) {
    e.preventDefault();
    $.scrollify.move($(this).data('target'));
  });
  $('.nav-slideIn-btn').click(function () {
    $('.nav').removeClass('hidden');
    $('.nav-slideIn').addClass('hidden');
  });
  $('.menu').click(function () {
    $('.nav').addClass('hidden');
    $('.nav-slideIn').removeClass('hidden');
  });
})();

(function () {
  var prev = '<a class="slider__arrow slider__arrow--prev" href="#prev"><i class="fas fa-angle-left"></i></a>';
  var next = '<a class="slider__arrow slider__arrow--next" href="#next"><i class="fas fa-angle-right"></i></a>';
  $('.slider').slick({
    prevArrow: prev,
    nextArrow: next
  });
  $('.slider__arrow').appendTo(".offer__content .arrows");
})();