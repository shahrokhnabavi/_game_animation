function HeavyBall() {
    this.width = 0;
    this.height = 0;
    this.ctx = null;
    this.balls = [];
    this.ballsNumber = 1000;
    this.mouse = null;

    function init() {

        this.area = selector ? document.querySelector(selector) : document.body;
        this.area.innerHTML = '';

        this.canvas = document.createElement('canvas');
        this.canvas.id = this.opt.screenId;
        this.canvas.style.backgroundColor = this.opt.bgColor;
        this.area.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        //
        // genarateBall(canvas);
        // update();
        //
        // window.addEventListener('mousemove', (e) => { this.mouse = {x: e.x, y: e.y}; });
        // window.addEventListener('resize', () => genarateBall(canvas));
    }

    function update() {
        requestAnimationFrame(update);
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let index = 0; index < this.balls.length; index++) {
            this.balls[index].move().scale(this.mouse, 50).draw();
        }
    }
    init.call(this);
};


// this.area   = null;
// this.canvas = null;
//
// function init(){
//
//
//     resize.call(this);
//
//     window.addEventListener('resize', () => resize.call(this), false);
// }
//
// function resize(){
//     this.canvas.height = this.area.clientHeight;
//     this.canvas.width  = this.area.clientWidth;
// }
//
// this.opt = Object.assign({
//     screenId: 'screen',
//     bgColor: '#22333B',
// }, options);