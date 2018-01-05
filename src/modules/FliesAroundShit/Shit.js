import {Vector2} from '../../lib/Game';
import {Rectangle} from '../../lib/Shapes';

function Shit(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        img1 = null;

    function init(){
        if (!this.opt.ctx) throw 'Shit Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;
        allGamesMenu(12);

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2, ctxHeight / 2 );
        }

        img1 = new Image();
        img1.src = '/dist/img/shit.png';
    }

    // Update object
    this.update = () => {
        this.draw();
    };

    // Draw Object
    this.draw = () => {
        let thisX = this.opt.pos.x - img1.width/2,
            thisY = this.opt.pos.y - 30;

        ctx.drawImage(img1, thisX, thisY);
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
    }, options);
    init.call(this);
}

module.exports = Shit;