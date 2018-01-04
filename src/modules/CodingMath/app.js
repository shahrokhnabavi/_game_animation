import {Game, Vector2, Button} from '../../lib/Game';
import SinWave from './SinWave';
import CosMove from './CosMove';
import CircleMove from './CircleMove';

window.min = 0;
window.max = 360;

function  CodingMath(options) {
    // Private
    var appName = ' CodingMath',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        btn = [],

        sinWave = null,
        cosMove = null,
        circleMove = null;

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        allGamesMenu(10);


        let clr = '#594F4F',
            w = ctxWidth / 2;
        btn.push({btn: new Button({ctx:ctx, pos: new Vector2(w + 90, 10), bgColor:clr, text: 'Sin'}), clk: false});
        btn.push({btn: new Button({ctx:ctx, pos: new Vector2(w + 135, 10), bgColor:clr, text: 'Cos Move'}), clk: false});
        btn.push({btn: new Button({ctx:ctx, pos: new Vector2(w + 223, 10), bgColor:clr, text: 'Circle Movement'}), clk: false});

        sinWave = new SinWave({ctx: ctx});
        cosMove = new CosMove({ctx: ctx, pos: new Vector2(ctxWidth/2,ctxHeight/2)});
        circleMove = new CircleMove({ctx: ctx});
        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        if ( btn[0].clk )
            sinWave.update();

        if ( btn[1].clk )
            cosMove.update();

        if ( btn[2].clk )
            circleMove.update();
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

        btn.forEach( item => {
            item.btn.draw();
        });
    }

    function clickHandler(e) {
        if( btn[0].clk )
            sinWave.click(e);

        if( btn[1].clk )
            cosMove.click(e);

        btn.forEach( (item,index) => {
            if ( item.btn.isClick(e) ){
                unclickAll();
                item.clk = !item.clk;
            }
        });
    }

    function unclickAll(){
        btn.forEach( item => {
            item.clk = false;
        });
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