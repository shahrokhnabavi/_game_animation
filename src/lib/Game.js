module.exports.Game = function(options){
    // Public
    this.input = null;
    this.mouse = null;

    // Private
    var ctx = null;

    function init() {

        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        var canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        if( typeof this.opt.cfClick === 'function' )
            window.addEventListener('click', this.opt.cfClick);

        window.addEventListener('resize', () => {
            this.resize(area);
        }, false);
        this.resize(area);

        this.input = new Input();
        this.mouse = new Mouse();
    }

    this.getCtx = () => {
        return ctx;
    };

    // Resize windows event
    this.resize = (area) => {
        ctx.canvas.height = area.clientHeight;
        ctx.canvas.width  = area.clientWidth;

        if( typeof this.opt.cfResize === 'function' )
            this.opt.cfResize(ctx);
    };


    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523',
        cfResize: null,
        cfClick: null
    }, options);
    init.call(this);
};


//+++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
function Mouse(options) {
    // Public
    this.x = 0;
    this.y = 0;

    // Private
    var mouse = null;

    function init() {
        mouse = this.opt.pos;
        window.addEventListener('mousemove', e => {
            getMousePos.call(this, e);
        }, false);
    }

    // Retrieve mouse position from window
    function getMousePos(e) {
        this.x = mouse.x = e.clientX;
        this.y = mouse.y = e.clientY;

    }

    // return vector
    this.get = () => {
        return mouse;
    };

    this.opt = Object.assign({
        pos: new Vector2(0, 0)
    }, options);
    init.call(this);
};


//+++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
var Vector = {
    _x: 1,
    _y: 0,

    create: function(x,y) {
        let obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    getX: function(){ return this._x; },
    setX: function(value) {
        this._x = value;
    },

    getY: function(){ return this._y; },
    setY: function(value) {
        this._y = value;
    },

    getLength: function(){ return Math.sqrt(this._x * this._x + this._y * this._y); },
    setLength: function(length) {
        let angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    getAngle: function(){ return Math.atan2( this._y, this._x) },
    setAngle: function(angle) {
        let length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    add: function (v2) { return Vector.create(this._x + v2._x, this._y + v2._y); },
    addTo: function (v2) {
        this._x += v2._x;
        this._y += v2._y;
    },

    subtract: function (v2) { return Vector.create(this._x - v2._x, this._y - v2._y); },
    subtractFrom: function (v2) {
        this._x -= v2._x;
        this._y -= v2._y;
    },

    multiply: function (scaler) { return Vector.create(this._x * scaler, this._y * scaler) },
    multiplyBy: function (scaler) {
        this._x *= scaler;
        this._y *= scaler;
    },

    divide: function (scaler) { return Vector.create(this._x / scaler, this._y / scaler) },
    divideBy: function (scaler) {
        this._x /= scaler;
        this._y /= scaler;
    },
};
module.exports.Vector = Vector;


var Vector2 = function(x, y){

    this.normal = (multi) => {
        var x = Math.abs(this.x),
            y = Math.abs(this.y);

        if( x > y ){
            y = y / x;
            x = 1;
        } else if ( x < y ) {
            x = x / y;
            y = 1;
        } else
            x = y = 1;

        // x += multi;
        // y += multi;

        x = (this.x < 0 ? x*-1 : x);
        y = (this.y < 0 ? y*-1 : y);

        return new Vector2(x , y);
    };

    this.move = (velocity, speed) => {
        if( typeof velocity !== 'object' ) throw 'Invalid Parameter';
        speed = speed ? speed : 1;
        this.x += velocity.x * speed;
        this.y += velocity.y * speed;
    };

    this.distance = point => {
        if( !point )
            return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
        return Math.sqrt( Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) );
    };

    this.isEmpty = (typeof x == 'undefined' || typeof y == 'undefined');

    this.x = x;
    this.y = y;
};
module.exports.Vector2 = Vector2;


//+++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
function Input(){

    var _pressed= {};

    this.isDown = function(keyCode) {
        return _pressed[keyCode];
    };

    function onKeydown(event) {
        // console.log(event.code);
        _pressed[event.code] = true;
    }

    function onKeyup(event) {
        delete _pressed[event.code];
    }

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('keyup', onKeyup);
}


//+++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++
import {Rectangle} from './Shapes';

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

    this.isClick = (e) => {
        let x = e.clientX,
            y = e.clientY;

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
};
module.exports.Button = Button;
