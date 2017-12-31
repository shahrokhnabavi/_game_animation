import {Vector2} from './Game';
import Line from './Line';

module.exports.Shapes = function(type, options){
    switch( type ){
        case 'circle':
            return new Circle(options);
        case 'line':
            return new Line(options);
        case 'rect':
            return new Rectangle(options);
        default:
            throw 'Undefined Shape type.'
    }
};


module.exports.Rectangle = function(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;

    function init(){
        if (!this.opt.ctx) throw 'Rectangle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2, ctxHeight / 2 );
        }

        if( this.opt.size === null )
            this.opt.size = {w: 10, h:10};
    }

    // Update object
    this.update = (mouse) => {
        if(mouse){
            this.opt.pos.x = mouse.x;
            this.opt.pos.y = mouse.y;
        }
        return this;
    };

    // Draw Object
    this.draw = () => {
        ctx.beginPath();
        ctx.rect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.size.w,
            this.opt.size.h
        );
        ctx.fillStyle = this.opt.bgColor;

        let orgAlpha = ctx.globalAlpha;
        if( this.opt.alpha !== null)
            ctx.globalAlpha = this.opt.alpha;
        ctx.fill();
        ctx.globalAlpha = orgAlpha;


        if( this.opt.brColor !== null ) {
            ctx.strokeStyle = this.opt.brColor;
            ctx.stroke();
        }
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
        size: null,
        bgColor: '#052B3E',
        brColor: null,
        alpha: null
    }, options);
    init.call(this);
};


module.exports.Circle = function(options){
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;

    function init(options){
        if (!this.opt.ctx) throw 'Circle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty ){
            this.opt.pos = new Vector2( ctxWidth / 2, ctxHeight / 2 );
        }
    }

    // Update object
    this.update = (mouse) => {
        if(mouse){
            this.opt.pos.x = mouse.x;
            this.opt.pos.y = mouse.y;
        }
        return this;
    };

    // Draw Object
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = this.opt.bgColor;
        ctx.fill();

        if( this.opt.brColor !== null ) {
            ctx.strokeStyle = this.opt.brColor;
            ctx.stroke();
        }
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
        radius: 20,
        bgColor: '#052B3E',
        brColor: null
    }, options);
    init.call(this);
};