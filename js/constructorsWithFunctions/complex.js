// In this case we do not use this, and instead we build the methods for each element.
// This has a penalty in performance because the methods are created always.
// Besides JSLint says that the new is out of scope (!!!!?)

var Complex = function (real, imaginary) {
    'use strict';
    var x = Object.create(null);
    x.real = real;
    x.imaginary = imaginary;

    x.mult = function (c) {
        return new Complex(x.real * c.real - x.imaginary * c.imaginary, x.real * c.imaginary + x.imaginary * c.real);
    };

    x.add = function (c) {
        return new Complex(x.real + c.real, x.imaginary + c.imaginary);
    };

    x.getAbsValueSquared = function () {
        return x.real * x.real + x.imaginary * x.imaginary;
    };

    x.toString = function () {
        return x.real + ' ' + x.imaginary + "i";
    };

    x.trigR = function () {
        return Math.sqrt(Math.pow(x.real, 2) + Math.pow(x.imaginary, 2));
    };

    x.trigAng = function () {
        return Math.atan(x.imaginary / x.real);
    };

    // General formula for power a complex number to another complex number, but having c = 0 (first angular value).
    // (a+bi)^(c+di)=r^c * e^(-dP) * [cos(d * ln r + c * P) + i sin(d * ln r + c * P)]
    x.power = function (c) {
        var r = x.trigR(),
            p = x.trigAng();
        var aux = Math.pow(r, c.real) * Math.pow(Math.E, -1 * c.imaginary * p);
        return new Complex(aux * Math.cos(c.imaginary * Math.log(r) + c.real * p), aux * Math.sin(c.imaginary * Math.log(r) + c.real * p));
    };

    // Having the complex number expressed in trigonometric form:  r * e^(iP)
    // ln{ r * e^(iP)} = ln(r) + i * P + 2kπi. with k = 0 --> ln{ r * e^(iP)} = ln(r) + i * P
    x.ln = function () {
        var r = x.trigR(),
            p = x.trigAng();
        return new Complex(Math.log(r), p);
    };

    return x;
};

// Esta manera usa object prototyping en lugar de function prototpying como el complex
var OperationalPoint = function (real, imaginary, frec, colourMethod) {
    'use strict';
    this.complex = new Complex(real, imaginary);
    this.frec = frec;
    this.colourMethod = colourMethod;
};

OperationalPoint.prototype = {
    getResult: function () {
        'use strict';
        var result = this.frec.call(null, this.complex);
        return this.colourMethod.call(null, result);
    }
};