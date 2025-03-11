let scene = 1
let rectX,rectY,rectWidth,rectHeight

  function setup() {
      createCanvas(windowWidth,windowHeight);
      //noStroke();
      background(255);
      rectX = windowWidth/4;
      rectY = windowHeight/4;
      rectWidth = windowWidth/2;
      rectHeight = windowHeight/2;
    }
    function draw() {
      background(220);
      if (scene == 1){
        //fill(255);
        noFill();
        rect(rectX, rectY,rectWidth,rectHeight);
        let myCircle = new Circle(mouseX, mouseY, 50);
        myCircle.keepInRect(rectX, rectY, rectWidth, rectHeight);
        myCircle.draw();
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
      constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
      }

      keepInRect(rectX, rectY, rectWidth, rectHeight) {
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
      draw() {
        ellipse(this.x, this.y, this.radius * 2);
    }

      }
        

      