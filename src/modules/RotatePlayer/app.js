import {Game, Vector2} from '../../lib/Game';
import Player from './classes/Player';

function RotatePlayer(options) {
    // Private
    var appName = 'RotatePlayer',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = null,
        player = null;

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        mouse = g.mouse;

        allGamesMenu(7);

        player = new Player({
            ctx: ctx,
            pos: new Vector2(ctxWidth/2,ctxHeight/2),
            velocity: new Vector2(0,0),
            radius: 100
        });
        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        player.update(mouse).lookAt( new Vector2( 10, 200) );
        userInterface();
    }

    // Draw User Interface
    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    // Resize windows event
    function resize( ctxMe ){
        ctxWidth  = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#292C44',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = RotatePlayer;