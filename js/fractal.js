/**
 * Created by xavierr on 09/01/2016.
 */
var generateFractal = function generateFractal(config, funcName){
    var op = new Operations(config);
    var grid = createArray(config, op[funcName]);   // Here function to be used is op[type]
    return grid;
};


var createArray = function createArray(config, func){
    var real,
        minIm = config.minIm,
        minRe = config.minRe,
        height = config.height,
        width = config.width,
        reFactor = config.reFactor,
        imFactor = config.imFactor,
        result = [],
        getColor = defineGetColor(config);

    for (var w = 0; w < width; w++){
        real = minRe + w * reFactor;
        result[w] = [];
        for (var h = 0; h < height; h++){
            result[w][h] = new OperationalPoint(real, minIm + h * imFactor, func, getColor).getResult();
        }
    }
    return result;
};


var createArrayOld = function createArrayOld(config, func){
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