function Circle(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;

    function init(options){
        if (!this.opt.ctx) throw 'Circle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector( ctxWidth / 2, ctxHeight / 2 );
        }
    }

    // Update object
    this.update = (mouse) => {
        if(mouse){
            this.opt.pos.x = mouse.x;
            this.opt.pos.y = mouse.y;
        }
        return this;
    };

    // Draw Object
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
        ctx.fillStyle = this.opt.bgColor;
        ctx.fill();

        if( this.opt.brColor !== null ) {
            ctx.strokeStyle = this.opt.brColor;
            ctx.stroke();
        }
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        bgColor: '#052B3E',
        brColor: null
    }, options);
    init.call(this);
}

module.exports = Circle;