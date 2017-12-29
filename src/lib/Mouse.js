function Mouse(options) {
    // Public
    this.x = 0;
    this.y = 0;

    // Private
    var mouse = null;

    function init() {
        mouse = this.opt.pos;
        window.addEventListener('mousemove', e => {
            getMousePos.call(this, e);
        }, false);
    }

    // Retrieve mouse position from window
    function getMousePos(e) {
        this.x = mouse.x = e.clientX;
        this.y = mouse.y = e.clientY;

    }

    // return vector
    this.get = () => {
        return mouse;
    };

    this.opt = Object.assign({
        pos: new Vector(0, 0)
    }, options);
    init.call(this);
}

module.exports = Mouse;