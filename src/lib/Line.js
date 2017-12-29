function Line(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;

    function init(){
        if (!this.opt.ctx) throw 'Line Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.from.isEmpty ){
            this.opt.from = new Vector( ctxWidth / 2 - 5, ctxHeight / 2 );
        }

        if( this.opt.to.isEmpty ){
            this.opt.to = new Vector( ctxWidth / 2 + 5, ctxHeight / 2 );
        }
    }

    // Update object
    this.update = () => {
        return this;
    };

    // Draw Object
    this.draw = () => {
        ctx.beginPath();
        ctx.moveTo(this.opt.from.x, this.opt.from.y);
        ctx.lineTo(this.opt.to.x, this.opt.to.y);
        ctx.lineWidth = this.opt.thickness;
        ctx.strokeStyle = this.opt.color;
        ctx.stroke();
    };

    this.opt = Object.assign({
        ctx: null,
        from: new Vector(0,0),
        to: new Vector(),
        thickness: 1,
        color: '#F0F0F1',
    }, options);
    init.call(this);
}

module.exports = Line;