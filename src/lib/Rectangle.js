function Rectangle(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;

    function init(){
        if (!this.opt.ctx) throw 'Rectangle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector( ctxWidth / 2, ctxHeight / 2 );
        }

        if( this.opt.size === null )
            this.opt.size = {w: 10, h:10};
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
        ctx.rect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.size.w,
            this.opt.size.h
        );
        ctx.fillStyle = this.opt.bgColor;

        let orgAlpha = ctx.globalAlpha;
        if( this.opt.alpha !== null)
            ctx.globalAlpha = this.opt.alpha;
        ctx.fill();
        ctx.globalAlpha = orgAlpha;


        if( this.opt.brColor !== null ) {
            ctx.strokeStyle = this.opt.brColor;
            ctx.stroke();
        }
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        size: null,
        bgColor: '#052B3E',
        brColor: null,
        alpha: null
    }, options);
    init.call(this);
}

module.exports = Rectangle;