function Vector(x, y){

    this.move = velocity => {
        if( typeof velocity !== 'object' || velocity.constructor.name !== 'Vector') throw errorTitle + 'Invalid Parameter';

        this.x += velocity.x;
        this.y += velocity.y;
    };

    this.isEmpty = (typeof x == 'undefined' || typeof y == 'undefined');

    this.x = x;
    this.y = y;
}