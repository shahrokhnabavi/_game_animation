import CircleCollision from './classes/CircleCollision';
import BoxCollision from './classes/BoxCollision';

import {Game, Vector2} from '../../lib/Game';


function Collision(options) {
    // Private
    var appName = 'Collision';

    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        obj1 = null,
        obj2 = null;

    // Initialize
    function init() {
        var g = new Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(6);


        obj1 = new BoxCollision({
            ctx: ctx,
            pos: new Vector2(ctxWidth/2 - 50, ctxHeight/2 - 25),
            width: 100,
            height: 50
        });

        obj2 = new BoxCollision({
            ctx: ctx,
            pos: new Vector2(ctxWidth/2 - 25, ctxHeight/2 - 12.5),
            width: 50,
            height: 25,
            color: '#225D71',
            mouse: g.mouse
        });

        // obj1 = new CircleCollision({
        //     ctx: ctx,
        //     pos: new Vector2(ctxWidth/2 - 255, ctxHeight/2 - 25),
        //     radius: 50,
        // });
        // obj2 = new CircleCollision({
        //     ctx: ctx,
        //     pos: new Vector2(ctxWidth/2 - 12, ctxHeight/2 - 12),
        //     radius: 24,
        //     color: '#225D71',
        //     mouse: g.mouse
        // });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        obj1.update().draw();
        obj2.update().draw();

        if( obj2.collision( obj1 ) )
            obj1.opt.color = '#ABC9D8';
        else
            obj1.opt.color = '#052B3E';
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }


    //How to Use
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#052B3E";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#F2F2F2',
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = Collision;