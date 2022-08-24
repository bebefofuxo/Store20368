(function($) {
  var handleMatchMedia = function(mediaQuery) {
      if (mediaQuery.matches) {
        $("img.facebook").attr("src", "../lojas/00020368/images/blackfriday/2019/ico-facebook-mobile.gif");
        $("img.instagram").attr("src", "../lojas/00020368/images/blackfriday/2019/ico-instagram-mobile.gif");
        $(".seta").addClass("bounce");
      } else {
        $("img.facebook").attr("src", "../lojas/00020368/images/blackfriday/2019/ico-facebook-desktop.gif");
        $("img.instagram").attr("src", "../lojas/00020368/images/blackfriday/2019/ico-instagram-desktop.gif");
        $(".seta").removeClass("bounce");
        $(".seta").addClass("bounce-right");
      }
    },
    mql = window.matchMedia("all and (max-width: 1024px)");

  handleMatchMedia(mql);
  mql.addListener(handleMatchMedia);
})(jQuery);
