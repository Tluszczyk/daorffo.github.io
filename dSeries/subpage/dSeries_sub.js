// EASINGS
importEasings($);
// END EASINGS

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}
function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

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

function scrollTo(end = 0, duration = "500", easing = "easeInOutQuad") {
    $("html, body").animate({
        scrollTop: end
    },
        duration,
        easing,
        () => $(window).trigger("scroll"));
}

var currentSubGallery = "d1Logo";
var activeSubPage = "none";
var level = 0;

var level1Width = 20;

function activate(element) {
    var url = element.attr("src").replace("inactive", "active");
    element.attr("src", url);
}

function deactivate(element, allowchange = false) {
    if (element.attr('id') == activeSubPage && !allowchange) return;

    var url = element.attr("src");
    if (url.search("inactive") == -1) {
        url = url.replace("active", "inactive");
        element.attr("src", url);
    }
}

function activateLeft(name) {
    $(".left").fadeOut();
    $("." + name + "-left").fadeIn();
}

function toggleDescription(element) {

    var par = element.parent().parent().find("p");

    if (par.css("opacity") == 1) par.animate({ opacity: 0, height: 0 });
    else par.animate({ opacity: 1, height: "1em" });
}

function changeGallery() {
    $(".sub-gallery").hide();
    $("." + activeSubPage + "-gallery").find(".sub-gallery").show();

    $(".body").css("height", $(".gallery").css("height"));
}

function changeView(element) {
    if (level >= 2) return;

    scrollTo();

    var previous = activeSubPage;
    activeSubPage = element.attr('id');

    if (previous != activeSubPage) {
        toggleDescription($("#" + previous));
        toggleDescription($("#" + activeSubPage));

        activateLeft(activeSubPage);
    }

    var id = "#" + activeSubPage + "-view";

    $(".hideOnChange").hide();
    $(id).show();

    changeGallery();
    attachParagraphs();

    if (level == 0) {
        $("#logo-item").fadeOut(300);

        $(".middleBar").animate({
            width: $(window).width() / 2 - parseInt($(".middleBar").css("margin-left"), 10) + "px"
        });

        level = 1;
    } else if (level == 1) {
        deactivate($("#" + previous));
    }

    $(".picto-nav-item").not(".vn, #logo, " + "#" + activeSubPage)
        .animate({
            width: "70%",
            height: "70%"
        });

    $("#" + activeSubPage).animate({
        width: "100%",
        height: "100%"
    });

    try {
        window.history.pushState(activeSubPage, '', `?active=${activeSubPage}`);
    } catch (e) {
        console.log("CORS is blocking a feature on this site (using url parameters to navigate through subpages). Run the site on localhost to see it!");
    }
}

function fuckGoBack() {
    if (level == 0) window.location.href = "../index.html";
    else if (level == 1) {
        scrollTo();
        $(".body").css("height", "100%");
        $(".sub-gallery").hide();

        $(".hideOnChange").hide();
        $("#main-view").show();

        toggleDescription($("#" + activeSubPage));
        deactivate($("#" + activeSubPage), true);

        $(".middleBar").animate({
            "width": "100%"
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

function toggleGalleryActivity() {
    $(".gallery").toggleClass("gallery-active");
}

function openGallery() {
    $(".gallery").addClass("gallery-opened");

    var activeFD = $("#" + activeSubPage).parent().parent();
    var id = "#" + activeSubPage + "-view";

    $(".middleBar").animate({
        width: $(window).width() * level1Width / 100 - parseInt($(".middleBar").css("margin-left"), 10) + "px"
    });

    $(".forDescription").fadeOut(500, function () {
        activeFD.toggleClass("center");
    });

    activeFD.fadeIn()

    $(".view").fadeOut();

    $(".gallery").animate({ "left": level1Width + "vw" });

    level = 2;
}

function closeGallery() {
    if (!$(".gallery").hasClass("gallery-opened")) return;

    $(".gallery").removeClass("gallery-opened");

    var activeFD = $("#" + activeSubPage).parent().parent();
    var id = "#" + activeSubPage + "-view";

    $(".middleBar").animate({
        "width": $(window).width() / 2 - parseInt($(".middleBar").css("margin-left"), 10) + "px"
    });

    activeFD.fadeOut(500, function () {
        activeFD.toggleClass("center");
        $(".forDescription").fadeIn();
    });

    $(".hideOnChange").hide();
    $(id).show();

    $(".gallery").animate({ "left": "40vw" });

    level = 1;
}

function toggleGallery() {
    if (level == 1) openGallery();
    else closeGallery();
}

function leftNavbarScroll(element) {
    scrollTo(element.offset().top, "slow", "easeInOutExpo");
}

function attachScrollListener() {
    activate($("#" + currentSubGallery).find("img"));

    var previous = currentSubGallery;

    $(window).scroll(function () {
        var wst = $(window).scrollTop();

        if (activeSubPage == "backpack") {
            if (wst < $("#Coffie-sg").offset().top) { // d1
                currentSubGallery = "d1Logo";
            } else if (wst < $("#Tools-sg").offset().top) { // Coffie
                currentSubGallery = "Coffie";
            } else if (wst < $("#Chests-sg").offset().top) { // Tools
                currentSubGallery = "Tools";
            } else if (wst < $("#Cloaths-sg").offset().top) { // Chests
                currentSubGallery = "Chests";
            } else { // Cloaths
                currentSubGallery = "Cloaths";
            }
        }

        if (previous != currentSubGallery) {
            deactivate($("#" + previous).find("img"));
            activate($("#" + currentSubGallery).find("img"));

            previous = currentSubGallery;
        }
    });
}

function attachParagraphs() {
    if (activeSubPage == "fireplace") {
        $(".floatingParagraph").each(function () {
            var id = $(this).attr("id");
            var name = "#" + id.slice(0, id.search('-')) + "-sg";

            $(this).css("top", $(name).offset().top);
        });
    } else if (activeSubPage == "backpack") {
        $(".floatingParagraph").each(function () {
            var id = $(this).attr("id");
            var name = "#" + id.slice(0, id.search('-')) + "-sg";

            $(this).css("top", $(name).offset().top);
        });
    }
}

$(document).ready(function () {
    $(".picto-nav-item").not("#logo").not(".vn").css("margin-bottom", "1.5em");

    $(".left").hide();
    $(".sub-gallery").hide();

    $(".forDescription, #goBack, #logo-item")
        .mouseenter(function () {
            activate($(this).find('img'));
        }).mouseleave(function () {
            deactivate($(this).find('img'));
        }).not("#goBack, #logo-item").click(function () {
            changeView($(this).find('img'));
            $(".picto-nav-item").not("#logo").not(".vn").css("margin-bottom", "0");
        });

    $(".vn")
        .mouseenter(function () { activate($(this).find('img')); })
        .mouseleave(function () {
            if (currentSubGallery != $(this).attr("id")) {
                deactivate($(this).find('img'));
            }
        }).click(function () {
            leftNavbarScroll($("#" + $(this).attr("id") + "-sg"));
        });

    attachScrollListener();

    $("#goBack").click(function () {
        fuckGoBack();
        $(".picto-nav-item").not("#logo").not(".vn").css("margin-bottom", "1.5em");
    });
    $(".gallery").mouseenter(function () { toggleGalleryActivity() });

    $(".gallery").click(function () { openGallery() });

    $(".gallery").mouseleave(function () { toggleGalleryActivity(); closeGallery() });

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


    $(".small-gallery-item")
        .mouseenter(function () {
            $(this).animate({
                marginLeft: "0",
                width: "80vw"
            });
        }).mouseleave(function () {
            $(this).animate({
                marginLeft: "10vw",
                width: "50vw"
            });
        });

    $(".hideOnChange").hide();

    activeSubPage = getQueryParams(window.location.search).active;
    let urlActiveSubpage = $(`.forDescription img#${activeSubPage}`);

    urlActiveSubpage.trigger('click');
    activate(urlActiveSubpage);
    toggleDescription($("#" + activeSubPage));
});
