import {Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';

function PointToMouse(options) {
    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        angle;

    function init() {
        if (!this.opt.ctx) throw 'PointToMouse Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new Vector2(ctxWidth / 2, ctxHeight / 2);
        }
    }

    // Update object
    this.update = () => {
        let mouse = this.opt.mouse,
            dx = mouse.x - this.opt.pos.x,
            dy = mouse.y - this.opt.pos.y;

        angle = Math.atan2(dy,dx);
        console.log(toDegree(Math.atan(dy/dx)));

        this.draw();
    };

    // Draw Object
    this.draw = () => {
        let thisX = this.opt.pos.x,
            thisY = this.opt.pos.y,
            arrowLen = 100;

        ctx.save();
        ctx.translate(thisX, thisY);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(-arrowLen / 2, 0);
        ctx.lineTo(arrowLen / 2, 0);
        ctx.lineTo(arrowLen / 2 - 10, 2);
        ctx.moveTo(arrowLen / 2, 0);
        ctx.lineTo(arrowLen / 2 - 10, -2);
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
        mouse: null
    }, options);
    init.call(this);
}

module.exports = PointToMouse;