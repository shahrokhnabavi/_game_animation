import {Vector2, Button} from '../../lib/Game';
import {Rectangle, Circle} from '../../lib/Shapes';

function CircleMove(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        btn1 = null,
        btn2 = null,
        btn3 = null,

        isCircle = false,
        isEllipse = false,
        isLissajous = false,

        path = null,

        obj = null,
        boxSize = 20,

        angle = 0,
        angleL = 0;

    function init(){
        if (!this.opt.ctx) throw 'CircleMove Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2 - boxSize / 2, ctxHeight / 2 - boxSize / 2);
        }

        btn1 = new Button({ctx:ctx, pos: new Vector2(20, 100), bgColor:'#F29B00', text: 'Circle'});
        btn2 = new Button({ctx:ctx, pos: new Vector2(20, 140), bgColor:'#F25533', text: 'Ellipse'});
        btn3 = new Button({ctx:ctx, pos: new Vector2(20, 180), bgColor:'#378C3F', text: 'Lissajous'});


        obj = new Rectangle({
            ctx: ctx,
            size: {w: boxSize, h: boxSize},
            pivot: new Vector2(this.opt.pos.x, this.opt.pos.y)
        });
        path = new Circle({
            ctx: ctx,
            radius: this.opt.rotateRadius,
            pivot: new Vector2(this.opt.pos.x, this.opt.pos.y),
            bgColor: null,
            brColor: '#FBBA42'
        });
    }

    // Update object
    this.update = () => {
        let centerX = this.opt.pos.x - boxSize/2,
            centerY = this.opt.pos.y - boxSize/2,
            radius = this.opt.rotateRadius,
            speed  = this.opt.speed,
            speedL = 4,
            posX, posY;


        if( angle > 360 )
            angle = 0;

        if( angleL > 360 )
            angleL = 0;

        if( isCircle ){
            posX = centerX + radius * Math.cos( toRadian(angle) );
            posY = centerY + radius * Math.sin( toRadian(angle) );
            angle += speed;
            obj.opt.size.w = obj.opt.size.h = boxSize;
        }

        if( isEllipse ){
            posX = centerX + (radius-50) * Math.cos( toRadian(angle) );
            posY = centerY + (radius+20) * Math.sin( toRadian(angle) );
            angle += speed;
            obj.opt.size.w = obj.opt.size.h = boxSize;
        }

        if( isLissajous ){
            obj.opt.size.w = obj.opt.size.h = 4;
            speed = 3;
            posX = centerX + radius * Math.cos( toRadian(angle) );
            posY = centerY + radius * Math.sin( toRadian(angleL) );
            angle += speed;
            angleL += speedL;
        }

        obj.opt.pivot.x = posX;
        obj.opt.pivot.y = posY;
        this.draw();
    };

    this.click = e => {
        if( btn1.isClick(e) )
            isCircle = !isCircle;

        if( btn2.isClick(e) )
            isEllipse = !isEllipse;

        if( btn3.isClick(e) )
            isLissajous = !isLissajous;
    };

    // Draw Object
    this.draw = () => {
        obj.draw();
        path.draw();

        btn1.draw();
        btn2.draw();
        btn3.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
        rotateRadius: 80,
        speed: 1
    }, options);
    init.call(this);
}

module.exports = CircleMove;