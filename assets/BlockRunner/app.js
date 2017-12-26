var appName = 'BlockRunner',
    errorTitle = '[' + appName + ' - Error]: ';

function BlockRunner(options) {
    // Private
    var area = null,
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        margin = 10,
        bodyArea = 100,
        stage = null,

        player = null;

    // Initialize
    function init() {

        area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        resize();

        // window.addEventListener('click', singleBall);
        window.addEventListener('resize', resize);
        // window.addEventListener('keypress', keyHandler);


        player = new Player({
            ctx: ctx,
            stage: stage,
            size: 10
        });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        player.update();
    }

    // resize game area
    function resize() {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;

        stage = {
            l: margin,
            t: bodyArea,
            r: ctxWidth - margin ,
            b: ctxHeight - margin,
        };
    }

    //How to Use
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, margin, 30);
        // ctx.font = "14px Georgia";
        // ctx.fillText("Click anywhere to create a ball.", margin, 80);

        ctx.beginPath();
        ctx.moveTo(stage.l, stage.t);
        ctx.lineTo(stage.r, stage.t);
        ctx.lineTo(stage.r, stage.b);
        ctx.lineTo(stage.l, stage.b);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#004356',
    }, options);

    // Call Initialize
    init.call(this);
};