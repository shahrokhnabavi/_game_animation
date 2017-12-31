import {Game, Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';

function Auto(options){
// Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        obj = null,

        vx = 0,
        vy = 0,
        angle = deg(0),
        dAngle = 0.07,
        acc = 0.1,
        v = 0,
        vmax = 5;

    function init(){
        if (!this.opt.ctx) throw 'Auto Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;


        this.opt.pos = new Vector2( ctxWidth/2 , ctxHeight/2 );
        obj = new Rectangle({
            ctx: ctx,
            size: {w:80,h:10},
            pivot: new Vector2(-40, -5),
            showDirection: true
        });
    }

    // Update object
    this.update = () => {
        let input = this.opt.input;

        if( input.isDown('KeyW') ){
            v += acc;
            if( v > vmax )
                v = vmax;
        }else if( input.isDown('KeyS') ){
            v -= acc;
            if( v < -vmax )
                v = -vmax;
        } else {
            if( v < 0.03 && v > -0.03 ){
                v = 0;
            };

            if( v < 0 ){
                v += 0.03;
            }
            if( v > 0 ){
                v -= 0.03;
            }
        }


        var upKey = v < 0 ? input.isDown('KeyA') : input.isDown('KeyD');
        var downKey = v < 0 ? input.isDown('KeyD') : input.isDown('KeyA');
        if (upKey) {
            angle += dAngle;
            if (angle > Math.PI * 2)
                angle -= Math.PI * 2;
        }
        if (downKey) {
            angle -= dAngle;
            if (angle < 0)
                angle += Math.PI * 2;
        }


        vy = v * Math.sin(angle);
        vx = v * Math.cos(angle);

        this.opt.pos.x += vx;
        this.opt.pos.y += vy;

        this.draw();
    };

    // Draw Object
    this.draw = () => {
        ctx.save();
        ctx.translate( this.opt.pos.x, this.opt.pos.y );
        ctx.rotate(angle);

        obj.draw();

        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
    }, options);
    init.call(this);
}

module.exports = Auto;