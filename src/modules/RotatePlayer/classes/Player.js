import Shapes from '../../../lib/Shapes';

function Player(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        objBox = null,
        objCircle = null,
        objLine = null,
        mouse = null;

    function init(){
        if (!this.opt.ctx) throw  'Object needs Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        // Objects
        objCircle = Shapes('circle', {
            ctx: ctx,
            pos: new Vector(0, 0),
            radius: this.opt.radius,
            bgColor:  this.opt.color
        });
        objLine = Shapes('line', {
            ctx: ctx,
            thickness: 5,
            from: new Vector(0, 0),
            to: new Vector(this.opt.radius + 10, 0)
        });
        objBox = Shapes('rect', {
            ctx: ctx,
            pos: new Vector(2, 3),
            bgColor: '#4F80E1',
            size: {w: 30,h:50}
        });
    }

    // Update object
    this.update = (mPos) => {
        if(mPos){
            mouse = mPos;
        }

        return this;
    };

    // Draw Object
    this.draw = () => {
        objCircle.draw();
        objLine.draw();
        objBox.draw();
    };

    this.lookAt = point => {
        let y = this.opt.pos.y,
            x = this.opt.pos.x;


        // 1 degree = 1 * Math.PI/180
        ctx.save();
        ctx.translate(x, y);

        var arcTan = Math.atan2( mouse.y-y , mouse.x-x);
        ctx.rotate(arcTan);

        this.draw();
        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        color: '#FF5349'
    }, options);
    init.call(this);
}

module.exports = Player;