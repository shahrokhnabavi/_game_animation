function rand(min, max) {
    var min = min ? min : 0,
        max = max ? max : 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randPos(xMin, xMax, yMin, yMax) {
    return {
        x: rand(xMin, xMax),
        y: rand(yMin, yMax)
    }
}

function randColor() {
    var colors= [
        // "114b5f","028090","e4fde1","456990","f45b69","d5573b","885053","777da7","94c9a9","c6ecae"
        "4259A7", "3EA9A6", "E4DFDB", "D6B389", "C4656B"
    ];
    return '#' + colors[rand(0, colors.length-1)];
}