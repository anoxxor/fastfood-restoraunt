(() => {

$('.backcall-form__btn').click(function(e) {
    e.preventDefault();
    $('.backcall-form__check').removeClass('hidden');
    $(this).addClass('hidden');
});

})();