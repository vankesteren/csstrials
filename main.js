$(document).ready(function() {
  // Clickies/user interaction
  $(".yoyo").click(function() {
    $(".p1").toggleClass("shove");
    $(".p2").toggleClass("shove");
    $(".logo").toggleClass("twist");
  });
  
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
  
  $(".okok").click(function() {
    $(".rotator").toggleClass("anim");
    $(".fivedots").children().toggleClass("anim")
  });
  
});
