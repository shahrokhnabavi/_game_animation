import Shapes from '../../../lib/Shapes';

function Enemy( option ) {
    //Public

    //Private
    var ctx = null,
        ctxHeight = 0,
        ctxWidth = 0,

        box = null;

    // Init function
    function init() {
        ctx = this.opt.ctx;
        this.resizeStage( this.opt.stage );

        if( this.opt.pos.isEmpty )
            this.opt.pos = new Vector(
                rand(this.opt.stage.l, this.opt.stage.r - this.opt.size),
                rand(this.opt.stage.t, this.opt.stage.b - this.opt.size)
            );

        box = Shapes('rect', {
            ctx: ctx,
            pos: this.opt.pos,
            bgColor: this.opt.color,
            size: {w: this.opt.size, h: this.opt.size}
        });
    }

    this.isInPlayerHome = () => { //x=111 , y=288
        return (this.opt.pos.x < (this.opt.stage.l + 1 + this.opt.playerHomeSize) &&
                this.opt.pos.y > (this.opt.stage.b - 1 - this.opt.playerHomeSize - this.opt.size ));
    };

    this.isIntersection = enemies => {

    };

    this.update = () =>{
        box.draw();
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
        color: '#FF1E40',
        stage: null,
        size: 20,
        playerHomeSize: 20
    }, option);
    init.call(this);
}

module.exports = Enemy;