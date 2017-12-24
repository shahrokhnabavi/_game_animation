function HeavyBall( options ) {
    // Private
    var area   = null,
        canvas = null,
        ctx    = null,

        balls  = [];

    function init() {

        area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        resize();

        ctx = canvas.getContext('2d');

        createBall();

        window.addEventListener('resize', resize);
    }

    function update() {
        requestAnimationFrame(update);
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let index = 0; index < this.balls.length; index++) {
            this.balls[index].move().scale(this.mouse, 50).draw();
        }
    }

    function createBall(){
        var ball = new Ball();

        balls.push(ball);
    }

    // resize game area
    function resize(){
        canvas.height = area.clientHeight;
        canvas.width  = area.clientWidth;
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#22333B',
    }, options);

    init.call(this);
};