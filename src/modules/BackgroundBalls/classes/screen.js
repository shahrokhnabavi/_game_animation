function Screen( selector, options ){
    this.area   = null;
    this.canvas = null;

    function init(){

        this.area = selector ? document.querySelector(selector) : document.body;
        this.area.innerHTML = '';

        this.canvas = document.createElement('canvas');
        this.canvas.id = this.opt.screenId;
        this.canvas.style.backgroundColor = this.opt.bgColor;
        this.area.appendChild(this.canvas);

        resize.call(this);

        window.addEventListener('resize', () => resize.call(this), false);
    }

    function resize(){
        this.canvas.height = this.area.clientHeight;
        this.canvas.width  = this.area.clientWidth;
    }

    this.opt = Object.assign({
                    screenId: 'screen',
                    bgColor: '#22333B',
               }, options);
    init.call(this);

    return this.canvas;
}

module.exports = Screen;