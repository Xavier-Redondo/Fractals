var iniX;
var iniY;
var fractalName;

$(document).ready(function(){
    $(".fractals").on("click", ".fractal", function(){
        fractalName = $(this).attr('id');
        generateFractal($("#myCanvas").get(0), fractalName);
    });

    $(".result").on("mousedown", ".fractalCanvas", function(event){
        var mousePos = getMousePos(this, event);
        log("Mouse down on. x: " + mousePos.x + " y: " + mousePos.y);
        iniX = mousePos.x;
        iniY = mousePos.y;
    });

    $(".result").on("mouseup", ".fractalCanvas", function(event){
        var mousePos = getMousePos(this, event);
        log("Mouse up on. x: " + mousePos.x + " y: " + mousePos.y);
        zoomFractal(fractalName, iniX, iniY, mousePos.x, mousePos.y);
    });
});

var logObject = function logObject(text, that){
  log(text + "Object: " + JSON.stringify(that, null, 4));
};

var log = function log(text){
    $("#mainLog").text($("#mainLog").text() + text + "\n")
};

var getMousePos = function getMousePos (canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
        y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
    };
};

