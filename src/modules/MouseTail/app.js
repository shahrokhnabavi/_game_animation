function MouseTail(options) {
    // Private
    var appName = 'Mouse Tail',
        errorTitle = '[' + appName + ' - Error]: ';

    var canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = new Vector(20,20);

    function init(){
        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('mousemove', getMousePos, false);
        window.addEventListener('resize', ()=>{resize(area);}, false);
        resize(area);

        update();
    }

    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
    }

    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, mouse.x, mouse.y);
    }

    function getMousePos(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function resize(area){
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523',
    }, options);

    init.call(this);
}

module.exports = MouseTail;