function Particle(options) {
    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init(options) {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
    }

    // Update object
    this.update = (particles, mouse, fadeRange) => {

        if( mouse ){
            let x1 = this.opt.pos.x,
                y1 = this.opt.pos.y,
                x2 = mouse.x,
                y2 = mouse.y;
            if( Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < fadeRange && this.opt.opacity < 0.5){
                this.opt.opacity += 0.02;
                this.opt.radius += 0.5;
            } else if( this.opt.opacity > 0 ){
                this.opt.opacity -= 0.02;
                this.opt.opacity = Math.max(0, this.opt.opacity);
                this.opt.radius -= 0.5;
            }
        }

        // particles.forEach( function( particle ){
        //     if( this !== particle){
        //         if( this.hasOverlap( particle ) )
        //             console.log("has");
        //     }
        // }.bind(this));

        var dx = Math.abs(this.opt.vel.x),
            dy = Math.abs(this.opt.vel.y),
            x = this.opt.pos.x,
            y = this.opt.pos.y,
            r = this.opt.radius,
            s = this.opt.speed;

        if (x < r + dx * s || x > ctxWidth - r - dx * s)
            this.opt.vel.x *= -1;

        if (y < r + dy * s || y > ctxHeight - r - dy * s)
            this.opt.vel.y *= -1;

        this.opt.pos.move(this.opt.vel, s);
        return this;
    };

    // Draw Object
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
        ctx.save();
        ctx.globalAlpha = this.opt.opacity;
        ctx.fillStyle = this.opt.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.opt.color;
        ctx.stroke();
    };

    this.hasOverlap = particle => {
        var x1 = this.opt.pos.x,
            y1 = this.opt.pos.y,
            x2 = particle.opt.pos.x,
            y2 = particle.opt.pos.y;
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < this.opt.radius + particle.opt.radius;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        vel: new Vector(rand(-20, 20), rand(-20, 20)),
        speed: 0.04,
        radius: 20,
        opacity: 0,
        color: randColor()
    }, options);
    init.call(this);
}

module.exports = Particle;