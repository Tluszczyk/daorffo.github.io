var activeSubPage = "main";
var level = 0;

var level1Width = 15;

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

function activateLeft( name ) {
  $(".left").fadeOut();
  $("."+name+"-left").fadeIn();
}

function toggleDescription( element ) {

  var par = element.parent().parent().find("p");

  if( par.css("opacity") == 1 ) par.animate({ opacity: 0, height: 0 });
  else par.animate({ opacity: 1, height: "1em" });
}

function changeGallery() {
  $(".gallery").find("div").hide();
  $("."+activeSubPage+"-gallery").show();

  $(".body").css("height", $(".gallery").css("height"));
}

function changeView( element ) {
  if( level >= 2 ) return;

  var previous = activeSubPage;
  activeSubPage = element.attr('id');

  if( previous != activeSubPage ) {
    toggleDescription( $("#" + previous) );
    toggleDescription( $("#" + activeSubPage) );

    activateLeft( activeSubPage );
  }

  var id = "#" + activeSubPage + "-view";

  $(".hideOnChange").hide();
  $(id).show();

  changeGallery();

  if( level == 0 ) {
    $("#logo-item").fadeOut(300);

    $(".middleBar").animate({
      width: "50vw",
    });

    level = 1;
  } else if ( level == 1 ) {
    deactivate( $("#" + previous) );
  }

  $(".picto-nav-item").not(".vn, #logo, " + "#" + activeSubPage)
  .animate({
    width: "70%",
    height: "70%"
  });

  $("#"+activeSubPage).animate({
    width: "100%",
    height: "100%"
  });
}

function fuckGoBack() {
  if( level == 0 ) window.location.href = "../index.html";
  else if ( level == 1 ) {
    $(".hideOnChange").hide();
    $("#main-view").show();

    toggleDescription( $("#" + activeSubPage) );
    deactivate( $("#" + activeSubPage), true );

    $(".middleBar").animate({
      "width": "100vw"
    }, "slow");

    $("#logo-item").fadeIn(300);

    $(".picto-nav-item").not(".vn, #logo")
    .animate({
      width: "100%",
      height: "100%"
    });

    activeSubPage = "main";
    level = 0;
  }

  $(".left").fadeOut();
}

function toggleGallery() {
  $(".gallery").toggleClass("gallery-opened");

  var activeFD = $("#"+activeSubPage).parent().parent();
  var id = "#" + activeSubPage + "-view";

  if( level == 1 ) {
    $(".middleBar").animate( { width: level1Width+"vw" } );

    $(".forDescription").fadeOut(500, function() {
      activeFD.toggleClass("center");
    });

    activeFD.fadeIn()

    $(".view").fadeOut();

    $(".gallery").animate( { "left": level1Width+"vw" } );

    level = 2;
  } else {
    $(".middleBar").animate({ "width": "50vw" });

    activeFD.fadeOut(500, function() {
      activeFD.toggleClass("center");
      $(".forDescription").fadeIn();
    });

    $(".hideOnChange").hide();
    $(id).show();

    $(".gallery").animate({ "left": "40vw" });

    level = 1;
  }
}

$(document).ready(function(){
  $(".left").hide();
  $(".gallery").find("div").hide();

  $(".forDescription, #goBack, #logo-item, .vn")
  .mouseenter( function() {
    activate( $(this).find('img') );
  }).mouseleave( function() {
    deactivate( $(this).find('img') );
  }).not("#goBack, #logo-item, .vn").click(function() {
    changeView( $(this).find('img') );
  });

  $("#goBack").click(function() { fuckGoBack() });
  $(".gallery").hover(function() { toggleGallery() ;});

  $(".hideOnChange").hide();
  $("#main-view").show();
});
