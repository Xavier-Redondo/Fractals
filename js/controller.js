var iniX;
var iniY;
var config;
var funcName;

$(document).ready(function(){
    var result = $(".result");
    var canvas = $("#myCanvas");
    $(".fractals").on("click", ".fractal", function(){
        var t0 = performance.now();
        funcName = $(this).attr('id');
        config = CONFIG[funcName];
        log("config: " + JSON.stringify(config, null, 4));
        var aux = canvas.detach();
        generateFractal(canvas.get(0), config, funcName);
        result.html(aux);
        log("Call to generateFractal took " + (performance.now() - t0) + " milliseconds.");
    });

    result.on("mousedown", ".fractalCanvas", function(event){
        var mousePos = getMousePos(this, event);
        iniX = mousePos.x;
        iniY = mousePos.y;
    });

    result.on("mouseup", ".fractalCanvas", function(event){
        var t0 = performance.now();
        log("config before: " + JSON.stringify(config, null, 4));
        if (config){
            var mousePos = getMousePos(this, event);
            var aux = canvas.detach();
            config = zoomFractal(canvas.get(0), config, funcName, iniX, iniY, mousePos.x, mousePos.y);
            result.html(aux);
        }
        log("config after: " + JSON.stringify(config, null, 4));
        log("Call to generateFractal took " + (performance.now() - t0) + " milliseconds.");
    });
});

var log = function log(text){
    var logElem = $("#mainLog");
    logElem.text(logElem.text() + text + "\n")
};

var getMousePos = function getMousePos (canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
        y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
    };
};

