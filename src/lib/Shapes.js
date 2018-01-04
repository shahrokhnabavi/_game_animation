import {Vector2} from './Game';

function faceVector(ctx){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50,0);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

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

        if( this.opt.size === null )
            this.opt.size = {w: 10, h:10};
    }

    // Draw Object
    this.draw = () => {
        let thisX = this.opt.pivot.x,
            thisY = this.opt.pivot.y;

        ctx.beginPath();
        ctx.rect(thisX, thisY,
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

        if( this.opt.showDirection ){
            faceVector(ctx);
        }
    };

    this.opt = Object.assign({
        ctx: null,
        size: null,
        bgColor: '#052B3E',
        brColor: null,
        alpha: null,
        pivot: new Vector2(0,0),
        showDirection: false
    }, options);
    init.call(this);
};

// #######################################
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
    }

    // Draw Object
    this.draw = () => {
        let thisX = this.opt.pivot.x,
            thisY = this.opt.pivot.y;

        ctx.beginPath();
        ctx.arc(thisX, thisY,
            this.opt.radius,
            0,
            Math.PI * 2,
            false
        );
        if( this.opt.bgColor !== null ) {
            ctx.fillStyle = this.opt.bgColor;
            ctx.fill();
        }

        if( this.opt.brColor !== null ) {
            ctx.strokeStyle = this.opt.brColor;
            ctx.stroke();
        }

        if( this.opt.showDirection ){
            faceVector(ctx);
        }
    };

    this.opt = Object.assign({
        ctx: null,
        radius: 20,
        bgColor: '#052B3E',
        brColor: null,
        pivot: new Vector2(0,0),
        showDirection: false
    }, options);
    init.call(this);
};


// #########################
module.exports.Line = function(options) {
    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0;

    function init(){
        if (!this.opt.ctx) throw 'Line Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.from.isEmpty ){
            this.opt.from = new Vector2( ctxWidth / 2 - 5, ctxHeight / 2 );
        }

        if( this.opt.to.isEmpty ){
            this.opt.to = new Vector2( ctxWidth / 2 + 5, ctxHeight / 2 );
        }
    }

    // Update object
    this.update = () => {
        return this;
    };

    // Draw Object
    this.draw = () => {
        ctx.beginPath();
        ctx.moveTo(this.opt.from.x, this.opt.from.y);
        ctx.lineTo(this.opt.to.x, this.opt.to.y);
        ctx.lineWidth = this.opt.thickness;
        ctx.strokeStyle = this.opt.color;
        ctx.stroke();
    };

    this.opt = Object.assign({
        ctx: null,
        from: new Vector2(0,0),
        to: new Vector2(),
        thickness: 1,
        color: '#F0F0F1',
    }, options);
    init.call(this);
};