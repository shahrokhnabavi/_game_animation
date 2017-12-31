import {Vector2} from '../../../lib/Game';
import {Rectangle} from '../../../lib/Shapes';

function Player(option) {
    // Privates
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        box = null;

    // Initialize
    function init() {
        ctx = this.opt.ctx;

        this.resizeStage(this.opt.stage);

        this.opt.pos.x = this.opt.stage.l + 1;
        this.opt.pos.y = this.opt.stage.b - this.opt.size - 1;

        this.life = this.opt.life;
        box = new Rectangle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            size: {w: this.opt.size, h: this.opt.size}
        });
    }

    this.update = () => {
        var x = 0,
            y = 0,
            Key = this.opt.input;

        if (Key.isDown('ArrowUp')) y -= 1;
        if (Key.isDown('ArrowLeft')) x -= 1;
        if (Key.isDown('ArrowDown')) y += 1;
        if (Key.isDown('ArrowRight')) x += 1;
        this.move( new Vector2(x, y));
        this.draw();
    };

    // Draw Ball
    this.draw = () => {
        box.opt.pivot = this.opt.pos;
        box.draw();
    };

    this.damage = amount => {
        this.life -= amount;
    };

    // Move Ball
    this.move = ( movement ) => {
        var x = this.opt.pos.x + (movement.x * this.opt.speed),
            y = this.opt.pos.y + (movement.y * this.opt.speed),
            w = this.opt.size;

        if (x > this.opt.stage.l+2 && x + w < this.opt.stage.r-1)
            this.opt.velocity.x = movement.x;
        else {
            this.opt.velocity.x = 0;
            this.opt.pos.x = x < ctxWidth/2 ? this.opt.stage.l+1 : this.opt.stage.r - w - 1;
        }

        if (y > this.opt.stage.t + 1 && y + w< this.opt.stage.b - 1)
            this.opt.velocity.y = movement.y;
        else{
            this.opt.velocity.y = 0;
            this.opt.pos.y = y < ctxHeight/2 ? this.opt.stage.t+1 : this.opt.stage.b - w - 1;
        }

        this.opt.pos.move(this.opt.velocity, this.opt.speed);
        return this;
    };

    this.resizeStage = (stage) => {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        this.opt.stage = stage;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(0,0),
        velocity: new Vector2(),
        size: 20,
        color: '#FFF9DD',
        speed: 2,
        stage: null,
        life: 1000
    }, option);

    // Call Initialize
    init.call(this);
}

module.exports = Player;