var navWidth; // ehh

$(window).on("load", function() {
  $(".loading-page").fadeOut(1000);
  navWidth = $(window).width() * ($(window).width() > 768 ? .3 : .5); // ehh
});

function toggleMobileNavbar() {


  if( $(".navbar").hasClass("mobile-nav-opened") ) {
    $(".hamburgerD").animate({ left: 0 });
    $("#hamburger").attr("src", "../resources/picto/inactive/hamburger-u1.png");
  
  } else {
    $(".hamburgerD").animate({
      left: navWidth/2 - $(".hamburgerD").width()/2
    });
    
    $("#hamburger").attr("src", "../resources/picto/active/hamburger-u1.png");
  }

  $(".navbar").toggleClass("mobile-nav-closed");
  $(".navbar").toggleClass("mobile-nav-opened");
}

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

  $("#drop-what").mouseenter(function() {
    $("#drop-it").addClass("opened");
  });
  $(".nav-dropdown").mouseleave(function() {
    $("#drop-it").removeClass("opened");
  });

  $(".hamburgerD").click(function() {
    toggleMobileNavbar();
  });

  $(window).click(function(event) {
    if( $(".navbar").hasClass("mobile-nav-opened") && event.pageX > navWidth ) {
      toggleMobileNavbar();
    }
  });
});
