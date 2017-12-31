import {Game} from '../../lib/Game';

function MouseTail(options) {
    // Private
    var appName = 'Mouse Tail';

    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = null;

    function init(){
        var g = new Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        mouse = g.mouse;

        allGamesMenu(3);

        update();
    }

    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
    }

    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, mouse.x, mouse.y);
    }

    function getMousePos(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function resize(area){
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523',
    }, options);

    init.call(this);
}

module.exports = MouseTail;