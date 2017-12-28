import Enemy from './classes/Enemy';
import Player from './classes/Player';

function BlockRunner(options) {
    // Private
    var appName = 'BlockRunner',
        errorTitle = '[' + appName + ' - Error]: ';

    var canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        margin = 10,
        bodyArea = 100,
        stage = null,

        player = null,
        enemy  = [],
        enemies = 20;

    // Initialize
    function init() {

        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', () => { resize(area);}, false);
        resize(area);

        player = new Player({
            ctx: ctx,
            stage: stage,
            size: 10
        });
        makeEnemies();
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        player.update();
        for(var i = 0; i < enemy.length; i++ )
            enemy[i].update();
    }

    // resize game area
    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth  = canvas.width  = area.clientWidth;

        stage = {
            l: margin,
            t: bodyArea,
            r: ctxWidth - margin ,
            b: ctxHeight - margin,
        };
        if( player ) player.resizeStage(stage);
        if( enemy ) { makeEnemies(); }
    }

    //Make enemies
    function makeEnemies(){
        enemy = [];
        for( let i = 0; i < enemies; i++)
            enemy.push( new Enemy({
                ctx: ctx,
                stage: stage,
            }));
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
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(
            stage.l + 1,
            stage.b - player.opt.size - 10,
            player.opt.size + 10,
            player.opt.size + 10
        );
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.globalAlpha = 1;

    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#004356',
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = BlockRunner;