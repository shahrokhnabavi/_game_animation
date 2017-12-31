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
        cfResize: null
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