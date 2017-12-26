function BoxCollision(options) {
    // Private
    var appName = 'BoxCollision',
        errorTitle = '[' + appName + ' - Error]: ';

    var canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = new Vector(0, 0),

        box1 = null,
        box2 = null;

    // Initialize
    function init() {

        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('mousemove', getMousePos, false);
        window.addEventListener('resize', () => { resize(area)}, false);
        resize(area);


        box1 = new BoxColli({
            ctx: ctx,
            pos: new Vector(ctxWidth/2 - 50, ctxHeight/2 - 25),
            width: 100,
            height: 50
        });

        box2 = new BoxColli({
            ctx: ctx,
            pos: new Vector(ctxWidth/2 - 25, ctxHeight/2 - 12.5),
            width: 50,
            height: 25,
            color: '#225D71'
        });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        box1.update().draw();
        box2.update(mouse).draw();

        if( box2.collision( box1 ) )
            box1.opt.color = '#ABC9D8';
        else
            box1.opt.color = '#052B3E';
    }

    // resize game area
    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;
    }

    // Get Mouse Position
    function getMousePos(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }


    //How to Use
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#052B3E";
        ctx.fillText("App Name: " + appName, 10, 30);
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#F2F2F2',
    }, options);

    // Call Initialize
    init.call(this);
};