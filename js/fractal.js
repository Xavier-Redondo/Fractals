/**
 * Created by xavierr on 09/01/2016.
 */
var generateFractal = function generateFractal(canvas, config, funcName){
    config.setSize(canvas.height, canvas.width);  // Instead of using JS to determine the size of the canvas, we use the canvas size
    var op = new Operations(config);    // The operations depend on the config due to maxIte and maxValue
    var grid = createArray(config, op[funcName]);   // Here function to be used is op[type]
    paint(canvas, grid);
};

var zoomFractal = function zoomFractal(canvas, config, funcName, iniX, iniY, x, y){
    var zoomedConfig = config.zoom(iniX, iniY, x, y);
    var op = new Operations(zoomedConfig);    // The operations depend on the config due to maxIte and maxValue
    var grid = createArray(zoomedConfig, op[funcName]);   // Here function to be used is op[type]
    paint(canvas, grid);
    return zoomedConfig;
};

var paint = function paint(canvas, arr){
    var ctx = canvas.getContext("2d");

    arr.forEach(function (inarr, column){
        inarr.forEach(function(rgb, row){
            ctx.fillStyle = rgb;
            ctx.fillRect( column, row, 1, 1 );
        });
    });
};



var createArray = function createArray(config, func){
    var real,
        minIm = config.minIm,
        minRe = config.minRe,
        height = config.height,
        width = config.width,
        reFactor = config.reFactor,
        imFactor = config.imFactor,
        result = new Array(width),
        getColor = defineGetColor(config),
        aux;

    for (var w = 0; w < width; w++){
        real = minRe + w * reFactor;
        result[w] = new Array(height);
        for (var h = 0; h < height; h++){
            aux = new OperationalPoint(real, minIm + h * imFactor, func, getColor);
            result[w][h] = aux.getResult();
        }
    }
    return result;
};

var defineGetColor = function defineGetColor(config){
    var aux =  0;

    var getColor = function getColor(r){
        var BLACK = "rgb(0, 0, 0)";

        if (r === 0){
            return BLACK;
        }
        else if (r < Math.floor(config.maxIte/2)){
            aux = parseInt((2 * 255 * r / config.maxIte), 10);
            return "rgb(" + aux + ", 0 , 0)";
        }
        else if (r < config.maxIte - 1 ){
            aux = parseInt(255 * ((2 * r / config.maxIte) - 1 ), 10);
            return "rgb(255," + aux + ", " + aux + ")";
        }
        else{
            return BLACK;
        }
    };

    return getColor;
};