function toggleMobileNavbar() {

  if ($(".navbar").hasClass("mobile-nav-opened")) {

    $(".hamburgerD").animate({ left: 0 });
    $("#hamburger").attr("src", "../../resources/picto/inactive/hamburger.png");
  } else {

    $(".hamburgerD").animate({
      left: $(window).width() / 4 - $(".hamburgerD").width() / 2
    });
    $("#hamburger").attr("src", "../../resources/picto/active/hamburger.png");
  }

  $(".navbar").toggleClass("mobile-nav-closed");
  $(".navbar").toggleClass("mobile-nav-opened");
}

var activeSubPage = "main";

function activate( element ) {
  var url = element.attr("src").replace("inactive", "active");
  element.attr( "src", url );
}

function deactivate( element, allowchange=false ) {
  if( element.attr('id') == activeSubPage && !allowchange ) return;

  var url = element.attr("src");
  if( url.search("inactive") == -1 ) {
    url = url.replace("active", "inactive");
    element.attr( "src", url );
  }
}

function toggleDescription( element ) {

  var par = element.parent().parent().find("p");

  if( par.css("opacity") == 1 ) par.animate({ opacity: 0, height: 0 });
  else par.animate({ opacity: 1, height: "1em" });
}

$(document).ready(function(){
  $(".picto-nav-item").not("#logo").not(".vn").css("margin-bottom", "1.5em");

  $(".forDescription, #goBack, #logo-item")
  .mouseenter( function() {
    activate( $(this).find('img') );
  }).mouseleave( function() {
    deactivate( $(this).find('img') );
  }).not("#goBack, #logo-item").click(function() {
    changeView( $(this).find('img') );
    $(".picto-nav-item").not("#logo").css("margin-bottom", "0");
  });

  $("#goBack").click(function() {
    fuckGoBack();
    $(".picto-nav-item").not("#logo").css("margin-bottom", "1.5em");
  });

  $(".hamburgerD").click(function () {
    toggleMobileNavbar();
  });

  $(window).click(function (event) {
    if ($(".navbar").hasClass("mobile-nav-opened") &&
      event.pageX > $(window).width() / 2) {
      toggleMobileNavbar();
    }
  });

  $("#drop-what").mouseenter(function () {
    $("#drop-it").addClass("opened");
  });
  $(".nav-dropdown").mouseleave(function () {
    $("#drop-it").removeClass("opened");
  });
});
