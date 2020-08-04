$(document).ready(function() {
  $(".FloatingLogo").on('click', function(event) {
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
    $('html, body').animate({scrollTop: $("#Why").offset().top - 100 }, "slow");
  });

  $("#goToTrailers").on('click', function(event) {
    $('html, body').animate({scrollTop: $("#Showroom").offset().top }, "slow");
  });
});
