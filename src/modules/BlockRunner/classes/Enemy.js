import Shapes from '../../../lib/Shapes';

function Enemy( option ) {
    //Public
    this.isExplode = false;

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
        var xl0 = this.opt.pos.x,
            yl0 = this.opt.pos.y,
            xr0 = this.opt.pos.x + this.opt.size,
            yr0 = this.opt.pos.y + this.opt.size,

            result = false;

        enemies.forEach( enemy => {
            let xl1 = enemy.opt.pos.x,
                yl1 = enemy.opt.pos.y,
                xr1 = enemy.opt.pos.x + enemy.opt.size,
                yr1 = enemy.opt.pos.y + enemy.opt.size;
            //
            if( xl0 > xr1 || xl1 > xr0 )
                return false;
            if( yl0 > yr1 || yl1 > yr0 )
                return false;

           result = true;
        });
        return result;
    };

    this.update = player =>{
        if( this.hitPlayer(player) )
            this.isExplode = true;

        box.draw();
    };

    this.hitPlayer = player => {
        var xl0 = this.opt.pos.x,
            yl0 = this.opt.pos.y,
            xr0 = this.opt.pos.x + this.opt.size,
            yr0 = this.opt.pos.y + this.opt.size,


            xl1 = player.opt.pos.x,
            yl1 = player.opt.pos.y,
            xr1 = player.opt.pos.x + player.opt.size,
            yr1 = player.opt.pos.y + player.opt.size;

        if( xl0 > xr1 || xl1 > xr0 )
            return false;
        if( yl0 > yr1 || yl1 > yr0 )
            return false;

        return true;
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