
var calcDisplacement = function(mousex, mousey, points) {
  // mouse location x,y
  var m = [[mousex,mousey]];
  
  // points locations [[x,y],[x,y],...]
  p = (typeof points !== 'undefined') ?  points : [[ 2, 3],
                                                   [ 3, 2],
                                                   [-2,-3],
                                                   [-3,-2]];
    
  // indicator matrix with nrows = npoints
  var i = Array.apply(null, Array(p.length)).map(Array.prototype.valueOf,[1]);
  
  // x-y distance of each point to the mouse
  var xyDist = math.subtract(p,math.multiply(i,m));
  
  // inverse euclidean distance of each point to the mouse
  var dists = xyDist.map(function(x) {
    return(1/math.sqrt(math.sum(math.square(x))));
  });
  
  // opposing angle
  var angles = xyDist.map(function(x) {
    return(math.atan2(x[0],x[1]))*(180/math.pi);
  });
  
  return({"distance": dists, "angle": angles})
}
