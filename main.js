$(document).ready(function() {
  //var anim = false;
  var tid;
  var visible = false;

  function logoAnim() {
    var to = 0
    if (!visible) {
      var to = 600;
      visible = true;
    } else {
      visible = false;
    }
    setTimeout(() => {
      $(".p1").toggleClass("shove");
      $(".p2").toggleClass("shove");
      $(".logo").toggleClass("twist");
    }, 600 - to);
    setTimeout(() => {
      $(".titletext").toggleClass("show");
    }, to);
    //tid = setTimeout(logoAnim, 3000); // repeat myself
  }
  $(".yoyo").click(() => {
    // if (anim) {
    //   clearTimeout(tid);
    //   anim = false;
    // } else {
    // set timeout
    logoAnim()
    //   anim = true
    // }

  });
  
  $(".clickie").click(() => {
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
  
  $(".circles").click(() => {
    $(".circles").children().toggleClass("wave");
    $(".circles").children().toggleClass("turn");
  });
  
});
