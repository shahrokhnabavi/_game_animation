import {Game, Vector2} from '../../lib/Game';
import Button from './button';


function  CodingMath(options) {
    // Private
    var appName = ' CodingMath',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        btn1 = null,
        btn2 = null,
        btn3 = null;

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        
        // g.click(this.clickHandler);

        btn1 = new Button({ctx:ctx, pos: new Vector2(20, 100), bgColor:'#F29B00', text: 'Circle'});
        btn2 = new Button({ctx:ctx, pos: new Vector2(20, 140), bgColor:'#F25533', text: 'Click'});
        btn3 = new Button({ctx:ctx, pos: new Vector2(20, 180), bgColor:'#378C3F', text: 'Test Me'});
        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
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
        ctx.fillStyle = "#152C35";
        ctx.fillText("App Name: " + appName, 20, 30);

        btn1.draw();
        btn2.draw();
        btn3.draw();
    }

    function clickHandler(e) {
        let x = e.clientX,
            y = e.clientY;

        if( btn1.isClick(x, y) )
            console.log("yellow hello");

        if( btn2.isClick(x, y) )
            console.log("red hello");

        if( btn3.isClick(x, y) )
            console.log("green hello");
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#F2F0F2',
        cfResize: resize,
        cfClick: clickHandler
    }, options);

    init.call(this);
}

module.exports =  CodingMath;