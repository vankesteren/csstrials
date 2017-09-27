// add some polar stuff to Math
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

// Josephus
class jose {
  constructor(parentsvgId, n) {
    this.n = n;
    this.parent = document.getElementById(parentsvgId);
    this.namespace = this.parent.namespaceURI;
    this.midPoint = [this.parent.viewBox.baseVal.width/2, 
                     this.parent.viewBox.baseVal.height/2];
                     
    // properties
    this.colour = true;
    this.disappear = true;
    this.dist = Math.min(this.midPoint[0], this.midPoint[1])*2/3;
    this.radius = 10
    this.angles = this.createAngles(n);
    this.circs = [];
    this.transDist = this.dist / 5;
    
    this.josephusInd = this.calcJosephus();
    this.progress = 0.0; // 0.0 - 1.0
    
    this.calcCircs();
  }
  
  // constructor functions
  createAngles(n) {
    let step = 360/n;
    let out = [0];
    for (var i = 1; i < n; i++) {
      out.push(i*step);
    }
    return out;
  }
  
  createCircle(angle) {
    var circle = document.createElementNS(this.namespace, "circle");
    
    let x = this.dist * Math.cos(Math.radians(angle-90));
    let y = this.dist * Math.sin(Math.radians(angle-90));
    
    circle.setAttributeNS(null, "cx", this.midPoint[0] + x);
    circle.setAttributeNS(null, "cy", this.midPoint[1] + y);
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "fill", "hsl(" + angle + ", 70%, 50%)");
    circle.setAttributeNS(null, "id", "jos" + this.circs.length);
    circle.setAttributeNS(null, "class", "josCirc");
    circle.style.opacity = "1";
    
    return circle;
  }
  
  calcCircs() {
    this.circs = [];
    for (var i = 0; i < this.angles.length; i++){
      this.circs.push(this.createCircle(this.angles[i]))
    }
  }
  
  calcJosephus() {
    let items = new Array(this.n).fill(0).map((_, idx) => { return idx+1; });
    let sequence = [];
    let count = 1;
    let idx = 0;
    while (items.length > 1) {
        if (idx === items.length) {
            idx = 0;
        }
        if (count === 2) {
            sequence = sequence.concat(items.splice(idx, 1));
            count = 0;
            idx -= 1;
        }
        count++;
        idx++;
    }
    sequence.push(items.pop());
    return sequence;
  }
  
  draw() {
    // first remove children (re-initialise)
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
    // Then add circs
    for (var i = 0; i < this.circs.length; i++) {
      this.parent.appendChild(this.circs[i]);
    }
  }
  
  // beautiful init function
  init() {
    this.setProgress(1.0);
    this.draw();
    let jsph = this
    setTimeout(function () {
      jsph.reset();
    }, 500);
  }
  
  // Actual loader functions
  async start(time = 10000, callback = function() {console.log("done")}) {
    let step = 0.001;
    let ms = time*step;
    
    this.timer = setInterval( () => {
      if (this.progress < 1) {
        this.setProgress(this.progress + step);
      } else {
        clearInterval(this.timer);
        callback();
      }
    }, ms);
  }
  
  stop(callback = function() {console.log("stopped")}) {
    clearInterval(this.timer);
    callback();
  }
  
  reset() {
    this.setProgress(0.000);
  }
  
  setProgress(prop) {
    this.progress = prop;
    this.updateCircs();
  }
  
  updateCircs() {
    let whichStep = Math.min(Math.floor(this.n*this.progress), this.n);
    for (var i = whichStep; i < this.n; i++) {
      this.resetCirc(this.josephusInd[i]-1);
    }
    for (var i = 0; i < whichStep; i++) {
      this.removeCirc(this.josephusInd[i]-1);
    }
  }
  
  removeCirc(k) {
    if (this.disappear) this.circs[k].style.opacity = "0";
    let transx = this.transDist*Math.cos(Math.radians(this.angles[k]-90));
    let transy = this.transDist*Math.sin(Math.radians(this.angles[k]-90));
    let trans = "translate(" + transx + "px, " + transy + "px)";
    this.circs[k].style.transform = trans;
  }
  
  resetCirc(k) {
    this.circs[k].style.opacity = "1";
    this.circs[k].style.transform = "translate(0px, 0px)";
  }  
}
