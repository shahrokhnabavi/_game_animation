function BoxCollision(options){
    // Private
    var ctx = null;

    function init(options){
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
    }

    this.update = (mouse) => {
        if(mouse){
            this.opt.pos.x = mouse.x - (this.opt.width/2);
            this.opt.pos.y = mouse.y - (this.opt.height/2);
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
        ctx.beginPath();
        ctx.rect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.width,
            this.opt.height
        );
        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        width: 20,
        height: 20,
        color: '#052B3E'
    }, options);
    init.call(this);
}

module.exports = BoxCollision;