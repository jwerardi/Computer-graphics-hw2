$(document).ready(function() {
    let canvas = document.getElementById('canvas'),
        canvasContext = canvas.getContext("2d");

    $("#drawLine").on('click', function(){
        console.log("test");
        canvasContext.lineWidth = document.getElementById("brushThickness").value;
        canvasContext.strokeStyle = document.getElementById("colorPicker").value;
        drawLineFractal();
    });

    $("#drawArc").on('click', function(){
        console.log("test arc");
    });

    $("#switchToArc").on('click', function(){
        $("#createLineDiv").hide();
        $("#createArcDiv").show();
    });

    $("#switchToLine").on('click', function(){
        $("#createArcDiv").hide();
        $("#createLineDiv").show();
    });


    function drawLineFractal(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
        canvasContext.beginPath();
        let ratio = Number(document.getElementById("inputRatio").value), //the ratio denominator 
            ratio2 = 1, //representing the whole ratio, the numerator
            ratio3 = ratio2 / ratio, //representing the whole ratio divided by the user's entry
            iterations = Number(document.getElementById("inputIterations").value), //number of fractal iterations
            x = 50, //middle of the graph
            y = 50, //middle of the graph
            len = 200;
        LineFractal(iterations, x, y, len, ratio, ratio2, ratio3);
        canvasContext.stroke();
    }

    function LineFractal(iterations, x, y, len, ratio, ratio2, ratio3){
        var degrees = Math.PI / 180;
        canvasContext.translate(x, y);
        canvasContext.moveTo(0,0);
        fracalize(iterations);
        canvasContext.rotate(60*degrees);
        fracalize(iterations);
        canvasContext.rotate(-120*degrees);
        fracalize(iterations);
        canvasContext.restore();
        function fracalize(n){ //pseudo recursve function to draw out the limits of the fractal
            canvasContext.save();
            if( n === 0 ){
                canvasContext.lineTo(len, 0);
            } else {
                canvasContext.scale(ratio3, ratio3);
                fracalize(n-1);
                canvasContext.rotate(60*degrees);
                fracalize(n-1);
                canvasContext.rotate(-120*degrees);
                fracalize(n-1);
                canvasContext.rotate(60*degrees);
                fracalize(n-1);
            }
            canvasContext.restore();
            canvasContext.translate(len, 0);    
        }   
    }

});

