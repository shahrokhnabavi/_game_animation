import {Game, Mouse, Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';
import Player from './classes/player';
import Ball from './classes/ball';

function Tennis(options) {
    // Private
    var appName = ' Tennis',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = new Mouse(),
        margin = 5,

        player1 = null,
        player2 = null,
        ball = null;

    function init() {
        var g = new Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        player1 = new Player({ctx: ctx, pos: new Vector2(margin, ctxHeight / 2)});
        player2 = new Player({ctx: ctx, pos: new Vector2(ctxWidth - margin - player1.wPlayer, ctxHeight / 2)});
        ball = new Ball({ctx: ctx});
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        player1.catchBall(ball).update(mouse);
        player2.aiCatchBall(ball).aiUpdate(ball);
        ball.update();
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;

        if(ball) ball.resize();
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#4D6266";
        ctx.fillText("App Name: " + appName, ctxWidth/2, ctxHeight-10);

        for( let i = 0; i < ctxHeight; i += 30) {
            (new Rectangle({
                ctx: ctx,
                pos: new Vector2(ctxWidth/2, i),
                size: {w: 2, h: 15},
                bgColor: '#E6F2EF'
            })).draw();
        }
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#16262C',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = Tennis;