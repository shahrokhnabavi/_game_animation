var appName = 'HeavyBall',
    errorTitle = '[' + appName + ' - Error]: ';

function HeavyBall( options ) {
    // Private
    var area   = null,
        canvas = null,
        ctx    = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        balls = [];

    // Initialize
    function init() {

        area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        resize();

        ctx = canvas.getContext('2d');

        window.addEventListener('click', createBall);
        window.addEventListener('resize', resize);

        createBall();
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        for (let index = 0; index < balls.length; index++) {
            balls[index].move().draw();
        }
    }

    // Create new ball
    function createBall(){
        var ball = new Ball({
            ctx: ctx
        });

        balls.push(ball);
    }

    // resize game area
    function resize(){
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#22333B',
    }, options);

    // Call Initialize
    init.call(this);
};