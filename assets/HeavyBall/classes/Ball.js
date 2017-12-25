function Ball(option) {
    // Privates
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        gravity = 0.5,
        createdAt = 0;


    // Initialize
    function init() {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        this.getActiveArea();

        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty)
            this.opt.pos = new Vector(
                rand(this.opt.radius, ctxWidth - this.opt.radius),
                rand(this.opt.radius, ctxHeight - this.opt.radius)
            );

        createdAt = new Date().getTime();
        this.draw();
    }

    // Draw Ball
    this.draw = () => {

        ctx.beginPath();
        ctx.arc(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.radius,
            0,
            Math.PI * 2
        );
        ctx.closePath();

        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    // Move Ball
    this.move = () => {
        var x = this.opt.pos.x,
            y = this.opt.pos.y,
            r = this.opt.radius,
            friction = (1 / (this.opt.weight > 15 ? 15 : this.opt.weight < 1 ? 1 : this.opt.weight)).toPrecision(2);

        if (x < r || x > ctxWidth - r)
            this.opt.velocity.x *= -1;
        else
            this.opt.velocity.x *= 0.995;


        if (y < r || y > ctxHeight - r - this.opt.velocity.y * this.opt.speed) {
            this.opt.velocity.y *= -1 * friction;

            if (Math.abs(this.opt.velocity.y) < 0.001) {
                this.opt.pos.y = ctxHeight - r;
                this.opt.velocity.y = 0;
            }
        } else
            this.opt.velocity.y += gravity;

        this.opt.pos.move(this.opt.velocity, this.opt.speed);
        return this;
    };

    // Set Active Area for Ball
    this.getActiveArea = () => {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
    };

    // Define a Destroy Time
    this.getLifeTime = () => {
        if (this.opt.lifeTime === 0) return false;
        return parseInt((new Date().getTime() - createdAt) / 1000) > this.opt.lifeTime;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        velocity: new Vector(rand(-0.5, 0.5), rand(-0.5, 0.5)),
        radius: 20,
        color: randColor(),
        speed: 5,
        lifeTime: 0,
        weight: 14,
    }, option);

    // Call Initialize
    init.call(this);
}