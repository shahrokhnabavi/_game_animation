function Vector(x, y){

    this.move = (velocity, speed) => {
        if( typeof velocity !== 'object' || velocity.constructor.name !== 'Vector') throw errorTitle + 'Invalid Parameter';
        speed = speed ? speed : 1;
        this.x += velocity.x * speed;
        this.y += velocity.y * speed;
    };

    this.isEmpty = (typeof x == 'undefined' || typeof y == 'undefined');

    this.x = x;
    this.y = y;
}