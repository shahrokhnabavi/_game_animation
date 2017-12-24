function BackgroundBalls() {
    this.width = 0;
    this.height = 0;
    this.ctx = null;
    this.balls = [];
    this.ballsNumber = 1000;
    this.mouse = null;

    function init() {
        var canvas = new Screen();
        this.ctx = canvas.getContext('2d');

        genarateBall(canvas);
        update();

        window.addEventListener('mousemove', (e) => { this.mouse = {x: e.x, y: e.y}; });
        window.addEventListener('resize', () => genarateBall(canvas));
    }


    function genarateBall(canvas) {

        this.width = canvas.width;
        this.height = canvas.height;

        this.balls = [];
        for (let index = 0; index < this.ballsNumber; index++) {
            this.balls.push(new Ball({
                    app: this,
                    isRandom: true,
                    color: randColor()
                })
            );
        }
    }
    function update() {
        requestAnimationFrame(update);
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let index = 0; index < this.balls.length; index++) {
            this.balls[index].move().scale(this.mouse, 50).draw();
        }
    }




    // Testing to draw some shapes
    function ShapeTest() {
        Box(this.ctx, {
            pos: randPos(0, this.width - 20, 0, this.height - 20),
            size: {w: 20, h: 20},
            color: randColor()
        });
        Line(this.ctx);
        Circle(this.ctx);
        Packman(this.ctx);
    }

    init.call(this);
};