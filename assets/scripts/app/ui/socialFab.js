// Логика для .social-fab
export default function initSocialFab($) {
    const $fab = $('.social-fab');
    if (!$fab.length) return;

    const $btn = $fab.find('.social-fab__btn');

    function openFab() { $fab.addClass('is-open').attr('aria-expanded', 'true'); }
    function closeFab() { $fab.removeClass('is-open').attr('aria-expanded', 'false'); }

    $btn.on('click', function (e) {
        e.stopPropagation();
        $fab.toggleClass('is-open');
        $fab.attr('aria-expanded', $fab.hasClass('is-open'));
    });

    $(document).on('click', function (e) {
        if (!$fab.is(e.target) && $fab.has(e.target).length === 0) closeFab();
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') closeFab();
    });
}
