function CircleCollision(options){
    // Private
    var ctx = null;

    function init(options){
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
    }

    this.update = (mouse) => {
        if(mouse){
            this.opt.pos.x = mouse.x;
            this.opt.pos.y = mouse.y;
        }
        return this;
    };

    this.collision = circle => {
        return this.opt.pos.distance(circle.opt.pos) < this.opt.radius + circle.opt.radius;
    };

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        color: '#052B3E'
    }, options);
    init.call(this);
}

module.exports = CircleCollision;