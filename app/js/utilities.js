var generateColorBar = function() {
    var gradient = "linear-gradient(90deg";

    var ratioSum = 0;

    for (var i = 0; i < arguments.length; i++) {
        var color = arguments[i][0];
        var ratio = arguments[i][1];

        gradient = gradient.concat(",",color," ",ratioSum * 100, "%");

        ratioSum += ratio;

        gradient = gradient.concat(",",color," ",ratioSum * 100, "%");
    }

    gradient = gradient.concat(")");

    return gradient;
};