function Enemy( option ) {
    //Public

    //Private
    var speed = 3,
        ctx = null,
        ctxHeight = 0,
        ctxWidth = 0;

    // Init function
    function init() {
        ctx = this.opt.ctx;
        this.resizeStage( this.opt.stage);

        if( this.opt.pos.isEmpty )
            this.opt.pos = new Vector(
                rand(this.opt.stage.l, this.opt.stage.r - this.opt.size),
                rand(this.opt.stage.t, this.opt.stage.b - this.opt.size)
            );
    }

    this.draw = () =>{
        ctx.beginPath();
        ctx.rect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.size,
            this.opt.size
        );
        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    this.update = () =>{
        this.draw();
    };

    this.resizeStage = stage => {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        this.opt.stage = stage;
    };

    // Default options
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        color: 'red',
        stage: null,
        size: 20
    }, option);
    init.call(this);
}

module.exports = Enemy;