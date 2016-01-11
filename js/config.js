var Config = function (minRe, maxRe, minIm, maxIte, maxValue, height, width) {
    'use strict';
    var c = Object.create(null);
    c.minRe = minRe;
    c.maxRe = maxRe;
    c.minIm = minIm;
    c.maxIte = maxIte;
    c.maxValue = maxValue;

    var recalculate = function recalculate () {
        c.maxIm = (c.minIm + (c.maxRe - c.minRe) * c.height / c.width);
        c.reFactor = ((c.maxRe - c.minRe) / (c.width - 1));
        c.imFactor = ((c.maxIm - c.minIm) / (c.height - 1));
    };

    c.setSize = function (height, width) {
        c.height = height;
        c.width = width;
        recalculate();
    };

    // Note that iniX, iniY, x and y are the pixels selected from the original window
    // formed in height and width. We do not modify the size of the canvas, but
    // assign new values to minRe, maxRe, minIm and maxIte according to the zoom
    c.zoom = function (iniX, iniY, x, y) {
        var auxMinRe = iniX * c.reFactor + c.minRe;
        var auxMaxRe = x * c.reFactor + c.minRe;
        var auxMaxIte = c.maxIte * Math.abs(c.maxRe - c.minRe) / Math.abs(auxMaxRe - auxMinRe);
        var auxMinIm = iniY * c.imFactor + c.minIm;

        return new Config(auxMinRe, auxMaxRe, auxMinIm, auxMaxIte, this.maxValue, this.height, this.width );
    };


    c.setSize(height, width);
    return c;
};

var CONFIG = {
    mandelbrot: new Config(-2.5, 1.5, -1.35, 30, 4, 788, 1014),
    mandelbrotPower: new Config(-3, 1.5, -1.5, 30, 4, 788, 1014),
    mandelbrotCubic: new Config(-2.5, 2.5, -1.7, 30, 4, 788, 1014),
    mandelbrotLN: new Config(-3, 3, -2, 30, 4, 788, 1014)
};