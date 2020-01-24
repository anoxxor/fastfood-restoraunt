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

$(function () {
  var tracked = 'section, footer';
  var topOffsets;
  var lastIndex;
  var navLinks = $('.nav__item, [data-role="nav-link"]');
  var autoscroll = false;

  function updateOffsets() {
    topOffsets = [];
    $(tracked).each(function (_, elem) {
      topOffsets.push($(elem).offset().top);
    });
  }

  updateOffsets();

  function elemChangeHandler(index) {
    var sideMenu$ = $('.side-menu');

    if (index === 2 || index === 3) {
      sideMenu$.addClass('hidden');
      $('.nav').addClass('hidden');
      $('.nav-slideIn').removeClass('hidden');
    } else {
      sideMenu$.removeClass('hidden');
      $('.nav').removeClass('hidden');
      $('.nav-slideIn').addClass('hidden');
    }

    updateIndicator(index);
  }

  function updateIndicator(index) {
    $('.nav__item.active').removeClass('active');
    var curNavItem$ = $($('.nav__item').get(index));
    curNavItem$.addClass('active');
    var indicator$ = $('.nav__indicator');

    if (!indicator$.length) {
      indicator$ = $('<div class="nav__indicator"></div>');
      $('.nav').append(indicator$);
    }

    indicator$.addClass('moving');
    indicator$.stop().animate({
      top: curNavItem$.position().top + curNavItem$.outerHeight(true) / 2 - indicator$.outerHeight(true) / 2
    }, function () {
      indicator$.removeClass('moving');
    });
  }

  function scrollTo(index, callback) {
    var offsetTop = topOffsets[index];
    elemChangeHandler(index);
    autoscroll = true;
    $('body, html').animate({
      scrollTop: offsetTop
    }, 600, function () {
      autoscroll = false;
      lastIndex = index;
      if (typeof callback === 'function') callback();
    });
  }

  navLinks.click(function (e) {
    var target = $(this).data('target');
    if (target !== lastIndex) scrollTo(target);
  });
  $(window).on('resize', function () {
    updateOffsets();
    updateIndicator(lastIndex);
  });
  $(window).on('scroll', function () {
    if (autoscroll) return;
    var window$ = $(window);
    var scrollCenter = window$.scrollTop() + $('section').height() / 2; // в хроме $(window).height() возвращает высоту body, а не вьюпорта

    var curElemIndex;

    for (var i = 0; i < topOffsets.length; i++) {
      if (scrollCenter >= topOffsets[i] && scrollCenter < topOffsets[i + 1] || scrollCenter >= topOffsets[i] && typeof topOffsets[i + 1] === 'undefined') {
        curElemIndex = i;
      }
    }

    if (curElemIndex !== lastIndex) {
      console.log(curElemIndex);
      lastIndex = curElemIndex;
      elemChangeHandler(curElemIndex);
    }
  });
  $('.nav-slideIn-btn').click(function () {
    $('.nav').removeClass('hidden');
    $('.nav-slideIn').addClass('hidden');
  });
  $('.menu').click(function () {
    $('.nav').addClass('hidden');
    $('.nav-slideIn').removeClass('hidden');
  });
});

(function () {
  var prev = '<a class="slider__arrow slider__arrow--prev" href="#prev"><i class="fas fa-angle-left"></i></a>';
  var next = '<a class="slider__arrow slider__arrow--next" href="#next"><i class="fas fa-angle-right"></i></a>';
  $('.slider').slick({
    prevArrow: prev,
    nextArrow: next
  });
  $('.slider__arrow').appendTo(".offer__content .arrows");
})();