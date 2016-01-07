var Config = function (minRe, maxRe, minIm, maxIte, maxValue, height, width) {
    'use strict';
    var c = Object.create(null);
    c.minRe = minRe;
    c.maxRe = maxRe;
    c.minIm = minIm;
    c.maxIte = maxIte;
    c.maxValue = maxValue;


    var recalculate = function () {
        c.maxIm = (c.minIm + (c.maxRe - c.minRe) * c.height / c.width);
        c.reFactor = ((c.maxRe - c.minRe) / (c.width - 1));
        c.imFactor = ((c.maxIm - c.minIm) / (c.height - 1));
    };

    c.setSize = function (height, width) {
        c.height = height;
        c.width = width;
        recalculate();
    };

    c.setSize(height, width);
    return c;
};

var CONFIG = {
    mandelbrot: new Config(-2.5, 1.5, -1.35, 40, 4, 788, 1014),
    mandelbrotPower: new Config(-3, 1.5, -1.5, 40, 4, 788, 1014),
    mandelbrotCubic: new Config(-2.5, 2.5, -1.7, 40, 4, 788, 1014),
    mandelbrotLN: new Config(-3, 3, -2, 40, 4, 788, 1014)
};