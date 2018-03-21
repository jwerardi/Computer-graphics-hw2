$(document).ready(function() {
    console.log("test");

    var canvas = document.getElementById('canvas');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var canvasContext = canvas.getContext('2d');

    $("#drawWheel").on('click', function(){
        console.log("click")

        canvasContext.lineWidth = document.getElementById("brushThickness").value;
        canvasContext.strokeStyle = document.getElementById("colorPicker").value;
        var driverScore = document.getElementById("driverScore").value;
        var wheelRadius = document.getElementById("wheelRadius").value;
        
        drawWheel(parseInt(driverScore), parseInt(wheelRadius))

    });
    function drawWheel(score, radius){
        if(score <= 100 && score >= 80) {
            let xCenter = 250, // x cord of starting point
                yCenter = 250; // y cort of starting point
                scoreDifference = ((100 - score) / 100), //difference from 100 and driver's score ie 100 - 85 (driver's score) = 15
                radius_v = (radius) - (radius * scoreDifference), 
                circumference = Math.max(radius, radius_v),
                scaleV = radius_v / circumference, // scale to appropriate circumference  
                scaleH = radius / circumference;
            
            canvasContext.save();
            canvasContext.scale(scaleH, scaleV);
            canvasContext.beginPath();
            canvasContext.arc(xCenter, yCenter, radius, 0, (2 * Math.PI), true);
            canvasContext.stroke();
            canvasContext.restore();
            
        } else if(score > 0) {
            let sidesLeft = score, //set sidesLeft to the score on initialization
                rotationDegrees = (360 / sidesLeft), //rotational degrees is equal to 360/the # of sides left
                xCenter = 250, // x cord of starting point
                yCenter = 250, // y cort of starting point
                prevX, 
                prevY, //previous X and Y for when we're at the end of the line
                currentDegree = rotationDegrees;
        
            canvasContext.beginPath();

            while(sidesLeft != 0) { // while theres sides left to iterate
                if(sidesLeft == score) { 
                    prevX = xCenter + radius;
                    prevY = yCenter;
                    canvasContext.moveTo(prevX, prevY);
                }
                let radians = (currentDegree * (Math.PI / 180));
                x = xCenter + (radius * Math.cos(radians));
                y = yCenter + (radius * Math.sin(radians));
                currentDegree = currentDegree + rotationDegrees;
                sidesLeft = sidesLeft - 1;
                canvasContext.lineTo(
                    xCenter + (radius * Math.cos(radians)), 
                    yCenter + (radius * Math.sin(radians))
                );
            }
            canvasContext.stroke();                 
        }
    }

});