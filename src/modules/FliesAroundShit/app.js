import {Game, Vector2} from '../../lib/Game';
import Shit from './Shit';
import Fly from './Fly';

function  FliesAroundShit(options) {
    // Private
    var appName = ' FliesAroundShit',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        shit = null,
        flyNumber = 10,
        flies = [];

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        shit = new Shit({ctx: ctx});
        for(let i = 0; i < flyNumber; i++){
            flies.push(new Fly({ctx: ctx}));
        }

        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        shit.update();
        flies.forEach( item => {
            item.update();
        });
    }

    function clickHandler(e) {
        flies.push(new Fly({ctx: ctx}));
    }

        // onResize Game
    function resize(ctxMe){
        ctxWidth  = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }

    // Draw User Interface
    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#F24C27";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#FEFEFE',
        cfResize: resize,
        cfClick: clickHandler
    }, options);

    init.call(this);
}

module.exports =  FliesAroundShit;