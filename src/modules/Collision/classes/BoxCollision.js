import {Rectangle} from '../../../lib/Shapes';

function BoxCollision(options){
    // Private
    var ctx = null,
        obj = null;

    function init(options){
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        obj = new Rectangle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            size: {w: this.opt.width, h: this.opt.height}
        });
    }

    this.update = () => {
        if(this.opt.mouse){
            this.opt.pos.x = this.opt.mouse.x - (this.opt.width/2);
            this.opt.pos.y = this.opt.mouse.y - (this.opt.height/2);
        }
        return this;
    };

    this.collision = box => {

        var xl1 = this.opt.pos.x,
            yl1 = this.opt.pos.y,
            xr1 = this.opt.pos.x + this.opt.width,
            yr1 = this.opt.pos.y + this.opt.height,

            xl2 = box.opt.pos.x,
            yl2 = box.opt.pos.y,
            xr2 = box.opt.pos.x + box.opt.width,
            yr2 = box.opt.pos.y + box.opt.height;

        if( xl1 > xr2 || xr1 < xl2)
            return false;

        if( yl1 > yr2 || yr1 < yl2)
            return false;

        return true;
    };

    this.draw = () => {
        obj.opt.bgColor = this.opt.color;
        obj.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        width: 20,
        height: 20,
        color: '#052B3E',
        mouse: null
    }, options);
    init.call(this);
}

module.exports = BoxCollision;