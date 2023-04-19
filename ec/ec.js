$(window).on("load", function() {
    $(".loading-page").fadeOut(1000);
  });
  
  function toggleMobileNavbar() {
  
    if( $(".navbar").hasClass("mobile-nav-opened") ) {
  
      $(".hamburgerD").animate({ left: 0 });
      $("#hamburger").attr("src", "../resources/picto/inactive/hamburger.png");
    } else {
  
      $(".hamburgerD").animate({
        left: $(window).width()/4 - $(".hamburgerD").width()/2
      });
      $("#hamburger").attr("src", "../resources/picto/active/hamburger.png");
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
      if( $(".navbar").hasClass("mobile-nav-opened") &&
          event.pageX > $(window).width()/2 ) {
        toggleMobileNavbar();
      }
    });
  });
  