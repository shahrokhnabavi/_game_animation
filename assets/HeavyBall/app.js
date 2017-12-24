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
            if( balls[index].getLifeTime() ) {
                balls.splice(index,1);
                index--;
                continue;
            }
            balls[index].move().draw();
        }
    }

    // Create new ball
    function createBall(){
        var ball = new Ball({
            ctx: ctx,
            velocity: new Vector(rand(-2,2), 0),
            speed: 0.5,
            lifeTime: 0,
            weight: 1.5,
        });

        balls.push(ball);
    }

    // resize game area
    function resize(){
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;

        balls.forEach( item => item.getActiveArea() );
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