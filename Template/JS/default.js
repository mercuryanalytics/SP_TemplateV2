//***********************************************************************
//***********************************************************************
//** Licensed Materials - Property of UNICOM Systems, Inc.
//** (C) Copyright UNICOM Systems, Inc. - a Division of UNICOM Global. 2001 - 2017
//***********************************************************************
//***********************************************************************
/*(function () {
  //if the browser does not support media queries add an event listener for window resize:
  if (!window.matchMedia) {
    var head = document.getElementsByTagName("head")[0];
    var linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("type", "text/css");
    linkElement.id = "noMediaQueryCss";
    head.appendChild(linkElement);

    var mediaQueryLinks = new Array();
    var links = head.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
      var mediaAttribute = links[i].getAttribute("media");
      if (
        mediaAttribute &&
        (mediaAttribute.search("min-width") > -1 ||
          mediaAttribute.search("max-width") > -1)
      ) {
        mediaQueryLinks.push(new mediaQueryLink(links[i]));
      }
    }

    //This is the function we'll perform EVERY time the window is resized
    var resizeHandler = function () {
      var bodyElement = document.getElementsByTagName("body")[0];
      var clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      for (var i = 0; i < mediaQueryLinks.length; i++) {
        var nHref = mediaQueryLinks[i].href(clientWidth);
        if (nHref != false) {
          var noMediaQueryCSS = nHref;
          var currentStyle = document.getElementById("noMediaQueryCss");
          if (nHref != currentStyle.getAttribute("href")) {
            //remove the child - this will cause a reflow of the css
            head.removeChild(currentStyle);

            //create a replacement stylesheet link
            var newLink = document.createElement("link");
            newLink.setAttribute("rel", "stylesheet");
            newLink.setAttribute("type", "text/css");
            newLink.id = "noMediaQueryCss";
            //appending the new link will caus a reflow.
            newLink.setAttribute("href", noMediaQueryCSS);
            head.appendChild(newLink);
          }
        }
      }
    };

    //add the css link element to the head
    resizeHandler();

    //now check for EventListener - standard
    if (window.addEventListener) {
      window.addEventListener("resize", resizeHandler, false);
    }
    //now ie
    else if (window.attachEvent) {
      window.attachEvent("onresize", resizeHandler);
    }
  }
  return;

  function mediaQueryLink(linkEl) {
    //takes a link element with a media attribute, looks for the min-width and the max-width, and creates a test function that passes back the href
    this.minWidth = null;
    this.maxWidth = null;

    var thisHref = linkEl.getAttribute("href");
    var mediaString = linkEl.getAttribute("media");

    //look for the min-width
    if (mediaString.search(/min\-width/) > -1) {
      var minString = mediaString.match(/min\-width\:\s+\d+px/)[0];
      minString = minString.match(/\d+/)[0];
      this.minWidth = Number(minString);
    }

    //look for the max-width
    if (mediaString.search(/max\-width/) > -1) {
      var maxString = mediaString.match(/max\-width\:\s+\d+px/)[0];
      maxString = maxString.match(/\d+/)[0];
      this.maxWidth = Number(maxString);
    }

    var _this = this;

    //when the object is asked for the href, do the following test of the current width of the browser (tValue argument).
    this.href = function (tValue) {
      if (_this.minWidth && _this.maxWidth) {
        if (_this.minWidth <= tValue && _this.maxWidth >= tValue) {
          return thisHref;
        } else {
          return false;
        }
      } else if (_this.minWidth && !_this.maxWidth) {
        if (tValue > _this.minWidth) {
          return thisHref;
        } else {
          return false;
        }
      } else {
        if (tValue < _this.maxWidth) {
          return thisHref;
        } else {
          return false;
        }
      }
    };
  }
  ////////////custom functions
})();

$(document).ready(function () {
  //alert("ready");
  $(".mrGridTable tr td").click(function () {
    //console.log("a");
    $(this).find("input:radio").attr("checked", true);
    $(this).find("input:checkbox").attr("checked", true);
  });
  if ($(".mrSingleText").length > 0) {
    let maxheight = 0;
    let maxwidth = 0;
    $(".mrSingleText").each(function () {
      if (maxheight < $(this).height()) maxheight = $(this).height();
      if (maxwidth < $(this).width()) maxwidth = $(this).width();
    });
    $(".mrSingleText").each(function () {
      if (maxheight < $(this).height()) maxheight = $(this).height();
      $(this).height(maxheight + "px");
      $(this).width(maxwidth + "px");
    });
  }
  if ($(".mrMultipleText").length > 0) {
    let maxheight = 0;
    let maxwidth = 0;
    $(".mrMultipleText").each(function () {
      if (maxheight < $(this).height()) maxheight = $(this).height();
      if (maxwidth < $(this).width()) maxwidth = $(this).width();
    });
    $(".mrMultipleText").each(function () {
      $(this).height(maxheight + "px");
      $(this).width(maxwidth + "px");
    });
  }
  //.
});

function isMobile() {
  return window.matchMedia("only screen and (max-width: 760px)").matches;
}


$(".mrSingleText").addEventListener("click", function() {
  $("mrSingle").style.display="inline";
}) */

var single = document.querySelectorAll(".mrSingle");
var questionText = document.querySelector(".mrQuestionText");
var singleText = document.querySelectorAll(".mrSingleText");
var singleChecked = (document.querySelectorAll(".mrSingle").checked = "True");
var slider = document.querySelector(`[data-questiontype="slider"]`);
var table = document.querySelector(".mrQuestionTable");
var multiple= document.querySelectorAll(".mrMultipleText");
single.forEach(function (i) {
  if (single.length < 8) {
    singleText.forEach(function (j) {
      i.style.display = "none";
      i.addEventListener("click", function () {
        console.log("hello1");
      });
    });
  } else if (single.length > 7) {
    multiple.forEach(function (j) {
      i.style.display = "none";
      i.addEventListener("click", function () {
        console.log("hello2");
      });
    });
  }
});
$(document).ready(function () {
  let questiontype = $(".mrGridTable").eq(0).attr("data-questiontype");
  if (questiontype === "slider") {
    setGridSlider();
  }
  if ($("[data-questiontype=M2MAnimationVideo]").length > 0) {
    $(".mrNext").show();
  }
});
function setGridSlider() {
  let htmlText = "<table class='slider-table' style='border:1px solid black'>";
  $(".question-controls").hide();
  $(".mrGridCategoryText").each(function () {
    //console.log(scalelength);
    let Qname = $(this).siblings().eq(0).children().eq(1).attr("id");
    Qname = Qname.substring(1, Qname.indexOf("C"));
    htmlText +=
      "<tr class='radio_slider'><td style='border:1px solid black' class='slider_text'>" +
      $(this).html() +
      "</td><td style='border:1px solid black' class='slider-cell'><div class='slider' name = '" +
      Qname +
      "'></div></td></tr>";
  });
  htmlText += "</html>";
  $(".questionArea").append(htmlText);
  //getSliderVaues();
  createSlider();
}
function createSlider() {
  $(".slider").each(function (index) {
    let selectedVal = 0;
    let QSetname = $(".mrGridCategoryText")
      .eq(index)
      .siblings()
      .eq(0)
      .children()
      .eq(1)
      .attr("name");

    var selected = $("input[type='radio'][name='" + QSetname + "']:checked");
    console.log(selected.val());
    if (selected.val()) {
      selectedVal = parseInt(selected.val().replace("Option0", ""));
    }
    console.log(index);
    $(this).slider({
      value: selectedVal - 1,
      min: 1,
      max: $(".mrGridCategoryText").eq(index).siblings().length,
      slide: function (event, ui) {
        $(".ui-slider-handle").eq(index).text(ui.value);
        $(".ui-slider-handle").eq(index).css({ "text-align": "center" });
        $(".ui-slider-handle")
          .eq(index)
          .css({ "background-color": "rgb(249, 179, 97)" });
        let id = $(this).attr("name");
        $("#_" + id + "C" + ui.value).prop("checked", true);
      },
    });
  });
}
///////////////////////////////////
/*if(document.body.contains(slider)){
  console.log("Hello Table")
  table.style.display="none"
}*/

for (var i = 0; i < 100; i++) {
  var labels = document.querySelector(`label[for="_Q0_C${i}"]`);
  if (!labels) break;
  singleText.forEach(function (k) {
    var eText = k.innerText;
    var Male = "Male";
    var Female = "Female";
    console.log(eText);
    if (eText === Male || eText === Female) {
      labels.style.margin = "0vw 1vw 1vw 16vw";
      labels.style.border = "1px solid rgb(249, 179, 97)";
      labels.style.textAlign = "center";
      labels.style.display = "inline-block";
      labels.style.width = "11vw";
      labels.style.padding = "1vw 1vw";
    } else {
      labels.style.margin = "0vw 1vw 1vw 2vw";
      labels.style.border = "1px solid rgb(249, 179, 97)";
      labels.style.textAlign = "center";
      labels.style.display = "inline-block";
      labels.style.width = "38vw";
      labels.style.padding = "1vw 1vw";
    }
  });
}
for(var i = 0; i < 100; i++) {
  var labels2 = document.querySelector(`label[for="_Q0_C${i}"] > span`)
  if(!labels2) break;

}

$(document).ready(function () {
  $(".mrGridTable td").each(function () {
    $(this).click(function (event) {
      var target = $(event.target);
      if (target.is("input:radio")) return;
      $(this)
        .find("input:radio, input:checkbox")
        .each(function () {
          var id = $(this).attr("id");
          //alert(id);
          if ($(this).attr("checked")) $(this).attr("checked", false);
          else $(this).attr("checked", true);
        });
    });
  });
});

function hideLoader() {
  $('#loading').hide();
}

$(window).ready(hideLoader);
//setTimeout(hideLoader, 2 * 1000);//

multiple.forEach(function(i){
  if(multiple.length<2){
    console.log("hello1")
  i.style.left="3vw";
  i.style.display="inline-block";
  i.style.margin="0.4vw -42vw";
  i.style.textIndent="1vw";
  }
  else if(multiple.length>0){
    console.log("hello2")
  i.style.left="3vw";
  i.style.display="inline-block";
  i.style.margin="2.5vw";
  i.style.textIndent="14vw";
  i.style.position="absolute";
  i.style.fontSize="1.4vw";
  }
})