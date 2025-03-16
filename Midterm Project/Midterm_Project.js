let scene = 1
let rectX,rectY,rectWidth,rectHeight
let edgeCircles = []
let radius = 50;
let myCircle;


  function setup() {
      createCanvas(windowWidth,windowHeight);
      //noStroke();
      background(255);
      rectWidth = 800;
      rectHeight = 800;
      rectX = (windowWidth - rectWidth) /2;
      rectY = (windowHeight - rectHeight)/2;
      myCircle = new Circle(mouseX, mouseY, radius);
      
    }
    function draw() {
      background(220);
      if (scene == 1){
        if (rectWidth,rectHeight >= radius *3){
          rectX = (windowWidth - rectWidth) /2;
          rectY = (windowHeight - rectHeight)/2;
        }
        else{
          rectHeight = radius + 100 ;
          rectWidth = radius +100 ;
        }
        
        noFill();
        rect(rectX, rectY, rectWidth, rectHeight);

        myCircle.x = mouseX; 
        myCircle.y = mouseY;
        myCircle.updateTrail(); // Update the trail
        myCircle.draw(); // Draw main circle + trail

        if (myCircle.keepInRect(rectX, rectY, rectWidth, rectHeight)) {
            rectWidth -= 1.5;
            rectHeight -= 1.5;
        }

        for (let circle of edgeCircles) {
            circle.updatePosition(rectX, rectY, rectWidth, rectHeight);
            circle.drawEdgeCircles();
        }
    }
    else if(scene == 0){
      background(0);
    }
}
      
      

    /*
    function mouseClicked(){
      scene+=1;
      if (scene >= 4) {
        scene = 0
      }
      }*/
    class Circle {
      constructor(x, y, radius,fillColor = 0 ,strokeColor = null) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.trail =[];
        if (strokeColor == null){
          let r = map(mouseX, 0, windowWidth, 100, 200);
          let g = map(mouseY, 0, windowHeight, 100, 200);
          let b = map((mouseX + mouseY) / 2, 0, (windowWidth + windowHeight) / 2, 100, 200);
          this.strokeColor = color(r, g, b);
        }
        else{
          this.strokeColor = strokeColor
        }
      }

      isInsideRect(rectX, rectY, rectWidth, rectHeight) {
        return this.x > rectX + this.radius && this.x < rectX + rectWidth - this.radius &&
               this.y > rectY + this.radius && this.y < rectY + rectHeight - this.radius;
    }

      keepInRect(rectX, rectY, rectWidth, rectHeight) {
        let touchedEdge = false;
        if (this.x - this.radius < rectX) {
          this.x = rectX + this.radius;
          touchedEdge = true;
        } else if (this.x + this.radius > rectX + rectWidth) {
          this.x = rectX + rectWidth - this.radius;
          touchedEdge = true;
        }
        if (this.y - this.radius < rectY) {
          this.y = rectY + this.radius;
          touchedEdge = true;
        } else if (this.y + this.radius > rectY + rectHeight) {
          this.y = rectY + rectHeight - this.radius;
          touchedEdge = true;
        }
        if (touchedEdge) {
          edgeCircles.push(new Circle(this.x, this.y, this.radius,null,this.strokeColor));
        }
      return touchedEdge;
      }
      updatePosition(rectX, rectY, rectWidth, rectHeight) {
        // Adjust the position of the circle relative to the shrinking rectangle
        if (this.x - this.radius < rectX) {
          this.x = rectX + this.radius;
      } else if (this.x + this.radius > rectX + rectWidth) {
          this.x = rectX + rectWidth - this.radius;
      }
      if (this.y - this.radius < rectY) {
          this.y = rectY + this.radius;
      } else if (this.y + this.radius > rectY + rectHeight) {
          this.y = rectY + rectHeight - this.radius;
      }
  }
  updateTrail() {
    if (!this.strokeColor) {
        this.strokeColor = color(150, 150, 150); // Default if undefined
    }

    this.trail.push({ x: this.x, y: this.y, color: this.strokeColor, alpha: 255 });

    for (let i = this.trail.length - 10; i >= 0; i--) {
        if (!this.trail[i]) continue; // Skip undefined entries

        this.trail[i].alpha -= 5;

        if (this.trail[i].alpha <= 0) {
            this.trail.splice(i, 1);
        }
    }
}

      draw() {
        this.x = mouseX;
        this.y = mouseY;
        this.updateTrail();

        for(let t of this.trail){
          print("Drawing trail circle:", t);
          push();
          stroke(red(t.color), green(t.color), blue(t.color), t.alpha);
          ellipse(t.x,t.y,this.radius *2);
          pop();
        }
        push();
        ellipse(this.x, this.y, this.radius * 2);
        pop();
      }
      drawEdgeCircles(){
        push();
        stroke(this.strokeColor)
        ellipse(this.x, this.y, this.radius * 2);
        pop();
      }
  }
    
      
      


        

      