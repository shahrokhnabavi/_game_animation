import Mouse from '../../lib/Mouse';
import Player from './classes/Player';

function RotatePlayer(options) {
    // Private
    var appName = 'RotatePlayer',
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = new Mouse(),
        player = null;

    function init(){
        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', ()=>{resize(area);}, false);
        resize(area);

        player = new Player({
            ctx: ctx,
            pos: new Vector(ctxWidth/2,ctxHeight/2),
            velocity: new Vector(0,0),
            radius: 100
        });
        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        player.update(mouse).lookAt( new Vector( 10, 200) );
        // player.draw();
        userInterface();
    }

    // Draw User Interface
    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, 10, 50);
    }

    // Resize windows event
    function resize(area){
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#292C44',
    }, options);

    init.call(this);
}

module.exports = RotatePlayer;