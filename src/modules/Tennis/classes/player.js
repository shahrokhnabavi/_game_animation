import {Rectangle} from '../../../lib/Shapes';

function TennisPlayer(options) {
    // Public
    this.wPlayer = 5;
    this.hPlayer = 40;

    // Private
    var ctx = null,
        aiSpeed = 2,
        aiOffset = 10,
        player = null;

    function init() {
        ctx = this.opt.ctx;

        player = new Rectangle({
            ctx: ctx,
            pos: this.opt.pos,
            size: {w: this.wPlayer, h: this.hPlayer},
            bgColor: this.opt.bgColor,
        });
    }

    // Update object
    this.aiUpdate = ball => {
        let playerY = this.opt.pos.y + this.hPlayer / 2,
            ballY = ball.opt.pos.y;

        if( Math.abs(playerY - ballY ) > aiOffset)
            if( playerY < ballY )
                this.opt.pos.y += aiSpeed;
            else
                this.opt.pos.y -= aiSpeed;

        this.update();
    };

    this.aiCatchBall = (ball) => {
        if( !(ball.opt.pos.x < this.opt.pos.x - ball.radius ||
                ball.opt.pos.y <  this.opt.pos.y - ball.radius||
                ball.opt.pos.y >  this.opt.pos.y + this.hPlayer + ball.radius)
        ){
            ball.opt.velocity.y = (ball.opt.pos.y - (this.opt.pos.y + this.hPlayer/2) )/10;
            ball.opt.velocity.x *= -1;
        }

        return this;
    };

    // Update object
    this.update = mouse => {
        if (mouse) {
            this.opt.pos.y = mouse.y - this.hPlayer / 2;
        }

        if (this.opt.pos.y < 0)
            this.opt.pos.y = 0;

        if (this.opt.pos.y + this.hPlayer > ctx.canvas.height)
            this.opt.pos.y = ctx.canvas.height - this.hPlayer;
        player.draw();
    };

    this.catchBall = (ball) => {
        if( !(ball.opt.pos.x > this.opt.pos.x + this.wPlayer + ball.radius ||
                ball.opt.pos.y <  this.opt.pos.y - ball.radius||
                ball.opt.pos.y >  this.opt.pos.y + this.hPlayer + ball.radius)
        ){
            ball.opt.velocity.y = (ball.opt.pos.y - (this.opt.pos.y + this.hPlayer/2) )/10;
            ball.opt.velocity.x *= -1;
        }

        return this;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        bgColor: '#E6F2EF',
    }, options);
    init.call(this);
}

module.exports = TennisPlayer;