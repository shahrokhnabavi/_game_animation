function Ball( option ){
    // Privates
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;


    // Initialize
    function init(){
        if ( !this.opt.ctx ) throw '[MyGame Error]: Object needs Context';

        ctx = this.opt.ctx;

        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty )
            this.opt.pos = new Vector(
                rand(this.opt.radius, ctxWidth - this.opt.radius ),
                rand(this.opt.radius, ctxHeight - this.opt.radius )
            );

        this.draw();
    }

    // Draw Ball
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    this.move = () => {
        return this;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        color: randColor(),
    }, option);

    // Call Initialize
    init.call(this);
}