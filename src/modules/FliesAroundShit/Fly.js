import {Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';

function Fly(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        img1 = null,

        angleX = rand(0,360),
        angleY = rand(0,360),
        cX, cY, r, speedX, speedY, rotate;

    function init(){
        if (!this.opt.ctx) throw 'Fly Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2, ctxHeight / 2 );
        }

        img1 = new Image();
        img1.src = '/dist/img/fly.png';

        cX = this.opt.pos.x;
        cY = this.opt.pos.y;
        r = rand(30, 90);
        speedX = rand(2, 4);
        speedY = rand(4, 7);
        rotate = rangeRand(20,25);
    }

    // Update object
    this.update = () => {

        this.opt.pos.x = cX + r * Math.cos(toRadian(angleX));
        this.opt.pos.y = cY + r * Math.sin(toRadian(angleY));

        if( angleX > 360 )
            angleX = 0;
        angleX += speedX;

        if( angleY > 360 )
            angleY = 0;
        angleY += speedY;

        this.draw();
    };

    // Draw Object
    this.draw = () => {
        let thisX = this.opt.pos.x - img1.width/2,
            thisY = this.opt.pos.y;
        ctx.save();
        ctx.translate(ctxWidth/2, ctxHeight/2);
        ctx.rotate(rotate);
        ctx.drawImage(img1, ctxWidth/2 - thisX, ctxHeight/2 - thisY, 10, 5);
        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
    }, options);
    init.call(this);
}

module.exports = Fly;