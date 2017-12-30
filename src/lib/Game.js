module.exports.Game = function(options){
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


module.exports.Mouse = function(options) {
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
        pos: new Vector(0, 0)
    }, options);
    init.call(this);
};