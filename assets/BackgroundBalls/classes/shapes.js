function Box(ctx, options) {
    this.opt = Object.assign({
            pos: {x: 10, y: 10},
            size: {w: 10, h: 10},
            color: 'blue',
        },
        options
    );

    function init() {
        ctx.fillStyle = this.opt.color;
        ctx.fillRect(
            this.opt.pos.x,
            this.opt.pos.y,
            this.opt.size.w,
            this.opt.size.h
        );
    }

    init.call(this);
}

function Line(ctx) {
    ctx.beginPath();
    ctx.moveTo(10,200);
    ctx.lineTo(50,100);
    ctx.lineTo(120,130);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function Circle(ctx) {
    ctx.beginPath();
    ctx.arc(300,200, 50, 0, Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function Packman(ctx) {
    ctx.beginPath();
    ctx.moveTo(400,200);
    ctx.arc(400,200, 25, Math.PI/8, Math.PI*3/1.61, false);
    ctx.closePath();
    ctx.fillStyle = "#F9DBBD";
    ctx.fill();
    ctx.stroke();
}