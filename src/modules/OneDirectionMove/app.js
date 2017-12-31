import {Game, Vector2} from '../../lib/Game';
import Auto from './Auto';

function  OneDirectionMove(options) {
    // Private
    var appName = ' OneDirectionMove',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        auto = null;

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(9);

        auto = new Auto({ctx: ctx, input: g.input});
        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        auto.update();
    }

    // onResize Game
    function resize(ctxMe){
        ctxWidth  = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height
    }

    // Draw User Interface
    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#443954";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#F4EEEC',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports =  OneDirectionMove;