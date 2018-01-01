import {Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';

function Button(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        obj = null;

    function init(){
        if (!this.opt.ctx) throw 'Button Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        obj = new Rectangle({
            ctx: ctx,
            size: {
                w: this.opt.size.x,
                h: this.opt.size.y
            },
            pivot: this.opt.pos,
            bgColor: this.opt.bgColor,
            txtColor: this.opt.txtColor,
        });
    }

    // Update object
    this.update = () => {
        this.draw();
    };

    this.isClick = (x, y) => {
        return x > this.opt.pos.x &&
            x < this.opt.pos.x + this.opt.size.x &&
            y > this.opt.pos.y &&
            y < this.opt.pos.y + this.opt.size.y;
    };

    // Draw Object
    this.draw = () => {
        let w = obj.opt.size.w,
            h = obj.opt.size.h,
            x = obj.opt.pivot.x,
            y = obj.opt.pivot.y,
            fSize = this.opt.fontSize;
        ctx.beginPath();
        ctx.font = fSize + 'px Arial';

        let ts = ctx.measureText(this.opt.text).width;
        obj.opt.size.w = ts + 20;
        obj.draw();

        ctx.textAlign = 'center';
        ctx.fillStyle = this.opt.txtColor;
        ctx.fillText(this.opt.text, x + w / 2, y + (fSize / 2 -2) + h / 2);
        ctx.closePath();

    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        size: new Vector2(80, 30),
        bgColor: 'red',
        txtColor: 'white',
        text: 'Click Me',
        fontSize: 14,
        mouse: null,
    }, options);
    init.call(this);
}

module.exports = Button;