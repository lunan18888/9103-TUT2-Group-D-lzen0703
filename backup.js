// Define colours
let limeGreen, roseRed, milkYellow, linePurple, shallowPurple;

// Create dimension for inside canvas
let insideCanvas;

// Array to store small rectangles
let smallRectangles = [];
let numOfSmallRects = 60;

// Array to store purple lines
let purpleLinesArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // State parameter range to use opacity under HSB mode
  // The current project uses RGB as its default colour mode
  colorMode(RGB);
  angleMode(DEGREES);

  // Preset colours
  limeGreen = color(130, 255, 213);
  roseRed = color(190, 34, 74);
  milkYellow = color(225, 226, 208);
  linePurple = color(128, 132, 255);
  shallowPurple = color(216, 222, 255);

  // Initialise insideCanvas
  insideCanvas = new InsideCanvas();

  // Generate small rectangles
  generateSmallRectangles();

  // Generate purple lines
  generatePurpleLines();
}

function draw() {
  // This is background color
  background(255);
  // Draw canvas for the drawing elements
  drawInsideCanvas();
  drawFrame();

  // Draw purple lines in the canvas
  // This must be at the bottom of the canvas
  drawPurpleLines();

  // Draw small rectangles
  drawSmallRectangles();

  // Draw big rectangles in fixed position
  drawLinePurpleRectangles(); // Line Purple
  drawBigLimeRectangles();  // Lime green
  drawBigRoseRectangles();  // Rose Red
  drawMilkYellowRectangles(); // Milk yellow

  // Draw centre circles of each rectangles
  drawCenteredCircles();

  // This is the shadow of the whole canvas
  // This must be on the top of the canvas
  drawShadow();
  drawLightShadow();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Update insideCanvas dimensions
  insideCanvas.updateDimensions();

  // Regenerate small rectangles
  generateSmallRectangles();

  // Regenerate purple lines
  generatePurpleLines();
}

// Draw inside canvas based on the insideCanvas class
function drawInsideCanvas() {
    // Draw inside canvas
    fill(shallowPurple);
    noStroke();
    rect(insideCanvas.x, insideCanvas.y, insideCanvas.width, insideCanvas.height);
}

function drawFrame() {
for (let i = 0; i < 30; i++) {
    noFill();
    stroke(73 + 3 * i, 38 + i, 1 + i);
    let frameX = insideCanvas.x - i / 2;
    let frameY = insideCanvas.y - i / 2;
    let frameWidth = insideCanvas.width + i;
    let frameHeight = insideCanvas.height + i;
    rect(frameX, frameY, frameWidth, frameHeight);
  }
}

let purpleLinesDataArray = [
  // Horizontal lines
  { x: 0, y: 1 / 20, w: 7 / 10, h: 1 / 20 },
  { x: 7 / 10, y: 1.5 / 20, w: 3 / 10, h: 1 / 20 },
  { x: 0, y: 1 / 4, w: 7 / 10, h: 1 / 20 },
  { x: 0, y: 11.5 / 20, w: 2 / 5, h: 1 / 20 },
  { x: 7 / 10, y: 12 / 20, w: 3 / 10, h: 1 / 20 },
  { x: 2 / 5, y: 13 / 20, w: 3 / 10, h: 1 / 20 },
  { x: 0, y: 14 / 20, w: 2 / 5, h: 1 / 20 },
  { x: 2 / 5, y: 3 / 4, w: 3 / 10, h: 1 / 20 },
  { x: 7 / 10, y: 15.5 / 20, w: 1 / 5, h: 1 / 20 },
  { x: 7 / 10, y: 17 / 20, w: 3 / 10, h: 1 / 20 },
  { x: 0, y: 9 / 10, w: 7 / 10, h: 1 / 20 },

  // Vertical lines
  { x: 2 / 25, y: 0, w: 1 / 50, h: 1 },
  { x: 4 / 25, y: 0, w: 1 / 50, h: 1 },
  { x: 2 / 5, y: 0, w: 1 / 50, h: 1 },
  { x: 1 / 2, y: 0, w: 1 / 50, h: 1 / 4 },
  { x: 13 / 25, y: 3 / 4, w: 1 / 50, h: 1 / 4 },
  { x: 14 / 25, y: 1 / 20, w: 1 / 50, h: 7.5 / 12 },
  { x: 15.5 / 25, y: 1 / 20, w: 1 / 50, h: 7.5 / 12 },
  { x: 17 / 25, y: 0, w: 1 / 50, h: 1 },
  { x: 18 / 25, y: 17 / 20, w: 1 / 50, h: 3 / 20 },
  { x: 19 / 25, y: 1 / 10, w: 1 / 50, h: 8 / 10 },
  { x: 21 / 25, y: 1 / 10, w: 1 / 50, h: 9 / 10 },
  { x: 22.5 / 25, y: 0, w: 1 / 50, h: 1 }
];

function generatePurpleLines() {
  purpleLinesArray = purpleLinesDataArray.map(data => new PurpleLine(data.x, data.y, data.w, data.h));
  purpleLinesArray.forEach(line => line.updateSize(insideCanvas.width, insideCanvas.height));
}

function drawPurpleLines() {
  noStroke();
  purpleLinesArray.forEach(line => line.display());
}

//This is light part of shallow
function drawLightShadow(){
    fill(255, 10);
    noStroke;
    //Create base part of shallow triangles
    //Base elements of shallow
    let baseUpX1 = windowWidth / 5;
    let baseUpY1 = windowHeight / 7;
    let baseUpX2 = windowWidth / 5;
    let baseUpY2 = 3 * windowHeight / 7;
    let baseUpX3 = 9 * windowWidth / 25;
    let baseUpY3 = 2 * windowHeight / 7;
    let baseUpX4 = 9 * windowWidth / 25;
    let baseUpY4 = 4 * windowHeight / 7 - 2;
    //Empty between shallow shapes
    let shallowEmptyX = windowWidth / 40;
    let shallowEmptyY = windowHeight / 25;
    //calculate the distance between two shapes
    let shallowDistanceX = shallowEmptyX + 4 * windowWidth / 25;
    let shallowDistanceY = shallowEmptyY + 2 * windowHeight / 7;
    //claculate the distance between vertical column
    let shallowVerticalDistance = windowHeight / 7 + windowHeight / 35;
    //Use loop to draw shape
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 20; i++) {
          let dx = col * shallowDistanceX;
          let dy = 1 * row * shallowDistanceY + col * shallowVerticalDistance;
          //calculate shallow shape value
          let x1 = baseUpX1 + i + dx;
          let y1 = baseUpY1 + 2 * i + dy;
          let x2 = baseUpX2 + i + dx;
          let y2 = baseUpY2 - i + dy;
          let x3 = baseUpX3 - i + dx;
          let y3 = baseUpY3 + i + dy;
          let x4 = baseUpX4 - i + dx;
          let y4 = baseUpY4 - 2 * i + dy;
          //draw shape( two triangles)
          triangle(x1, y1, x2, y2, x3, y3);
          triangle(x4, y4, x2, y2, x3, y3);
        }
      }
  }
}

//This is shadow base
function drawShadow() {
    // Draw base dark shadow
    fill(0, 70);
    noStroke();
    rect(0, 0, windowWidth, windowHeight);
}


function generateSmallRectangles() {
  let colors = [limeGreen, roseRed, milkYellow];
  smallRectangles = [];
  for (let i = 0; i < numOfSmallRects; i++) {
      let color = random(colors);
      let w = random(insideCanvas.width / 20);
      let h = random(insideCanvas.height / 20);
      let x = insideCanvas.x + random(insideCanvas.width - w);  // This ensures small rects are inside the frame
      let y = insideCanvas.y + random(insideCanvas.height - h); // This ensures small rects are inside the frame
      smallRectangles.push({ color, x, y, w, h });  // Push rect data into an object
  }
}

function drawSmallRectangles() {
  for (let smallRect of smallRectangles) {
      fill(smallRect.color);
      rect(smallRect.x, smallRect.y, smallRect.w, smallRect.h);
  }
}

// Big rectangles in lime green
function drawBigLimeRectangles() {
  fill(limeGreen);
  noStroke();

  // 1
  rect(insideCanvas.x, insideCanvas.y + insideCanvas.height / 3, insideCanvas.width / 12.5, insideCanvas.height / 6);
  // 2
  rect(insideCanvas.x + insideCanvas.width / 11 * 3, insideCanvas.y + insideCanvas.height / 8 * 3, insideCanvas.width / 15, insideCanvas.height / 6);
  // 3
  rect(insideCanvas.x + insideCanvas.width / 14 * 6.44, insideCanvas.y + insideCanvas.height / 6.7, insideCanvas.width / 25, insideCanvas.height / 10);
  // 4
  rect(insideCanvas.x + insideCanvas.width / 14 * 11.2, insideCanvas.y + insideCanvas.height / 4, insideCanvas.width / 40, insideCanvas.height / 10);
  // 5
  rect(insideCanvas.x + insideCanvas.width / 14 * 6.2, insideCanvas.y + insideCanvas.height / 1.25, insideCanvas.width / 35, insideCanvas.height / 10);
}

// Big rectangles in rose red
function drawBigRoseRectangles() {
  fill(roseRed);
  noStroke();

  // 1
  rect(insideCanvas.x + insideCanvas.width / 11 * 1.2, insideCanvas.y + insideCanvas.height / 6, insideCanvas.width / 25, insideCanvas.height / 12);
  // 2
  rect(insideCanvas.x + insideCanvas.width / 11 * 2.4, insideCanvas.y + insideCanvas.height / 10, insideCanvas.width / 15, insideCanvas.height / 10);
  // 3
  rect(insideCanvas.x + insideCanvas.width / 11 * 5.72, insideCanvas.y + insideCanvas.height / 8.5, insideCanvas.width / 40, insideCanvas.height / 10);
  // 4
  rect(insideCanvas.x + insideCanvas.width / 18 * 17, insideCanvas.y + insideCanvas.height / 8, insideCanvas.width / 35, insideCanvas.height / 10);
  // 5
  rect(insideCanvas.x + insideCanvas.width / 11 * 7.04, insideCanvas.y + insideCanvas.height / 3.35, insideCanvas.width / 35, insideCanvas.height / 10);
  // 6
  rect(insideCanvas.x + insideCanvas.width / 11 * 1.97, insideCanvas.y + insideCanvas.height / 10 * 4.5, insideCanvas.width / 10.6, insideCanvas.height / 8);
  // 7
  rect(insideCanvas.x + insideCanvas.width / 10, insideCanvas.y + insideCanvas.height / 10 * 8, insideCanvas.width / 16.7, insideCanvas.height / 10);
  // 8
  rect(insideCanvas.x + insideCanvas.width / 10 * 4.73, insideCanvas.y + insideCanvas.height / 1.25, insideCanvas.width / 25, insideCanvas.height / 10);
}

// Big rectangles in line purple
function drawLinePurpleRectangles() {
  fill(linePurple);
  noStroke();

  // 1
  rect(insideCanvas.x + insideCanvas.width / 10, insideCanvas.y + insideCanvas.height / 7 * 3.3, insideCanvas.width / 17.5, insideCanvas.height / 12);
  // 2
  rect(insideCanvas.x + insideCanvas.width / 8.5, insideCanvas.y + insideCanvas.height / 1.6, insideCanvas.width / 40, insideCanvas.height / 13.3);
  // 3
  rect(insideCanvas.x + insideCanvas.width / 5, insideCanvas.y + insideCanvas.height / 1.335, insideCanvas.width / 20, insideCanvas.height / 6.6);
  // 4
  rect(insideCanvas.x + insideCanvas.width / 3.4, insideCanvas.y + insideCanvas.height / 1.6, insideCanvas.width / 20, insideCanvas.height / 14);
  // 5
  rect(insideCanvas.x + insideCanvas.width / 1.25, insideCanvas.y + insideCanvas.height / 1.54, insideCanvas.width / 25, insideCanvas.height / 8);
  // 6
  rect(insideCanvas.x + insideCanvas.width / 1.285, insideCanvas.y + insideCanvas.height / 4, insideCanvas.width / 16, insideCanvas.height / 10);
}

// Big rectangles in milk yellow
function drawMilkYellowRectangles() {
  fill(milkYellow);
  noStroke();

  // 1
  rect(insideCanvas.x + insideCanvas.width / 11 * 3, insideCanvas.y + insideCanvas.height / 8 * 2.4, insideCanvas.width / 15, insideCanvas.height / 12);
  // 2
  rect(insideCanvas.x + insideCanvas.width / 11 * 3, insideCanvas.y + insideCanvas.height / 8 * 4.3, insideCanvas.width / 15, insideCanvas.height / 28);
}

// Get the position of rectangles that have a circle in the centre
function getRectangles() {
  return [
    { x: insideCanvas.x, y: insideCanvas.y + insideCanvas.height / 3, width: insideCanvas.width / 12.5, height: insideCanvas.height / 6, color: linePurple },
    { x: insideCanvas.x + insideCanvas.width / 11 * 3, y: insideCanvas.y + insideCanvas.height / 8 * 3, width: insideCanvas.width / 15, height: insideCanvas.height / 6, color: roseRed },
    { x: insideCanvas.x + insideCanvas.width / 14 * 11.2, y: insideCanvas.y + insideCanvas.height / 4, width: insideCanvas.width / 40, height: insideCanvas.height / 10, color: roseRed },
    { x: insideCanvas.x + insideCanvas.width / 11 * 2.4, y: insideCanvas.y + insideCanvas.height / 10, width: insideCanvas.width / 15, height: insideCanvas.height / 10, color: linePurple },
    { x: insideCanvas.x + insideCanvas.width / 11 * 1.97, y: insideCanvas.y + insideCanvas.height / 10 * 4.5, width: insideCanvas.width / 10.6, height: insideCanvas.height / 8, color: limeGreen },
    { x: insideCanvas.x + insideCanvas.width / 10 * 4.73, y: insideCanvas.y + insideCanvas.height / 1.25, width: insideCanvas.width / 25, height: insideCanvas.height / 10, color: limeGreen },
    { x: insideCanvas.x + insideCanvas.width / 8.5, y: insideCanvas.y + insideCanvas.height / 1.6, width: insideCanvas.width / 40, height: insideCanvas.height / 13.3, color: roseRed },
    { x: insideCanvas.x + insideCanvas.width / 5, y: insideCanvas.y + insideCanvas.height / 1.335, width: insideCanvas.width / 20, height: insideCanvas.height / 6.6, color: milkYellow },
    { x: insideCanvas.x + insideCanvas.width / 3.4, y: insideCanvas.y + insideCanvas.height / 1.6, width: insideCanvas.width / 20, height: insideCanvas.height / 14, color: roseRed },
    { x: insideCanvas.x + insideCanvas.width / 1.25, y: insideCanvas.y + insideCanvas.height / 1.54, width: insideCanvas.width / 25, height: insideCanvas.height / 8, color: roseRed }
  ];
}

function drawCenteredCircles() {
  // Define all the rectangles that have a center circle
  let rectangles = getRectangles();

  // Draw circles
  for (let rect of rectangles) {
    // calculate the center x and y pos of the rect
    let centerX = rect.x + rect.width / 2;
    let centerY = rect.y + rect.height / 2;

    // define the diameter of the circle
    let circleDiameter = min(rect.width, rect.height) / 2;

    // draw circle
    fill(rect.color);
    noStroke();
    ellipse(centerX, centerY, circleDiameter);
  }
}
