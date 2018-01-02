import {Vector2, Button} from '../../lib/Game';

function SinWave(options){
    // Public

    // Private
    var ctx = null,
        ctxWidth  = 0,
        ctxHeight = 0,

        maxDistance = 360,
        minDistance = 0,

        maxLength = 200,
        length = 0,
        lengthStep = 1,

        maxAmplitude = 200,
        amplitude = 0,
        amplitudeStep = 5,

        btn1 = null,
        btn2 = null,
        btn3 = null,

        isLength = false,
        isAmplitude = false,
        isDistance = false;

    function init(){
        if (!this.opt.ctx) throw 'SinWave Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth  = ctx.canvas.clientWidth;

        length = maxLength;
        amplitude = maxAmplitude;

        btn1 = new Button({ctx:ctx, pos: new Vector2(20, 100), bgColor:'#F29B00', text: 'Wavelength'});
        btn2 = new Button({ctx:ctx, pos: new Vector2(20, 140), bgColor:'#F25533', text: 'Amplitude'});
        btn3 = new Button({ctx:ctx, pos: new Vector2(20, 180), bgColor:'#378C3F', text: 'Increase Distance'});
    }

    this.update = () => {
        if( isLength )
            this.waveLength();

        if( isAmplitude )
            this.amplitude();

        if( isDistance ) {
            this.distance(window.min, window.max);
        }
        this.draw();
    };

    this.waveLength = () => {
        if( length <= 20 || length >= maxLength)
            lengthStep *= -1;
        length += lengthStep;
    };

    this.amplitude = () => {
        if( amplitude <= 20 || amplitude >= maxAmplitude)
            amplitudeStep *= -1;
        amplitude += amplitudeStep;
    };

    this.distance = (from, to) => {
        minDistance = from;
        maxDistance = to;
    };

    // Draw Object
    this.draw = () => {
        btn1.draw();
        btn2.draw();
        btn3.draw();

        ctx.save();
        ctx.translate(150, ctxHeight / 2);
        ctx.fillStyle = 'blue';
        for(let i = toRadian(minDistance); i < toRadian( maxDistance ); i += 0.01){
            let x = i * length,
                y = Math.sin(i) * amplitude;

            ctx.fillRect(x, y, 2,2);
        }
        ctx.restore();
    };

    this.click = e => {
        if( btn1.isClick(e) )
            isLength = !isLength;

        if( btn2.isClick(e) )
            isAmplitude = !isAmplitude;

        if( btn3.isClick(e) )
            isDistance = !isDistance;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector2(),
    }, options);
    init.call(this);
}

module.exports = SinWave;