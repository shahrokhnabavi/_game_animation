import {Game, Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';
import Player from './classes/player';
import Ball from './classes/ball';

function Tennis(options) {
    // Private
    var appName = ' Tennis',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        margin = 5,

        player = null,
        computer = null,
        ball = null;

    function init() {
        var g = new Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(8);

        player = new Player({ctx: ctx, pos: new Vector2(margin, ctxHeight / 2), input: g.input, mouse: g.mouse});
        computer = new Player({ctx: ctx, pos: new Vector2(ctxWidth - margin - player.wPlayer, ctxHeight / 2), isAi: true});
        ball = new Ball({ctx: ctx});
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        player.catchBall(ball).update(ball);
        computer.catchBall(ball).update(ball);
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

        ctx.font = "14px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#E6F2EF";
        ctx.fillText("Player Score: " + player.score, 20, 15);

        ctx.textAlign = 'right';
        ctx.fillText("AI Score: " + computer.score, ctxWidth - 20, 15);


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