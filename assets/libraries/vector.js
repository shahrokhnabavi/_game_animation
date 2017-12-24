function Vector(x, y){

    this.isEmpty = (typeof x == 'undefined' || typeof y == 'undefined');

    this.x = x;
    this.y = y;
}