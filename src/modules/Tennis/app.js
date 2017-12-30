import {Game, Mouse} from '../../lib/Game';

function Tennis(options) {
    // Private
    var appName = 'Tennis',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = new Mouse();

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;


        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
    }

    // Resize
    function resize(ctxMe){
        ctxWidth  = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height
    }

    // Draw User Interface
    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, mouse.x, mouse.y);
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = Tennis;