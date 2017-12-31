import {Circle} from '../../../lib/Shapes';

function CircleCollision(options){
    // Private
    var ctx = null,
        obj = null;

    function init(options){
        if (!this.opt.ctx) throw 'Object needs Context';

        ctx = this.opt.ctx;
        obj = new Circle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            radius: this.opt.radius
        });
    }

    this.update = () => {
        if(this.opt.mouse){
            this.opt.pos.x = this.opt.mouse.x;
            this.opt.pos.y = this.opt.mouse.y;
        }
        return this;
    };

    this.collision = circle => {
        console.log(this.opt.pos.distance(circle.opt.pos), this.opt.radius + circle.opt.radius);
        return this.opt.pos.distance(circle.opt.pos) < this.opt.radius + circle.opt.radius;
    };

    this.draw = () => {
        obj.opt.bgColor = this.opt.color;
        obj.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        radius: 20,
        color: '#052B3E',
        mouse: null
    }, options);
    init.call(this);
}

module.exports = CircleCollision;