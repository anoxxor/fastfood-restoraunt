(function() {
   
let prev = '<a class="slider__arrow slider__arrow--prev" href="#prev"><i class="fas fa-angle-left"></i></a>';
let next = '<a class="slider__arrow slider__arrow--next" href="#next"><i class="fas fa-angle-right"></i></a>';

$('.slider').slick({
    prevArrow: prev,
    nextArrow: next
});

$('.slider__arrow').appendTo(".offer__content .arrows");

})();
