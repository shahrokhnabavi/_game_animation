function Ball(options) {
    this.opt = Object.assign({
        app: null,
        pos: {
            x: 10,
            y: 10,
        },
        radius: 20,
        color: '#A53860',
        isRandom: false,
        speed: 5,
    }, options);

    //Private
    var ctx = null,
        velocity = null,
        originalSize = null;

    function init() {
        ctx = this.opt.app.ctx;

        originalSize = this.opt.radius = this.opt.isRandom ? rand(5, 15) : this.opt.radius;

        this.opt.pos.x = this.opt.isRandom ? rand(this.opt.radius, this.opt.app.width - this.opt.radius-12) : this.opt.pos.x;
        this.opt.pos.y = this.opt.isRandom ? rand(this.opt.radius, this.opt.app.height - this.opt.radius-12) : this.opt.pos.y;

        this.opt.speed = this.opt.isRandom ? rand(0.5, 1) : this.opt.speed;
    }

    function normalize(x, y) {
        x = this.opt.isRandom ? rand(-1, 1) : x;
        y = this.opt.isRandom ? rand(-1, 1) : y;
        if (x > y) {
            return {x: 1, y: x ? y / x : 0}
        } else {
            return {x: y ? x / y : 0, y: 1}
        }
    }

    function onMouseArea(pos, mouse, scaleRadius) {
        return pos.x + scaleRadius > mouse.x &&
               pos.x - scaleRadius < mouse.x &&
               pos.y + scaleRadius > mouse.y &&
               pos.y - scaleRadius < mouse.y;
    }

    //Public
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = this.opt.color;
        ctx.fill();
    };

    this.move = (xMove, yMove) => {
        velocity = velocity ? velocity : normalize.call(this, xMove, yMove);

        // this.opt.speed
        if (this.opt.pos.x + velocity.x <= this.opt.radius || this.opt.pos.x + velocity.x > this.opt.app.width - this.opt.radius) {
            velocity.x *= -1;
        }

        if (this.opt.pos.y + velocity.y <= this.opt.radius || this.opt.pos.y + velocity.y > this.opt.app.height - this.opt.radius) {
            velocity.y *= -1;
        }
        this.opt.pos.x += velocity.x * this.opt.speed;
        this.opt.pos.y += velocity.y * this.opt.speed;

        return this;
    };
    
    this.scale = (mouse, scaleRadius) => {
        if( !mouse )
            return this;

        if( onMouseArea(this.opt.pos, mouse, scaleRadius) && this.opt.radius < 50 ){
            this.opt.radius += 1;
        } else if( this.opt.radius > originalSize) {
            this.opt.radius -= 1;
        }

        return this;
    };

    init.call(this);
}