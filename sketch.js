// Define colours
let limeGreen, roseRed, milkYellow, linePurple, shallowPurple;

// Create dimension for inside canvas
let insideCanvas;

// Array to store small rectangles
let smallRectangles = [];
let numOfSmallRects = 60;

// Array to store purple lines
let purpleLinesArray = [];

// Array to generate featured rectangles
let featuredRectArray = [];

// Array to generate centred circles in rectangles
let centredCircleArray = [];

//create element for perlin change
let perlinOffset = 0;
let perlinOffsetColor = 0;

// Set update time 
const updateInterval = 5;
let frameCounter = 0;


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

  // Generate purple lines
  generatePurpleLines();

  // Generate small rectangles
  generateSmallRectangles();

  // Create and add featured rectangles to the array
  generateFeaturedRectangles();

  generateCentredCircle();
}

function draw() {
  // This is background color
  background(255);

  //update color
  updateInsideCanvasColors();

  // Draw canvas for the drawing elements
  drawInsideCanvas();
  drawFrame();

  // Draw purple lines in the canvas
  // This must be at the bottom of the canvas
  drawPurpleLines();
  
  // Draw small rectangles
  drawSmallRectangles();

  // Update the positions of small rectangles
  if (frameCounter % updateInterval === 0) {
    updateSmallRectangles(); 
  }

  // Display and update each featured rectangle
  drawFeaturedRectangles();

  // Draw circles in the middle of specific rects
  drawCentredCircle();

  // This is the shadow of the whole canvas
  // This must be on the top of the canvas
  drawShadow();
  drawLightShadow();

  frameCounter++;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Update insideCanvas dimensions
  insideCanvas.updateDimensions();

  // Regenerate purple lines
  generatePurpleLines();

  // Regenerate small rectangles
  generateSmallRectangles();
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

//  Make update colors to change insideCanvas's color
function updateInsideCanvasColors() {

  let noiseVal = noise(perlinOffsetColor);

  //Use lerp to fix the color change interval
  let InsideCanvasR = lerp(255, 180, noiseVal);
  let InsideCanvaG = lerp(255, 180, noiseVal);
  let InsideCanvasB = 255;
  let dynamicInsideCanvasColor = color(InsideCanvasR, InsideCanvaG, InsideCanvasB);

  shallowPurple = dynamicInsideCanvasColor;

  // Update Perlin noise offset
  perlinOffsetColor += 0.01;
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
    let shadowEmptyX = windowWidth / 40;
    let shadowEmptyY = windowHeight / 25;
    //calculate the distance between two shapes
    let shadowDistanceX = shadowEmptyX + 4 * windowWidth / 25;
    let shadowDistanceY = shadowEmptyY + 2 * windowHeight / 7;
    //claculate the distance between vertical column
    let shadowVerticalDistance = windowHeight / 7 + windowHeight / 35;
    //Use loop to draw shape
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 20; i++) {
          let dx = col * shadowDistanceX;
          let dy = 1 * row * shadowDistanceY + col * shadowVerticalDistance;
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

function updateSmallRectangles() {
  // Adjust the range for random movement
  let moveRange = 100; 
  for (let i = 0; i < smallRectangles.length; i++) {
    let rect = smallRectangles[i];
    rect.x += random(-moveRange, moveRange);
    rect.y += random(-moveRange, moveRange);

    // Keep rectangles within the insideCanvas boundaries
    rect.x = constrain(rect.x, insideCanvas.x, insideCanvas.x + insideCanvas.width - rect.w);
    rect.y = constrain(rect.y, insideCanvas.y, insideCanvas.y + insideCanvas.height - rect.h);
  }
}

function drawSmallRectangles() {
  for (let smallRect of smallRectangles) {
      fill(smallRect.color);
      rect(smallRect.x, smallRect.y, smallRect.w, smallRect.h);
  }
}

// Draw featured rectangles
// Record the position of each rectangles
function featuredRectanglesDataArray() {
  return [
  // Lime Green Rectangles
  { x: 0, y: 1 / 3, w: 1 / 12.5, h: 1 / 6, color: limeGreen },
  { x: 3 / 11, y: 3 / 8, w: 1 / 15, h: 1 / 6, color: limeGreen },
  { x: 6.44 / 14, y: 1 / 6.7, w: 1 / 25, h: 1 / 10, color: limeGreen },
  { x: 11.2 / 14, y: 1 / 4, w: 1 / 40, h: 1 / 10, color: limeGreen },
  { x: 6.2 / 14, y: 1 / 1.25, w: 1 / 35, h: 1 / 10, color: limeGreen },

  // Rose Red Rectangles
  { x: 1.2 / 11, y: 1 / 6, w: 1 / 25, h: 1 / 12, color: roseRed },
  { x: 2.4 / 11, y: 1 / 10, w: 1 / 15, h: 1 / 10, color: roseRed },
  { x: 5.72 / 11, y: 1 / 8.5, w: 1 / 40, h: 1 / 10, color: roseRed },
  { x: 17 / 18, y: 1 / 8, w: 1 / 35, h: 1 / 10, color: roseRed },
  { x: 7.04 / 11, y: 1 / 3.35, w: 1 / 35, h: 1 / 10, color: roseRed },
  { x: 1.97 / 11, y: 4.5 / 10, w: 1 / 10.6, h: 1 / 8, color: roseRed },
  { x: 1 / 10, y: 8 / 10, w: 1 / 16.7, h: 1 / 10, color: roseRed },
  { x: 4.73 / 10, y: 1 / 1.25, w: 1 / 25, h: 1 / 10, color: roseRed },

  // Line Purple Rectangles
  { x: 1 / 10, y: 3.3 / 7, w: 1 / 17.5, h: 1 / 12, color: linePurple },
  { x: 1 / 8.5, y: 1 / 1.6, w: 1 / 40, h: 1 / 13.3, color: linePurple },
  { x: 1 / 5, y: 1 / 1.335, w: 1 / 20, h: 1 / 6.6, color: linePurple },
  { x: 1 / 3.4, y: 1 / 1.6, w: 1 / 20, h: 1 / 14, color: linePurple },
  { x: 1 / 1.25, y: 1 / 1.54, w: 1 / 25, h: 1 / 8, color: linePurple },
  { x: 1 / 1.285, y: 1 / 4, w: 1 / 16, h: 1 / 10, color: linePurple },

  // Milk Yellow Rectangles
  { x: 3 / 11, y: 2.4 / 8, w: 1 / 15, h: 1 / 12, color: milkYellow },
  { x: 3 / 11, y: 4.3 / 8, w: 1 / 15, h: 1 / 28, color: milkYellow },
  ];
}

function generateFeaturedRectangles() {
  let dataArray = featuredRectanglesDataArray();
  for (let i = 0; i < dataArray.length; i++) {
    let data = dataArray[i];
    let rect = new FeatureRectangles(data.x, data.y, data.w, data.h, data.color);
    featuredRectArray.push(rect);
  }
}

function drawFeaturedRectangles() {
  for (let i = 0; i < featuredRectArray.length; i++) {
    let rect = featuredRectArray[i];
    rect.updateSize(insideCanvas.width, insideCanvas.height);
    rect.display();
  }
}

// Draw circles inside of specific rectangles
function getFeaturedRectPos() {
  return [
    // In the lime green rects
    // Green 1
    { x: 0, y: 1 / 3, w: 1 / 12.5, h: 1 / 6, color: linePurple },
    // Green 2
    { x: 3 / 11, y: 3 / 8, w: 1 / 15, h: 1 / 6, color: linePurple },
    // In the rose red rects
    // Red 2
    { x: 2.4 / 11, y: 1 / 10, w: 1 / 15, h: 1 / 10, color: milkYellow },
    // Red 6
    { x: 1.97 / 11, y: 4.5 / 10, w: 1 / 10.6, h: 1 / 8, color: limeGreen },
    // Red 8
    { x: 4.73 / 10, y: 1 / 1.25, w: 1 / 25, h: 1 / 10, color: limeGreen },
    // In the purple rects
    // P2
    { x: 1 / 8.5, y: 1 / 1.6, w: 1 / 40, h: 1 / 13.3, color: roseRed },
    // P3
    { x: 1 / 5, y: 1 / 1.335, w: 1 / 20, h: 1 / 6.6, color: milkYellow },
    // P4
    { x: 1 / 3.4, y: 1 / 1.6, w: 1 / 20, h: 1 / 14, color: roseRed },
    // P5
    { x: 1 / 1.25, y: 1 / 1.54, w: 1 / 25, h: 1 / 8, color: roseRed },
  ];
}

function generateCentredCircle() {
  let featuredRectPos = getFeaturedRectPos();
  centredCircleArray = featuredRectPos.map(data => {
      let radius = min(data.w, data.h); // Calculate radius based on the smallest dimension of the rectangle
      return new circlesInRectangles(data.x + data.w / 2, data.y + data.h / 2, radius, data.color);
  });
  centredCircleArray.forEach(circle => circle.updateSize(insideCanvas.width, insideCanvas.height));
}

function drawCentredCircle() {
  // smooth the move
  let noiseScale = 0.1;
  //set teo different number for changes
  let noiseOffsetX = perlinOffset;
  let noiseOffsetY = perlinOffset + 10000;
  for (let i = 0; i < centredCircleArray.length; i++) {
    let circle = centredCircleArray[i];
    let noiseX = noise(noiseOffsetX + i * noiseScale);
    let noiseY = noise(noiseOffsetY + i * noiseScale);
    
    circle.drawX += map(noiseX, 0, 1, -10, 10);
    circle.drawY += map(noiseY, 0, 1, -10, 10);
    circle.display();
  }
  perlinOffset += 0.01; 
}