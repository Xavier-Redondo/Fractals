'use strict';

var Operations = function (config) {
    var ope = Object.create(null);

    // Closed variables and functions
    var config = config;
    var general = function (c, f) {
        var i = 0,
            seed = new Complex(c.real, c.imaginary),
            aux = new Complex(c.real, c.imaginary);

        do {
            aux = f(aux, aux);
            aux = aux.add(seed);
            i += 1;
        } while (i < config.maxIte && aux.getAbsValueSquared() <= config.maxValue);

        return i;
    };

    // Open functions
    ope.mandelbrot = function (c){
        return general(c, function(x, y){
            return new Complex(x.real * y.real - x.imaginary * y.imaginary, x.real * y.imaginary + x.imaginary * y.real);
        });
    };


    ope.mandelbrotPower = function (c) {
        return general(c, function(x, y){
            var r = x.trigR(),
                p = x.trigAng();
            var aux = Math.pow(r, y.real) * Math.pow(Math.E, -1 * y.imaginary * p);
            return new Complex(aux * Math.cos(y.imaginary * Math.log(r) + y.real * p), aux * Math.sin(y.imaginary * Math.log(r) + y.real * p));
        });
    };

    ope.mandelbrotCubic = function (c) {
        var aux = function(x, y){
            return new Complex(x.real * y.real - x.imaginary * y.imaginary, x.real * y.imaginary + x.imaginary * y.real);
        };
        return general(c, function(x, y){
            return aux(x, aux(x, y));
        });
    };

    ope.mandelbrotLN = function (c) {
        return general(c, function(x){
            var r = x.trigR(),
                p = x.trigAng();
            return new Complex(Math.log(r), p);
        });
    };

    return ope;
};






