var scrollToAnchor = function (anchor) {
    $('html, body').animate({scrollTop: $('#' + anchor).offset().top}, 800);
};