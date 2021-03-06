// EASINGS
importEasings($);
// END EASINGS

function scrollTo( end = 0, duration = "500", easing = "easeInOutQuad" ) {
  $("html, body").animate({
    scrollTop: end
  },
  duration,
  easing,
  () => $(window).trigger("scroll") );
}

var currentSubGallery = "d1Logo";
var activeSubPage = "main";
var level = 0;

var level1Width = 20;

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
  $(".sub-gallery").hide();
  $("."+activeSubPage+"-gallery").find(".sub-gallery").show();

  $(".body").css("height", $(".gallery").css("height"));
}

function changeView( element ) {
  if( level >= 2 ) return;

  scrollTo();

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
  attachParagraphs();

  if( level == 0 ) {
    $("#logo-item").fadeOut(300);

    $(".middleBar").animate({
      width: $(window).width()/2 - parseInt($(".middleBar").css("margin-left"),10)+"px"
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
    scrollTo();
    $(".body").css("height", "100%");
    $(".sub-gallery").hide();

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
    $(".middleBar").animate({
      width: $(window).width() * level1Width/100 - parseInt($(".middleBar").css("margin-left"),10)+"px"
    });

    $(".forDescription").fadeOut(500, function() {
      activeFD.toggleClass("center");
    });

    activeFD.fadeIn()

    $(".view").fadeOut();

    $(".gallery").animate( { "left": level1Width+"vw" } );

    level = 2;
  } else {
    $(".middleBar").animate({
      "width": $(window).width()/2 - parseInt($(".middleBar").css("margin-left"),10)+"px"
    });

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

function leftNavbarScroll( element ) {
    scrollTo( element.offset().top, "slow", "easeInOutExpo" );
}

function attachScrollListener() {
  var previous = currentSubGallery;

  $(window).scroll(function() {
    var wst = $(window).scrollTop();

    if( activeSubPage == "backpack" ) {
      if( wst < $("#Coffie-sg").offset().top ) { // d1
        currentSubGallery = "d1Logo";
      } else if( wst < $("#Tools-sg").offset().top ) { // Coffie
        currentSubGallery = "Coffie";
      } else if( wst < $("#Chests-sg").offset().top ) { // Tools
        currentSubGallery = "Tools";
      } else if( wst < $("#Cloaths-sg").offset().top ) { // Chests
        currentSubGallery = "Chests";
      } else { // Cloaths
        currentSubGallery = "Cloaths";
      }
    }

    if( previous != currentSubGallery ) {
      deactivate( $( "#"+previous ).find("img") );
      activate( $( "#"+currentSubGallery ).find("img") );

      previous = currentSubGallery;
    }
  });
}

function attachParagraphs() {
  if( activeSubPage == "backpack" ) {
    $(".floatingParagraph").each(function() {
      var id = $(this).attr("id");
      var name = "#" + id.slice(0, id.search('-')) + "-sg";

      $(this).css("top", $(name).offset().top);
    });
  }
}

$(document).ready(function(){
  $(".left").hide();
  $(".sub-gallery").hide();

  $(".forDescription, #goBack, #logo-item")
  .mouseenter( function() {
    activate( $(this).find('img') );
  }).mouseleave( function() {
    deactivate( $(this).find('img') );
  }).not("#goBack, #logo-item").click(function() {
    changeView( $(this).find('img') );
  });

  $(".vn")
  .mouseenter( function() { activate( $(this).find('img') ); })
  .mouseleave( function() {
    if( currentSubGallery != $(this).attr("id") ) {
      deactivate( $(this).find('img') );
    }
  }).click(function() {
    leftNavbarScroll( $( "#"+$(this).attr("id")+"-sg" ) );
  });

  attachScrollListener();

  $("#goBack").click(function() { fuckGoBack() });
  $(".gallery").hover(function() { toggleGallery() ;});

  $(".small-gallery-item")
  .mouseenter(function(){
    $(this).animate({
      marginLeft: "0",
      width: "80vw"
    });
  }).mouseleave(function(){
    $(this).animate({
      marginLeft: "10vw",
      width: "50vw"
    });
  });

  $(".hideOnChange").hide();
  $("#main-view").show();
});
