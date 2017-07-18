$(document).ready(function() {
  // scroll to top button
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 200) {
      $('#totop').addClass("show");
    } else {
      $('#totop').removeClass("show");
    }
  });
  
  $("#totop").click(function() {
    window.scrollTo(0, 0);
  });  
  
  
  // Clickies/user interaction
  // Flash
  $(".yoyo").click(function() {
    $(".p1").toggleClass("shove");
    $(".p2").toggleClass("shove");
    $(".logo").toggleClass("twist");
  });
  
  // Guitzli
  $(".clickie").click(function() {
    if ($(".bg").hasClass("show")) {
      var to = 0;
    } else {
      var to = 700;
    }
    setTimeout(function() {
      $(".bg").toggleClass("show");
    }, 700-to);
    
    setTimeout(function() {
      $(".red").toggleClass("show");
      $(".blue").toggleClass("show");
      $(".grey").toggleClass("show");
    }, to);
  });
  
  // Loading wave
  var numClick = 0
  $(".jaja").click(function() {
    if (numClick == 0) {
      $(".circles").children().toggleClass("wave");
      numClick++;
    } else if (numClick == 1) {
      $(".circles").children().toggleClass("wave");
      $(".circles").children().toggleClass("turn");
      numClick++;
    } else {
      $(".circles").children().toggleClass("turn");
      numClick = 0;
    }
  });
  
  // Wobbly motion
  $(".okok").click(function() {
    $(".rotator").toggleClass("anim");
    $(".fivedots").children().toggleClass("anim")
  });
  
  // Shapeshift
  var aninum = 0;
  var animating = false;
  var tid
  var shape = $("#shape");
  $(".hihi").click(function() {
    if (animating == false) {
      aninum = morph(shape, aninum);
      tid = setInterval(function () {
        if (aninum == 5) {
          clearInterval(tid);
          animating = false;
        }
        aninum = morph(shape, aninum);
      }, 150);
      animating = true;
    } else {
      clearInterval(tid);
      aninum = morph(shape, 5);
      animating = false;
    }
  });
  
  var morph = function(shape, aninum) {
    switch (aninum) {
      case 0:
        TweenLite.to(shape.attr("fill", "#fec111"), 0.4, {attr:{d:"M 480 480 L 500 440 L 520 480 L 560 500 L 520 520 L 500 560 L 480 520 L 440 500 Z"}, ease: Elastic.easeOut});
        break;
        
      case 1:
        TweenLite.to(shape.attr("fill", "#32936F"), 0.4, {attr:{d:"M 400 400 L 500 440 L 600 400 L 560 500 L 600 600 L 500 560 L 400 600 L 440 500 Z"}, ease: Elastic.easeOut});
        break;
        
      case 2:
        TweenLite.to(shape.attr("fill", "#f06392"), 0.4, {attr:{d:"M 400 400 L 500 240 L 600 400 L 760 500 L 600 600 L 500 760 L 400 600 L 240 500 Z"}, ease: Elastic.easeOut});
        break;
        
      case 3:
        TweenLite.to(shape.attr("fill", "#478fcc"), 0.4, {attr:{d:"M 240 240 L 500 240 L 760 240 L 760 500 L 760 760 L 500 760 L 240 760 L 240 500 Z"}, ease: Elastic.easeOut});
        break;
        
      case 4:
        TweenLite.to(shape.attr("fill", "#4daf4e"), 0.4, {attr:{d:"M 240 240 L 500 450 L 760 240 L 550 500 L 760 760 L 500 550 L 240 760 L 450 500 Z"}, ease: Elastic.easeOut});
        break;
      
      case 5:
        TweenLite.to(shape.attr("fill", "#009789"), 0.4, {attr:{d:"M 480 480 L 500 480 L 520 480 L 520 500 L 520 520 L 500 520 L 480 520 L 480 500 Z"}, ease: Elastic.easeOut});
        break;
      default:
        
    }  
    return(aninum++ == 5 ? 0 : aninum++)
  }
  
  //path
  var riding = false;
  var prepared = false;
  var stopping = false;
  var dir = "f"
  var intrvl;
  var intrvl2;
  
  var moti = document.getElementById('moti');
  moti.beginElement();
  $(".doei").click(function() {
    if (!prepared) {
      intrvl2 = setInterval(function () {
        var cur = $(".shuttletext").html();
        if (cur == "Shut") {
          $(".shuttletext").html("tle");
        } else if (cur == "tle") {
          $(".shuttletext").html("Loop");
        } else {
          $(".shuttletext").html("Shut");
        }
      }, 1200);
      $("#tracktxt").html("preparing...");
      $(".doei").css('pointerEvents',"none");
      moti.beginElement();
      $("#moti").attr("keyPoints","0.35;0");
      moti.endElementAt(3);
      setTimeout(function () {
        prepared = true;
        $(".doei").css("pointerEvents", "auto");
        $("#tracktxt").html("ready");
      }, 3000);
    } else {
      if (!riding) {
        riding = true;
        $("#tracktxt").html("");
        $("#moti").attr("keyPoints","0;1");
        moti.beginElement();
        intrvl = setInterval(function() {
          if (stopping) {
            clearInterval(intrvl);
            clearInterval(intrvl2);
            if (dir == "f") {
              dir = "b";
              $("#moti").attr("keyPoints","1;0.35");
            } else {
              dir = "f";
              $("#moti").attr("keyPoints","0;0.35");
            }
            setTimeout(function () {
              dir = "f";
              riding = false;
              prepared = false;
              stopping = false;
              $(".doei").css("pointerEvents", "auto");
              $("#tracktxt").html("");
              $("#moti").attr("keyPoints","0.35;0.35");
              moti.endElementAt(0.01);
              $(".shuttletext").html("");
            }, 2990);
          } else {
            if (dir == "f") {
              dir = "b";
              $("#moti").attr("keyPoints","1;0");
            } else {
              dir = "f";
              $("#moti").attr("keyPoints","0;1");
            }
          }
        }, 3000);
      } else {
        $("#tracktxt").html("stopping...");
        $(".doei").css('pointerEvents',"none");
        stopping = true;
      }
    }
    
  })
});
