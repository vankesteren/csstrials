var circs = [[64,64],
            [128,64],
            [192,64],
            [256,64],
            [320,64],
            [384,64],
            [448,64],
            [512,64],
            [64,128],
            [128,128],
            [192,128],
            [256,128],
            [320,128],
            [384,128],
            [448,128],
            [512,128],
            [64,192],
            [128,192],
            [192,192],
            [256,192],
            [320,192],
            [384,192],
            [448,192],
            [512,192],
            [64,256],
            [128,256],
            [192,256],
            [256,256],
            [320,256],
            [384,256],
            [448,256],
            [512,256],
            [64,320],
            [128,320],
            [192,320],
            [256,320],
            [320,320],
            [384,320],
            [448,320],
            [512,320],
            [64,384],
            [128,384],
            [192,384],
            [256,384],
            [320,384],
            [384,384],
            [448,384],
            [512,384],
            [64,448],
            [128,448],
            [192,448],
            [256,448],
            [320,448],
            [384,448],
            [448,448],
            [512,448],
            [64,512],
            [128,512],
            [192,512],
            [256,512],
            [320,512],
            [384,512],
            [448,512],
            [512,512]];

var calcDisplacement = function(mousex, mousey, points, dmultip) {
  // mouse location x,y
  var m = [[mousex,mousey]];
  
  // points locations [[x,y],[x,y],...]
  var p = (typeof points !== 'undefined') ?  points : [[ 2, 3],
                                                       [ 3, 2],
                                                       [-2,-3],
                                                       [-3,-2]];
  var dm = (typeof dmultip !== 'undefined') ? dmultip : 1;
    
  // indicator matrix with nrows = npoints
  var i = Array.apply(null, Array(p.length)).map(Array.prototype.valueOf,[1]);
  
  // x-y distance of each point to the mouse
  var xyDist = math.subtract(p,math.multiply(i,m));
  
  // inverse euclidean distance of each point to the mouse
  var dists = xyDist.map(function(x) {
    var eudist = math.sqrt(math.sum(math.square(x)))
    // calculate the displacement using base 2 and min dist of 6
    var disp = Math.log(1.8)*dm/Math.log(Math.max(eudist,6));
    return(disp);
  });
  
  // opposing angle
  var angles = xyDist.map(function(x) {
    return(math.atan2(x[0],x[1]));
  });
  
  return({"distance": dists, "angle": angles})
}

var updatePoints = function(mousex, mousey) {
  var cd = calcDisplacement(mousex, mousey, circs, 200);
  var cc = $("#circles").children();
  for (i=0; i < cc.length; i++){
    var tr = "translate("+ (cd.distance[i]*math.sin(cd.angle[i])) + "," + (cd.distance[i]*math.cos(cd.angle[i])) +")";
    cc[i].setAttribute("transform",tr);
  }
}

var resetPoints = function() {
  var cc = $("#circles").children();
  for (i=0; i < cc.length; i++){
    cc[i].setAttribute("transform","translate(0,0)");
  }
}


var initPoints = function(points, svgid, r, colour) {
  // does not work yet
  var r = (typeof r !== 'undefined') ? r : 10;
  var colour = (typeof colour !== 'undefined') ? colour : ["#BBBBBB","#333333"];
  
  var cl = colour.length;
  var svg = document.querySelector(svgid);
  // add circles
  
  var g = document.createElement("g");
  g.setAttribute("class","circles");
  
  for (i=0; i<points.length; i++) {
    var circle = document.createElement("circle");
    circle.setAttribute("cx",points[i][0]);
    circle.setAttribute("cy",points[i][1]);
    circle.setAttribute("r",r);
    circle.setAttribute("fill", colour[i%cl]);
    g.appendChild(circle);
  }
  
  svg.appendChild(g);
}


// Mouse coordinates within svg & add event listener
var svg = document.querySelector("#mousesvg");
var pt = svg.createSVGPoint();
var pointsBaseState = true;
document.documentElement.addEventListener('mousemove',function(evt){
  pt.x = evt.clientX;
  pt.y = evt.clientY;

  // The cursor point, translated into svg coordinates
  var cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
  if (cursorpt.x > -100 && cursorpt.y > -100 && cursorpt.x < 676 && cursorpt.y < 676) {
    updatePoints(cursorpt.x, cursorpt.y);
    pointsBaseState = false;
  } else if (pointsBaseState == false) {
    // resetPoints();
  }
}, false);
