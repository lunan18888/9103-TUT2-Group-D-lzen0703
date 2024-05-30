class FeatureRectangles {
    constructor(x, y, w, h, color) {
        this.x = x; // Normalized x position (percentage of insideCanvas width)
        this.y = y; // Normalized y position (percentage of insideCanvas height)
        this.w = w; // Normalized width (percentage of insideCanvas width)
        this.h = h; // Normalized height (percentage of insideCanvas height)
        this.color = color;
        this.drawX = this.x;
        this.drawY = this.y;
        this.drawW = this.w;
        this.drawH = this.h;
    }

    display() {
        fill(this.color);
        rect(this.drawX, this.drawY, this.drawW, this.drawH);
    }

    updateSize(insideCanvasWidth, insideCanvasHeight) {
        this.drawX = this.x * insideCanvasWidth + insideCanvas.x;
        this.drawY = this.y * insideCanvasHeight + insideCanvas.y;
        this.drawW = this.w * insideCanvasWidth;
        this.drawH = this.h * insideCanvasHeight;
    }
}

// Create a class to store circles in rects
class circlesInRectangles {
    constructor(x, y, r, color) {
        this.x = x; // Normalized x position (percentage of insideCanvas width)
        this.y = y; // Normalized y position (percentage of insideCanvas height)
        this.r = r; // Radius (based on the minimum dimension of the corresponding rectangle)
        this.color = color;
        this.drawX = this.x;
        this.drawY = this.y;
        this.drawR = this.r;
    }

    display() {
    fill(this.color);
    noStroke();
    ellipse(this.drawX, this.drawY, this.drawR);
    }

    updateSize(insideCanvasWidth, insideCanvasHeight) {
      this.drawX = this.x * insideCanvasWidth + insideCanvas.x;
      this.drawY = this.y * insideCanvasHeight + insideCanvas.y;
      this.drawR = this.r * min(insideCanvasWidth, insideCanvasHeight);
    }
}