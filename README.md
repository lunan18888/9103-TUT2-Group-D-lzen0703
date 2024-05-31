# 9103-TUT2-Group-D-lzen0703
## My Animations
1. The caterpillars move smoothly across the window from their original fixed positions over time.
2. The color of the InsideCanvas changes slowly within a harmonious range.
3. The small squares change position randomly every five frames.
4. The light shadows shake slightly and descend slowly.
## Team Members' Animations
 - TIAN's: Clicking the PurpleLines generates small circles that move along the PurpleLines' path.
 - WANG's: The size of the circles and the rotation of the large rectangles change based on the FFT.
 - SHI's: The clock hands and small squares move according to fixed times.
## Individual Coding
### Caterpillars Part
1. Added several ellipses to the circlesInRectangles class to create the caterpillars' eyes.
2. Added two Perlin noise variables, which are updated in the draw() function, to change the position of the caterpillars.
3. Used noiseScale to ensure the caterpillars move smoothly.
4. Used constrain to limit X and Y to control the caterpillars' movement scope.
### InsideCanvas Colors
1. Created a function to update the color of the InsideCanvas.
2. Used perlinOffsetColor to change the RGB values.
3. Used lerp to fix the color change interval, ensuring the color remains within the lavender range.
### Update Small Rectangles
1. Created an updateSmallRectangles() function to update the random positions of small rectangles.
2. Set the move range for the small rectangles and calculated the new positions using a loop to update all rectangles' positions.
3. Used constrain to keep the small rectangles within the InsideCanvas.
4. Set the update frequency of the small rectangles to every five frames using if (frameCounter % updateInterval === 0).
### Move Shadows
1. Created perlinOffsetX and perlinOffsetY variables and updated them over time.
2. Calculated noiseX and noiseY to update the shadows' positions.
3. Used map() to transform the range of noiseX into a different range.
4. Set downwardTrend to increment over time and calculated the new positions of the light shadows to make them descend slowly.
(All the code used above was taught in class.)