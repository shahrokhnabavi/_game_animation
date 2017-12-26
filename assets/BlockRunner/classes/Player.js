function Player(option) {
    // Privates
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    // Initialize
    function init() {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        this.opt.pos.x = this.opt.stage.l + 10;
        this.opt.pos.y = this.opt.stage.b - this.opt.size - 10;

        window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
        window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
    }

    this.update = () => {
        var x = y = 0;

        if (Key.isDown(Key.UP)) y -= 1;
        if (Key.isDown(Key.LEFT)) x -= 1;
        if (Key.isDown(Key.DOWN)) y += 1;
        if (Key.isDown(Key.RIGHT)) x += 1;
        this.move( new Vector(x, y) ).draw();
    };

    // Draw Ball
    this.draw = () => {
        ctx.beginPath();
        ctx.rect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.size,
            this.opt.size,
        );
        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    // Move Ball
    this.move = ( movement) => {
        var x = this.opt.pos.x + (movement.x * this.opt.speed),
            y = this.opt.pos.y + (movement.y * this.opt.speed),
            w = this.opt.size;

        if (x > this.opt.stage.l+1 && x + w < this.opt.stage.r-1)
            this.opt.velocity.x = movement.x;
        else
            this.opt.velocity.x = 0;

        if (y > this.opt.stage.t + 1 && y + w< this.opt.stage.b - 1)
            this.opt.velocity.y = movement.y;
        else
            this.opt.velocity.y = 0;

        this.opt.pos.move(this.opt.velocity, this.opt.speed);
        return this;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(0,0),
        velocity: new Vector(),
        size: 20,
        color: '#FFF9DD',
        speed: 5,
        stage: null
    }, option);

    // Call Initialize
    init.call(this);
}