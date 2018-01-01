/*
Movement(Changing the position)
    Position = A pair of (x, y)
    Velocity = Changing position by time
    Acceleration = Changing velocity by time

 */

import {Game, Vector2} from '../../lib/Game';
import Particle from './classes/Particle';

function CirclePhysics(options) {

    // Private
    var appName = ' CirclePhysics',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = null,

        particlesNumber = 400,
        particles = [],
        overlapRegenerate = 0,
        fadeRange = 100;

    function init(){
        var g = new Game( this.opt );

        ctx       = g.getCtx();
        ctxWidth  = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(2);

        mouse = g.mouse;
        createObjects();
        update();
    }

    // Update animation
    function update(){
        requestAnimationFrame( update );
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        particles.forEach( particle => {
            particle.update(particles, mouse, fadeRange).draw();
        });
        mouseCircle();
    }

    function mouseCircle(){
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, fadeRange, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'rgba(255,249,218,0.1)';
        ctx.stroke();
    }

    function createObjects() {
        particles = [];
        for (var i = 0; i < particlesNumber; i++) {
            let overlap = false,
                r = 10 ,
                particle = new Particle({
                    ctx: ctx,
                    pos: new Vector2(rand(r, ctxWidth - r), rand(r, ctxHeight - r)),
                    radius: r
                });

            for (let obj of particles) {
                if( particle.hasOverlap( obj ) ){
                    overlapRegenerate++;
                    overlap = true;
                    break;
                }
            }

            if( !overlap )
                particles.push( particle );
            else
                i--;
        }
    }

    // Draw User Interface
    function userInterface(){
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    //Get mouse position
    function getMousePos(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    // Resize windows event
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = CirclePhysics;