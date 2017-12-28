import Screen from './classes/screen';
import Ball from './classes/ball';
import Shapes from './classes/shapes';

function BackgroundBalls() {
    var ctx = null,
        width = 0,
        height = 0,

        balls = [],
        mouse = null,
        ballsNumber = 1000;

    function init() {
        var canvas = new Screen();
        ctx = canvas.getContext('2d');

        genarateBall(canvas);
        update();

        window.addEventListener('mousemove', (e) => { mouse = {x: e.x, y: e.y}; });
        window.addEventListener('resize', () => genarateBall(canvas));
    }


    function genarateBall(canvas) {

        width = canvas.width;
        height = canvas.height;

        balls = [];
        for (let index = 0; index < ballsNumber; index++) {
            balls.push(new Ball({
                    ctx: ctx,
                    isRandom: true,
                    color: randColor()
                })
            );
        }
    }
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, width, height);

        for (let index = 0; index < balls.length; index++) {
            balls[index].move().scale(mouse, 50).draw();
        }
    }




    // Testing to draw some shapes
    function ShapeTest() {
        Shapes.Box(ctx, {
            pos: randPos(0, width - 20, 0, height - 20),
            size: {w: 20, h: 20},
            color: randColor()
        });
        Shapes.Line(ctx);
        Shapes.Circle(ctx);
        Shapes.Packman(ctx);
    }

    init.call(this);
}

module.exports = BackgroundBalls;