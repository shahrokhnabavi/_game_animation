import Enemy from './classes/Enemy';
import Player from './classes/Player';
import Shapes from '../../lib/Shapes';

function BlockRunner(options) {
    // Private
    var appName = 'BlockRunner',
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        margin = 10,
        bodyArea = 100,
        playerSize = 10,
        playerHomeSize = 30,
        stage = null,

        player = null,
        enemies = [],
        enemyCount = 20,

        gamePanel = null,
        playerHome = null;

    // Initialize
    function init() {

        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', () => {
            resize(area);
        }, false);
        resize(area);

        allGamesMenu(1);


        player = new Player({
            ctx: ctx,
            stage: stage,
            size: playerSize,
            life: 500
        });

        gamePanel = Shapes('rect', {
            ctx: ctx,
            bgColor: '#152C35',
            brColor: 'white',
            pos: new Vector(stage.l, stage.t),
            size: {w: stage.r - stage.l, h: stage.b - stage.t}
        });

        playerHome = Shapes('rect', {
            ctx: ctx,
            bgColor: '#152C35',
            brColor: '#03BF94',
            pos: new Vector(stage.l , stage.b - playerHomeSize),
            size: {w: playerHomeSize, h: playerHomeSize}
        });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        if( player.life > 0 ) {
            player.update();
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].update(player);
                if (enemies[i].isExplode) {
                    enemies.splice(i, 1);
                    player.damage(rand(5, 32));
                }
            }

            if (enemies.length === 0) {
                makeEnemies();
            }
        } else {
            gameOver();
        }
    }

    // resize game area
    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;

        stage = {
            l: margin,
            t: bodyArea,
            r: ctxWidth - margin,
            b: ctxHeight - margin,
        };
        if (player) player.resizeStage(stage);
        if (enemies) {
            makeEnemies();
        }
    }

    //Make enemies
    function makeEnemies() {
        enemies = [];
        for (let i = 0; i < enemyCount; i++) {
            let enemy = new Enemy({
                ctx: ctx,
                stage: stage,
                playerHomeSize: playerHomeSize
            });

            if (enemy.isInPlayerHome() || enemy.isIntersection(enemies)) {
                i--;
                continue;
            }
            enemies.push(enemy);
        }
    }

    //How to Use
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, margin, 30);
        ctx.font = "16px Georgia";
        ctx.textAlign = 'right';
        ctx.fillText("Player life: " + player.life, stage.r, 30);

        gamePanel.opt.size = {w: stage.r - stage.l, h: stage.b - stage.t};
        gamePanel.draw();
        playerHome.opt.pos = new Vector(stage.l + 1, stage.b - playerHomeSize - 1);
        playerHome.draw();
    }

    function gameOver() {
        Shapes('rect', {
            ctx: ctx,
            pos: new Vector(0,0),
            size: {w:ctxWidth , h:ctxHeight},
            alpha: 0.5,
            bgColor: 'black'
        }).draw();

        ctx.font = "72px Georgia";
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", ctxWidth/2, ctxHeight/2);
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#113E52',
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = BlockRunner;