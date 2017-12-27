function CirclePhysics(options) {
    // Private
    var appName = 'CirclePhysics',
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,

        mouse = new Vector(20,20),

        particlesNumber = 400,
        particles = [],
        overlapRegenerate = 0,
        fadeRange = 100;

    function init(){
        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('mousemove', getMousePos, false);
        window.addEventListener('resize', ()=>{resize(area)}, false);
        resize(area);

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
                    pos: new Vector(rand(r, ctxWidth - r), rand(r, ctxHeight - r)),
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
        ctx.fillText("App Name: " + appName, 10, 30);
    }

    //Get mouse position
    function getMousePos(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    // Resize windows event
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