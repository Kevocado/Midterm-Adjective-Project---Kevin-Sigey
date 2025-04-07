let scene = 1
let rectX,rectY,rectWidth,rectHeight
let edgeCircles = []
let radius = 50;
let myCircle;
let eye1;
let eye2;
let totalScenes = 3;
let eyeStress = [];
let eyeStress2 = [];
let sceneStartFrame = 0; // Variable to track when scene 2 starts

class Circle {
  constructor(x, y, radius,fillColor = 0, strokeColor = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.trail =[];
    if (scene == 1){
      let r = map(rectWidth, 800, 400, 0, 255);
      let g = 0;
      let b = map(rectWidth, 800, 200, 255, 0);
      this.strokeColor = color(r, g, b);
    }
    else{
      let r = 255;
      let g = 0;
      let b = 0
      this.strokeColor = color(r, g, b);
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
if(this.isInsideRect(rectX,rectY,rectWidth,rectHeight)){
  this.trail.push({ x: this.x, y: this.y, color: this.strokeColor, alpha: 255 });
}
for (let i = this.trail.length - 10; i >= 0; i--) {
    if (!this.trail[i]) continue; // Skip undefined entries
    this.trail[i].alpha -= 50;
    if (this.trail[i].alpha <= 100) {
        this.trail.splice(i, 1);
    }
}
}
  drawCircle() {
    this.updateTrail();
    push();
    strokeWeight(5);
    if (scene ==1){
      for(let t of this.trail){
        stroke(red(t.color), green(t.color), blue(t.color), t.alpha);
        ellipse(t.x,t.y,this.radius *2);
      }
    }
    else{
      noFill();
      stroke(this.strokeColor);
    }
    ellipse(this.x, this.y, this.radius * 2);
    pop();

  }
  drawEdgeCircles(){
    push();
    strokeWeight(5);
    stroke(this.strokeColor)
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}

  function setup() {
      createCanvas(windowWidth,windowHeight);
      background(255);
      rectWidth = 850;
      rectHeight = 850;
      rectX = (windowWidth - rectWidth) /2;
      rectY = (windowHeight - rectHeight)/2;
      myCircle = new Circle(mouseX, mouseY, radius);
      eyeStress = [];
      eyeStress2 = [];
      
    }
    
    function draw() {
      if (scene == 1){
        background(240,map(rectHeight,800,400,255,0),map(rectHeight,800,400,255,0));
        if (rectWidth,rectHeight >= radius *3){
          rectX = (windowWidth - rectWidth) /2;
          rectY = (windowHeight - rectHeight)/2;
        }
        else{
          rectHeight = 850 ;
          rectWidth = 850 ;
          scene = 2;
        }
        
        noFill();
        push();
        strokeWeight(2);
        rect(rectX, rectY, rectWidth, rectHeight);
        pop();


        myCircle.x = mouseX; 
        myCircle.y = mouseY;
        myCircle.updateTrail(); // Update the trail
        if(myCircle.isInsideRect(rectX,rectY,rectWidth,rectHeight)){
          stroke(10);
          myCircle.drawCircle(); // Draw main circle + trail
        }

        if (myCircle.keepInRect(rectX, rectY, rectWidth, rectHeight)) {
            rectWidth -= 1;
            rectHeight -= 1;
        }
        if(myCircle.isInsideRect(rectX,rectY,rectWidth,rectHeight)){
          rectWidth -= 0.35;
          rectHeight -= 0.35;
        }

        for (let circle of edgeCircles) {
            circle.updatePosition(rectX, rectY, rectWidth, rectHeight);
            circle.drawEdgeCircles();
        }
      
    }
   else if (scene == 2) {
    drawJailScene();
  }
}

function drawJailScene() {
  // Check if this is the first frame of scene 2
  if (sceneStartFrame === 0) {
    sceneStartFrame = frameCount; // Record the frame count when scene 2 starts
  }

  // Create a cycling red color using the sin function
  let redValue = map(sin(frameCount * 0.08), -1, 1, 0, 255); // Oscillates between 0 and 255
  background(redValue, 0, 0); // Set the background color to cycle between black and red

  // Define the rectangle for the jail scene
  let jailX = 0;
  let jailY = 0;
  let jailWidth = width;
  let jailHeight = height;

  // Draw the jail rectangle
  noFill();
  stroke(255);
  strokeWeight(5);
  rect(jailX, jailY, jailWidth, jailHeight);

  // Define eye properties
  let eyeX = jailX + jailWidth / 2;
  let eyeY = jailY + jailHeight / 2;
  let eyeSize = 500; // Eye size
  let pupilSize = 75; // Pupil size
  let eyeSpacing = 600;

  // Draw eyes
  fill(255); // White eyes
  noStroke();
  let leftEyeX = eyeX - eyeSpacing / 2;
  let rightEyeX = eyeX + eyeSpacing / 2;

  ellipse(leftEyeX, eyeY, eyeSize, eyeSize); // Left eye
  ellipse(rightEyeX, eyeY, eyeSize, eyeSize); // Right eye

  // Draw pupils constrained to move near the center of the eyes
  fill(50); // Black pupils
  let pupilMovementRadius = eyeSize / 6; // Limit pupil movement to a smaller radius near the center

  let angleLeft = atan2(mouseY - eyeY, mouseX - leftEyeX);
  let angleRight = atan2(mouseY - eyeY, mouseX - rightEyeX);

  let pupilXLeft = leftEyeX + pupilMovementRadius * cos(angleLeft);
  let pupilYLeft = eyeY + pupilMovementRadius * sin(angleLeft);

  let pupilXRight = rightEyeX + pupilMovementRadius * cos(angleRight);
  let pupilYRight = eyeY + pupilMovementRadius * sin(angleRight);

  ellipse(pupilXLeft, pupilYLeft, pupilSize, pupilSize); // Left pupil
  ellipse(pupilXRight, pupilYRight, pupilSize, pupilSize); // Right pupil

  // Draw stress circles on each eye
  for (let i = 0; i < eyeStress.length; i++) {
    let stressCircle = eyeStress[i];

    // Update the stress circle's position to follow the left pupil
    stressCircle.x = pupilXLeft;
    stressCircle.y = pupilYLeft;

    stressCircle.drawCircle(); // Draw the stress circle
    stressCircle.radius += noise(frameCount * 0.01) * 2; // Grow the circle using Perlin noise

    // Reset the circle if it grows too large
    if (stressCircle.radius > eyeSize / 2 - 75) {
      stressCircle.radius = 30; // Reset radius
    }
  }

  for (let i = 0; i < eyeStress2.length; i++) {
    let stressCircle = eyeStress2[i];

    // Update the stress circle's position to follow the right pupil
    stressCircle.x = pupilXRight;
    stressCircle.y = pupilYRight;

    stressCircle.drawCircle(); // Draw the stress circle
    stressCircle.radius += noise(frameCount * 0.01) * 2; // Grow the circle using Perlin noise

    // Reset the circle if it grows too large
    if (stressCircle.radius > eyeSize / 2 - 75) {
      stressCircle.radius = 30; // Reset radius
    }
  }

  // Add new stress circles periodically
  if (frameCount % 100 === 0) { // Add a new circle every 100 frames
    let newCircleLeft = new Circle(pupilXLeft, pupilYLeft, 25, color(255, 0, 0)); // Red circle on left pupil
    let newCircleRight = new Circle(pupilXRight, pupilYRight, 25, color(255, 0, 0)); // Red circle on right pupil
    eyeStress.push(newCircleLeft);
    eyeStress2.push(newCircleRight);
  }

  // Limit the number of stress circles to avoid performance issues
  if (eyeStress.length > 10) {
    eyeStress.shift(); // Remove the oldest circle from the left eye
  }
  if (eyeStress2.length > 10) {
    eyeStress2.shift(); // Remove the oldest circle from the right eye
  }

  // Draw jail bars inside the rectangle
  stroke(255,255,255,250);
  strokeWeight(10);

  let barSpacing = 50;
  for (let i = jailX + barSpacing; i < jailX + jailWidth; i += barSpacing) {
    line(i, jailY, i, jailY + jailHeight); // Vertical bars
  }

  // Reset to scene 1 after 10 seconds (600 frames at 60 FPS)
  if (frameCount - sceneStartFrame > 400) {
    scene = 1; // Reset to scene 1
    sceneStartFrame = 0; // Reset the scene start frame
  }
}



function mousePressed() {
  scene++;
  if (scene > totalScenes) {
    scene = 1; // Reset to the first scene
  }
}