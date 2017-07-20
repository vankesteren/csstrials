var circs=[[64,64],[128,64],[192,64],[256,64],[320,64],[384,64],[448,64],[512,64],[64,128],[128,128],[192,128],[256,128],[320,128],[384,128],[448,128],[512,128],[64,192],[128,192],[192,192],[256,192],[320,192],[384,192],[448,192],[512,192],[64,256],[128,256],[192,256],[256,256],[320,256],[384,256],[448,256],[512,256],[64,320],[128,320],[192,320],[256,320],[320,320],[384,320],[448,320],[512,320],[64,384],[128,384],[192,384],[256,384],[320,384],[384,384],[448,384],[512,384],[64,448],[128,448],[192,448],[256,448],[320,448],[384,448],[448,448],[512,448],[64,512],[128,512],[192,512],[256,512],[320,512],[384,512],[448,512],[512,512]];var gammaFunc=function(x,a,b,cutdist){return x>cutdist?0:Math.pow(b,a)*Math.pow(x,a-1)*Math.exp(-b*x)/math.gamma(a)};var calcDisplacement=function(mousex,mousey,points,dmultip){var m=[[mousex,mousey]];var p=typeof points!=="undefined"?points:[[2,3],[3,2],[-2,-3],[-3,-2]];var dm=typeof dmultip!=="undefined"?dmultip:1;var i=Array.apply(null,Array(p.length)).map(Array.prototype.valueOf,[1]);var xyDist=math.subtract(p,math.multiply(i,m));var dists=xyDist.map(function(x){var eudist=math.sqrt(math.sum(math.square(x)));var disp=Math.round(dm*1e6*gammaFunc(eudist,1.8,1/40,400)/gammaFunc(1.8,1.8,1/40,1e4))/1e6;return disp});var angles=xyDist.map(function(x){return math.atan2(x[0],x[1])});return{distance:dists,angle:angles}};var updatePoints=function(mousex,mousey){var cd=calcDisplacement(mousex,mousey,circs,10);var cc=$("#circles").children();for(i=0;i<cc.length;i++){var tr="translate("+cd.distance[i]*math.sin(cd.angle[i])+","+cd.distance[i]*math.cos(cd.angle[i])+")";cc[i].setAttribute("transform",tr)}};var resetPoints=function(){var cc=$("#circles").children();for(i=0;i<cc.length;i++){cc[i].setAttribute("transform","translate(0,0)")}};var initPoints=function(points,svgid,r,colour){var r=typeof r!=="undefined"?r:10;var colour=typeof colour!=="undefined"?colour:["#BBBBBB","#333333"];var cl=colour.length;var svg=document.querySelector(svgid);var g=document.createElement("g");g.setAttribute("class","circles");for(i=0;i<points.length;i++){var circle=document.createElement("circle");circle.setAttribute("cx",points[i][0]);circle.setAttribute("cy",points[i][1]);circle.setAttribute("r",r);circle.setAttribute("fill",colour[i%cl]);g.appendChild(circle)}svg.appendChild(g)};var svg=document.querySelector("#mousesvg");var pt=svg.createSVGPoint();document.documentElement.addEventListener("mousemove",function(evt){pt.x=evt.clientX;pt.y=evt.clientY;var cursorpt=pt.matrixTransform(svg.getScreenCTM().inverse());updatePoints(cursorpt.x,cursorpt.y)},false);