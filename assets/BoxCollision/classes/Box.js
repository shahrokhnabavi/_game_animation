function BoxColli(options){
    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init(options){
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
    }

    this.update = (mouse) => {
        if(mouse){
            this.opt.pos.x = mouse.x - (this.opt.width/2);
            this.opt.pos.y = mouse.y - (this.opt.height/2);
        }
        return this;
    };

    this.collision = box => {

        var x01 = this.opt.pos.x,
            x02 = this.opt.pos.x + this.opt.width,
            y01 = this.opt.pos.y,
            y02 = this.opt.pos.y + this.opt.height,

            x11 = box.opt.pos.x,
            x12 = box.opt.pos.x + box.opt.width,
            y11 = box.opt.pos.y,
            y12 = box.opt.pos.y + box.opt.height;

        var l1 = {x: x01, y: y01},
            r1 = {x: x02, y: y02},

            l2 = {x: x11, y: y11},
            r2 = {x: x12, y: y12};

        if( l1.x > r2.x || r1.x < l2.x)
            return false;


        if( l1.y > r2.y || r1.y < l2.y)
            return false;

        return true;
    };

    this.draw = () => {
        ctx.beginPath();
        ctx.rect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.width,
            this.opt.height,
        );
        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        width: 20,
        height: 20,
        color: '#052B3E'
    }, options);
    init.call(this);
}