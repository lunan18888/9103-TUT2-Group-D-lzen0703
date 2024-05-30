/*
Please notice:
All the elements at the current stage are static,
please preset their position based on Di's drawing.
If your set up requires others work as a prerequist,
make sure you communicate with them and when they are able to finish the work,
and then you can move on.
*/

// Define a class to organise dimension variables

class InsideCanvas {
    constructor() {
        this.updateDimensions();
    }

    updateDimensions() {
        // Set the ratio
        this.ratio = 5 / 2;

        // Calculate the width and height based on the window size while maintaining the ratio
        if (windowWidth / windowHeight >= this.ratio) {
            // Window is wider than the ratio, height is the limiting factor
            this.height = 3 * windowHeight / 5;
            this.width = this.height * this.ratio;
        } else {
            // Window is taller than the ratio, width is the limiting factor
            this.width = 4 * windowWidth / 5;
            this.height = this.width / this.ratio;
        }

        // Center the insideCanvas
        this.x = (windowWidth - this.width) / 2;
        this.y = (windowHeight - this.height) / 2;
    }
}