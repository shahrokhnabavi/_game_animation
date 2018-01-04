import {Vector2} from '../../lib/Game';
import {Rectangle, Circle} from '../../lib/Shapes';

function CircleMove(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        path = null,

        obj = null,
        boxSize = 20,
        angle = 0;

    function init(){
        if (!this.opt.ctx) throw 'CircleMove Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2 - boxSize / 2, ctxHeight / 2 - boxSize / 2);
        }

        obj = new Rectangle({
            ctx: ctx,
            size: {w: boxSize, h: boxSize},
            pivot: new Vector2(this.opt.pos.x, this.opt.pos.y)
        });
        path = new Circle({
            ctx: ctx,
            radius: this.opt.rotateRadius,
            pivot: new Vector2(this.opt.pos.x, this.opt.pos.y),
            bgColor: null,
            brColor: '#FBBA42'
        });
    }

    // Update object
    this.update = () => {
        let centerX = this.opt.pos.x - boxSize/2,
            centerY = this.opt.pos.y - boxSize/2,
            radius = this.opt.rotateRadius,
            posX = centerX + radius * Math.cos( toRadian(angle) ),
            posY = centerY + radius * Math.sin( toRadian(angle) );

        obj.opt.pivot.x = posX;
        obj.opt.pivot.y = posY;

        if( angle > 360 )
            angle = 0;
        angle += 0.1;
        this.draw();
    };

    // Draw Object
    this.draw = () => {
        obj.draw();
        path.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
        rotateRadius: 100,
    }, options);
    init.call(this);
}

module.exports = CircleMove;