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

        window.addEventListener('click', singleBall);
        window.addEventListener('resize', resize);
        window.addEventListener('keyup', keyHandler);

        createBall();
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        help();

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
            speed: 1,
            lifeTime: 0,
            weight: 1.2,
            radius: rand(8,20)
        });

        balls.push(ball);
    }

    // resize game area
    function resize(){
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;

        balls.forEach( item => item.getActiveArea() );
    }

    // resize game area
    function keyHandler(e){
        switch(e.key){
            case 'r':
            case 'R':
                for(let i = 0; i < 500; i++){
                    createBall();
                }
                break;
            case 'c':
            case 'C':
                balls = [];
                break;
            case 'd':
            case 'D':
                var ball = new Ball({
                    ctx: ctx,
                    velocity: new Vector(rand(-2,2), rand(-2,2)),
                    speed: 1,
                    lifeTime: 10,
                    weight: 1.2,
                    radius: rand(8,20)
                });

                balls.push(ball);
                break;
            case ' ':
                createBall();
                break;
        }
    }

    // create ball in the position of mouse
    function singleBall(e){
        var ball = new Ball({
            ctx: ctx,
            velocity: new Vector(rand(-2,2), rand(-2,2)),
            pos: new Vector(e.clientX, e.clientY),
            speed: 1,
            lifeTime: 0,
            weight: 1.2,
            radius: rand(8,20)
        });

        balls.push(ball);
    }

    //How to Use
    function help() {
        ctx.font="20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name:" + appName,10,50);
        ctx.font="14px Georgia";
        ctx.fillText("Click anywhere to create a ball.",10,80);
        ctx.fillText("Press \'R\' key to generate randomly 500 balls",10,96);
        ctx.fillText("Press \'C\' key to clear screen",10,112);
        ctx.fillText("Press \'Space\' key to create randomly a ball",10,128);
        ctx.fillText("Press \'D\' key to create randomly a ball and automatically destroy",10,144);


        ctx.textAlign = 'right';
        ctx.fillText('Number of ball: ' + balls.length, ctxWidth - 10, 50);
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