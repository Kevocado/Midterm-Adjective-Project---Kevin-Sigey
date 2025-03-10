


function setup() {
    createCanvas(windowWidth,windowHeight);
    noStroke();
    background(255);
  }
  function draw() {
    background(220);
    let myCircle = new Circle(200, 200, 50);
    myCircle.draw();
  }


  class Circle {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }
    draw() {
        ellipse(this.x, this.y, this.radius * 2);
      }
}