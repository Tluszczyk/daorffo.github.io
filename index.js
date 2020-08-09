$(window).on("load", function() {
  $(".loading-page").fadeOut(1000);
});

$(document).ready(function() {
  $(".in-construction").mouseenter(function() {
    $("body").append("<div class='soon-div'>soon...</div>");
  }).mousemove(function(event) {
    $(".soon-div").offset({
      left: event.pageX + 10,
      top: event.pageY
    });
  }).mouseleave(function() {
    $(".soon-div").remove();
  }).click(function(event) {
    event.preventDefault();
  });

  $("#upperLogo").on('click', function(event) {
    $('html, body').animate({scrollTop: 0}, "slow");
  });

  $(".scrollDown").on('click', function(event) {
    $('html, body').animate({scrollTop: $("#Contact").offset().top }, "slow");
  });

  $("#drop-what").mouseenter(function() {
    $("#drop-it").addClass("opened");
  });
  $(".nav-dropdown").mouseleave(function() {
    $("#drop-it").removeClass("opened");
  });

  $("#goToWhy").on('click', function(event) {
    $('html, body').animate({scrollTop: $("#Why").offset().top - 12 }, "slow");
  });

  $("#goToTrailers").on('click', function(event) {
    $('html, body').animate({scrollTop: $("#Showroom").offset().top }, "slow");
  });

  $(".hamburgerD").click(function() {

    if( $(".navbar").width() == $(window).width()/2 ) {
      $(".navbar").animate({ width: 0 });

      $(".hamburgerD").animate({ left: 0 });
    } else {
      $(".navbar").animate({ width: "50vw" });

      $(".hamburgerD").animate({
        left: $(window).width()/4 - $(".hamburgerD").width()
      });
    }
    // opacity body ??
  });
});
