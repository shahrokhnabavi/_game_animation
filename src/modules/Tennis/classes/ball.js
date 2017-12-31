import {Vector2} from '../../../lib/Game';
import {Circle} from '../../../lib/Shapes';

function Ball(options){
    // public
    this.radius = 10;
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        ball = null;

    function init(){
        if (!this.opt.ctx) throw 'Ball Objects need Context';

        ctx = this.opt.ctx;
        this.resize();

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2, ctxHeight / 2 );
        }

        ball = new Circle({
            ctx: ctx,
            pos: this.opt.pos,
            bgColor: this.opt.bgColor,
            radius: this.radius
        });
    }

    // Update object
    this.update = () => {

        if( this.opt.pos.y < this.radius || this.opt.pos.y > ctxHeight - this.radius){
            this.opt.velocity.y *= -1;
        }

        if( this.opt.pos.x < this.radius || this.opt.pos.x > ctxWidth - this.radius){
            this.reset();
        }

        this.opt.pos.move( this.opt.velocity, 3);
        ball.draw();
    };

    this.reset = () => {
        this.opt.pos.x = ctxWidth / 2;
        this.opt.pos.y = ctxHeight / 2;
        this.opt.velocity.x *= -1;
        this.opt.velocity.y = rangeRand(0.2,1);
    };

    this.resize = () => {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;
    }

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
        bgColor: '#BEDADC',
        velocity: (new Vector2(rangeRand(5,9), rangeRand(2,4))).normal()
    }, options);
    init.call(this);
}

module.exports = Ball;