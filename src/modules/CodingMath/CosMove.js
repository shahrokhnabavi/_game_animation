import {Vector2, Button} from '../../lib/Game';
import {Circle} from '../../lib/Shapes';

function CosMove(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        btn1 = null,
        btn2 = null,
        btn3 = null,

        isSin = false,
        isCos = false,
        isRadius = false,

        speed = 1,
        angle = 0,
        range = 100,

        offsetX = 0,
        offsetY = 0,
        obj = null;

    function init(){
        if (!this.opt.ctx) throw 'CosMove Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        obj = new Circle({
            ctx: ctx,
            pivot: this.opt.pos,
            radius: 20,
            bgColor: '#052B3E',
        });

        offsetX = this.opt.pos.x;
        offsetY = this.opt.pos.y;


        btn1 = new Button({ctx:ctx, pos: new Vector2(20, 100), bgColor:'#F29B00', text: 'Sin'});
        btn2 = new Button({ctx:ctx, pos: new Vector2(20, 140), bgColor:'#F25533', text: 'Cos'});
        btn3 = new Button({ctx:ctx, pos: new Vector2(20, 180), bgColor:'#378C3F', text: 'Radius'});
    }

    // Update object
    this.update = () => {
        if ( angle > 360 )
            angle = 0;
        angle += speed;

        if( isSin )
            obj.opt.pivot.y = offsetY + Math.sin(toRadian(angle))*range;

        if( isCos )
            obj.opt.pivot.x = offsetX + Math.cos(toRadian(angle))*range;

        if( isRadius )
            obj.opt.radius = 20+Math.abs(Math.cos(toRadian(angle))*range);

        this.draw();
    };

    // Draw Object
    this.draw = () => {
        obj.draw();
        btn1.draw();
        btn2.draw();
        btn3.draw();
    };

    this.click = e => {
        if( btn1.isClick(e) )
            isSin = !isSin;

        if( btn2.isClick(e) )
            isCos = !isCos;

        if( btn3.isClick(e) )
            isRadius = !isRadius;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
    }, options);
    init.call(this);
}

module.exports = CosMove;