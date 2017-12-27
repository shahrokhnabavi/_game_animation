function Vector(x, y){

    this.move = (velocity, speed) => {
        if( typeof velocity !== 'object' || velocity.constructor.name !== 'Vector') throw errorTitle + 'Invalid Parameter';
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