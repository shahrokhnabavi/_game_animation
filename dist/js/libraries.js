var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

rand = (min, max) => {
    min = min ? min : 0;
    max = max ? max : 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

randPos = (xMin, xMax, yMin, yMax) => {
    return {
        x: rand(xMin, xMax),
        y: rand(yMin, yMax)
    };
};

randColor = () => {
    var colors= [
        // "114b5f","028090","e4fde1","456990","f45b69","d5573b","885053","777da7","94c9a9","c6ecae"
        "4259A7", "3EA9A6", "E4DFDB", "D6B389", "C4656B"
    ];
    return '#' + colors[rand(0, colors.length-1)];
};


function Vector(x, y){

    this.move = (velocity, speed) => {
        if( typeof velocity !== 'object' || velocity.constructor.name !== 'Vector') throw 'Invalid Parameter';
        speed = speed ? speed : 1;
        this.x += velocity.x * speed;
        this.y += velocity.y * speed;
    };

    this.distance = point => {
        return Math.sqrt( Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) );
    };

    this.isEmpty = (typeof x == 'undefined' || typeof y == 'undefined');

    this.x = x;
    this.y = y;
}