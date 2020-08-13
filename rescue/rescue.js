// EASINGS
function importEasings() {
  $.easing.jswing = $.easing.swing;

  $.extend($.easing,
  {
      def: 'easeOutQuad',
      swing: function (x, t, b, c, d) {
          //alert($.easing.default);
          return $.easing[$.easing.def](x, t, b, c, d);
      },
      easeInQuad: function (x, t, b, c, d) {
          return c*(t/=d)*t + b;
      },
      easeOutQuad: function (x, t, b, c, d) {
          return -c *(t/=d)*(t-2) + b;
      },
      easeInOutQuad: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t + b;
          return -c/2 * ((--t)*(t-2) - 1) + b;
      },
      easeInCubic: function (x, t, b, c, d) {
          return c*(t/=d)*t*t + b;
      },
      easeOutCubic: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t + 1) + b;
      },
      easeInOutCubic: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t + b;
          return c/2*((t-=2)*t*t + 2) + b;
      },
      easeInQuart: function (x, t, b, c, d) {
          return c*(t/=d)*t*t*t + b;
      },
      easeOutQuart: function (x, t, b, c, d) {
          return -c * ((t=t/d-1)*t*t*t - 1) + b;
      },
      easeInOutQuart: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
          return -c/2 * ((t-=2)*t*t*t - 2) + b;
      },
      easeInQuint: function (x, t, b, c, d) {
          return c*(t/=d)*t*t*t*t + b;
      },
      easeOutQuint: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t*t*t + 1) + b;
      },
      easeInOutQuint: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
          return c/2*((t-=2)*t*t*t*t + 2) + b;
      },
      easeInSine: function (x, t, b, c, d) {
          return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
      },
      easeOutSine: function (x, t, b, c, d) {
          return c * Math.sin(t/d * (Math.PI/2)) + b;
      },
      easeInOutSine: function (x, t, b, c, d) {
          return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
      },
      easeInExpo: function (x, t, b, c, d) {
          return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
      },
      easeOutExpo: function (x, t, b, c, d) {
          return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
      },
      easeInOutExpo: function (x, t, b, c, d) {
          if (t==0) return b;
          if (t==d) return b+c;
          if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
          return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function (x, t, b, c, d) {
          return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
      },
      easeOutCirc: function (x, t, b, c, d) {
          return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
      },
      easeInOutCirc: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
          return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
      },
      easeInElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      },
      easeOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
      },
      easeInOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
          return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
      },
      easeInBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c*(t/=d)*t*((s+1)*t - s) + b;
      },
      easeOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
      },
      easeInOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
          return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      },
      easeInBounce: function (x, t, b, c, d) {
          return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
      },
      easeOutBounce: function (x, t, b, c, d) {
          if ((t/=d) < (1/2.75)) {
              return c*(7.5625*t*t) + b;
          } else if (t < (2/2.75)) {
              return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
          } else if (t < (2.5/2.75)) {
              return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
          } else {
              return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
          }
      },
      easeInOutBounce: function (x, t, b, c, d) {
          if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
          return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
      }
  });
} importEasings();
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
