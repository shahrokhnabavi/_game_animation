function Ball( option ){
    // Privates
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        gravity   = 0.8,
        createdAt = 0;


    // Initialize
    function init(){
        if ( !this.opt.ctx ) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        this.getActiveArea();

        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        if( this.opt.pos.isEmpty )
            this.opt.pos = new Vector(
                rand(this.opt.radius, ctxWidth - this.opt.radius ),
                rand(this.opt.radius, ctxHeight - this.opt.radius )
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
            r = this.opt.radius;

        if( x < r || x > ctxWidth - r )
            this.opt.velocity.x *= -1;

        if( y < r || y > ctxHeight - r )
            this.opt.velocity.y *= -1;
        else
            this.opt.velocity.y += gravity;

        this.opt.pos.move(this.opt.velocity, this.opt.speed);
        return this;
    };

    this.getActiveArea = () => {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;
    };

    this.getLifeTime = () => {
        if( this.opt.lifeTime === 0 ) return false;
        return parseInt( (new Date().getTime() - createdAt) / 1000)  > this.opt.lifeTime;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        velocity: new Vector(rand(-0.5,0.5), rand(-0.5,0.5)),
        radius: 20,
        color: randColor(),
        speed: 5,
        lifeTime: 0,
    }, option);

    // Call Initialize
    init.call(this);
}