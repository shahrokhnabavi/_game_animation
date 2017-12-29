/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

var _app3 = __webpack_require__(4);

var _app4 = _interopRequireDefault(_app3);

var _app5 = __webpack_require__(6);

var _app6 = _interopRequireDefault(_app5);

var _app7 = __webpack_require__(10);

var _app8 = _interopRequireDefault(_app7);

var _app9 = __webpack_require__(11);

var _app10 = _interopRequireDefault(_app9);

var _app11 = __webpack_require__(13);

var _app12 = _interopRequireDefault(_app11);

var _app13 = __webpack_require__(16);

var _app14 = _interopRequireDefault(_app13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

switch (7) {
    case 7:
        new _app14.default();
        break;
    case 6:
        new _app2.default();
        break;
    case 5:
        new _app6.default();
        break;
    case 4:
        new _app4.default();
        break;
    case 3:
        new _app8.default();
        break;
    case 2:
        new _app10.default();
        break;
    case 1:
        new _app12.default();
        break;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CircleCollision = __webpack_require__(2);

var _CircleCollision2 = _interopRequireDefault(_CircleCollision);

var _BoxCollision = __webpack_require__(3);

var _BoxCollision2 = _interopRequireDefault(_BoxCollision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Collision(options) {
    // Private
    var appName = 'Collision',
        errorTitle = '[' + appName + ' - Error]: ';

    var canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        mouse = new Vector(0, 0),
        obj1 = null,
        obj2 = null;

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
        window.addEventListener('resize', function () {
            return resize(area);
        }, false);
        resize(area);

        // obj1 = new BoxCollision({
        //     ctx: ctx,
        //     pos: new Vector(ctxWidth/2 - 50, ctxHeight/2 - 25),
        //     width: 100,
        //     height: 50
        // });
        obj1 = new _CircleCollision2.default({
            ctx: ctx,
            pos: new Vector(ctxWidth / 2 - 25, ctxHeight / 2 - 25),
            radius: 50
        });

        // obj2 = new BoxCollision({
        //     ctx: ctx,
        //     pos: new Vector(ctxWidth/2 - 25, ctxHeight/2 - 12.5),
        //     width: 50,
        //     height: 25,
        //     color: '#225D71'
        // });
        obj2 = new _CircleCollision2.default({
            ctx: ctx,
            pos: new Vector(ctxWidth / 2 - 12, ctxHeight / 2 - 12),
            radius: 24,
            color: '#225D71'
        });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        obj1.update().draw();
        obj2.update(mouse).draw();

        if (obj2.collision(obj1)) obj1.opt.color = '#ABC9D8';else obj1.opt.color = '#052B3E';
    }

    // resize game area
    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;
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
        bgColor: '#F2F2F2'
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = Collision;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function CircleCollision(options) {
    var _this = this;

    // Private
    var ctx = null;

    function init(options) {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
    }

    this.update = function (mouse) {
        if (mouse) {
            _this.opt.pos.x = mouse.x;
            _this.opt.pos.y = mouse.y;
        }
        return _this;
    };

    this.collision = function (circle) {
        return _this.opt.pos.distance(circle.opt.pos) < _this.opt.radius + circle.opt.radius;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(_this.opt.pos.x, _this.opt.pos.y, _this.opt.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = _this.opt.color;
        ctx.fill();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        color: '#052B3E'
    }, options);
    init.call(this);
}

module.exports = CircleCollision;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function BoxCollision(options) {
    var _this = this;

    // Private
    var ctx = null;

    function init(options) {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
    }

    this.update = function (mouse) {
        if (mouse) {
            _this.opt.pos.x = mouse.x - _this.opt.width / 2;
            _this.opt.pos.y = mouse.y - _this.opt.height / 2;
        }
        return _this;
    };

    this.collision = function (box) {

        var xl1 = _this.opt.pos.x,
            yl1 = _this.opt.pos.y,
            xr1 = _this.opt.pos.x + _this.opt.width,
            yr1 = _this.opt.pos.y + _this.opt.height,
            xl2 = box.opt.pos.x,
            yl2 = box.opt.pos.y,
            xr2 = box.opt.pos.x + box.opt.width,
            yr2 = box.opt.pos.y + box.opt.height;

        if (xl1 > xr2 || xr1 < xl2) return false;

        if (yl1 > yr2 || yr1 < yl2) return false;

        return true;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(_this.opt.pos.x, _this.opt.pos.y, _this.opt.width, _this.opt.height);
        ctx.fillStyle = _this.opt.color;
        ctx.fill();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        width: 20,
        height: 20,
        color: '#052B3E'
    }, options);
    init.call(this);
}

module.exports = BoxCollision;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Ball = __webpack_require__(5);

var _Ball2 = _interopRequireDefault(_Ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeavyBall(options) {
    // Private
    var appName = 'HeavyBall',
        errorTitle = '[' + appName + ' - Error]: ';

    var area = null,
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        balls = [];

    // Initialize
    function init() {

        area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        resize();

        ctx = canvas.getContext('2d');

        window.addEventListener('click', singleBall);
        window.addEventListener('resize', resize);
        window.addEventListener('keyup', keyHandler);

        createBall();
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        help();

        for (var index = 0; index < balls.length; index++) {
            if (balls[index].getLifeTime()) {
                balls.splice(index, 1);
                index--;
                continue;
            }
            balls[index].move().draw();
        }
    }

    // Create new ball
    function createBall() {
        var ball = new _Ball2.default({
            ctx: ctx,
            velocity: new Vector(rand(-2, 2), 0),
            speed: 1,
            lifeTime: 0,
            weight: 1.2,
            radius: rand(8, 20)
        });

        balls.push(ball);
    }

    // resize game area
    function resize() {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;

        balls.forEach(function (item) {
            return item.getActiveArea();
        });
    }

    // resize game area
    function keyHandler(e) {
        switch (e.key) {
            case 'r':
            case 'R':
                for (var i = 0; i < 500; i++) {
                    createBall();
                }
                break;
            case 'c':
            case 'C':
                balls = [];
                break;
            case 'd':
            case 'D':
                var ball = new _Ball2.default({
                    ctx: ctx,
                    velocity: new Vector(rand(-2, 2), rand(-2, 2)),
                    speed: 1,
                    lifeTime: 10,
                    weight: 1.2,
                    radius: rand(8, 20)
                });

                balls.push(ball);
                break;
            case ' ':
                createBall();
                break;
        }
    }

    // create ball in the position of mouse
    function singleBall(e) {
        var ball = new _Ball2.default({
            ctx: ctx,
            velocity: new Vector(rand(-2, 2), rand(-2, 2)),
            pos: new Vector(e.clientX, e.clientY),
            speed: 1,
            lifeTime: 0,
            weight: 1.2,
            radius: rand(8, 20)
        });

        balls.push(ball);
    }

    //How to Use
    function help() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name:" + appName, 10, 50);
        ctx.font = "14px Georgia";
        ctx.fillText("Click anywhere to create a ball.", 10, 80);
        ctx.fillText("Press \'R\' key to generate randomly 500 balls", 10, 96);
        ctx.fillText("Press \'C\' key to clear screen", 10, 112);
        ctx.fillText("Press \'Space\' key to create randomly a ball", 10, 128);
        ctx.fillText("Press \'D\' key to create randomly a ball and automatically destroy", 10, 144);

        ctx.textAlign = 'right';
        ctx.fillText('Number of ball: ' + balls.length, ctxWidth - 10, 50);
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#22333B'
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = HeavyBall;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Ball(option) {
    var _this = this;

    // Privates
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        gravity = 0.5,
        createdAt = 0;

    // Initialize
    function init() {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        this.getActiveArea();

        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty) this.opt.pos = new Vector(rand(this.opt.radius, ctxWidth - this.opt.radius), rand(this.opt.radius, ctxHeight - this.opt.radius));

        createdAt = new Date().getTime();
        this.draw();
    }

    // Draw Ball
    this.draw = function () {

        ctx.beginPath();
        ctx.arc(_this.opt.pos.x, _this.opt.pos.y, _this.opt.radius, 0, Math.PI * 2);
        ctx.closePath();

        ctx.fillStyle = _this.opt.color;
        ctx.fill();
    };

    // Move Ball
    this.move = function () {
        var x = _this.opt.pos.x,
            y = _this.opt.pos.y,
            r = _this.opt.radius,
            friction = (1 / (_this.opt.weight > 15 ? 15 : _this.opt.weight < 1 ? 1 : _this.opt.weight)).toPrecision(2);

        if (x < r || x > ctxWidth - r) _this.opt.velocity.x *= -1;else _this.opt.velocity.x *= 0.995;

        if (y < r || y > ctxHeight - r - _this.opt.velocity.y * _this.opt.speed) {
            _this.opt.velocity.y *= -1 * friction;

            if (Math.abs(_this.opt.velocity.y) < 0.001) {
                _this.opt.pos.y = ctxHeight - r;
                _this.opt.velocity.y = 0;
            }
        } else _this.opt.velocity.y += gravity;

        _this.opt.pos.move(_this.opt.velocity, _this.opt.speed);
        return _this;
    };

    // Set Active Area for Ball
    this.getActiveArea = function () {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
    };

    // Define a Destroy Time
    this.getLifeTime = function () {
        if (_this.opt.lifeTime === 0) return false;
        return parseInt((new Date().getTime() - createdAt) / 1000) > _this.opt.lifeTime;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        velocity: new Vector(rand(-0.5, 0.5), rand(-0.5, 0.5)),
        radius: 20,
        color: randColor(),
        speed: 5,
        lifeTime: 0,
        weight: 14
    }, option);

    // Call Initialize
    init.call(this);
}

module.exports = Ball;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _screen = __webpack_require__(7);

var _screen2 = _interopRequireDefault(_screen);

var _ball = __webpack_require__(8);

var _ball2 = _interopRequireDefault(_ball);

var _shapes = __webpack_require__(9);

var _shapes2 = _interopRequireDefault(_shapes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BackgroundBalls() {
    var ctx = null,
        width = 0,
        height = 0,
        balls = [],
        mouse = null,
        ballsNumber = 1000;

    function init() {
        var canvas = new _screen2.default();
        ctx = canvas.getContext('2d');

        genarateBall(canvas);
        update();

        window.addEventListener('mousemove', function (e) {
            mouse = { x: e.x, y: e.y };
        });
        window.addEventListener('resize', function () {
            return genarateBall(canvas);
        });
    }

    function genarateBall(canvas) {

        width = canvas.width;
        height = canvas.height;

        balls = [];
        for (var index = 0; index < ballsNumber; index++) {
            balls.push(new _ball2.default({
                ctx: ctx,
                isRandom: true,
                color: randColor()
            }));
        }
    }
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, width, height);

        for (var index = 0; index < balls.length; index++) {
            balls[index].move().scale(mouse, 50).draw();
        }
    }

    // Testing to draw some shapes
    function ShapeTest() {
        _shapes2.default.Box(ctx, {
            pos: randPos(0, width - 20, 0, height - 20),
            size: { w: 20, h: 20 },
            color: randColor()
        });
        _shapes2.default.Line(ctx);
        _shapes2.default.Circle(ctx);
        _shapes2.default.Packman(ctx);
    }

    init.call(this);
}

module.exports = BackgroundBalls;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Screen(selector, options) {
    this.area = null;
    this.canvas = null;

    function init() {
        var _this = this;

        this.area = selector ? document.querySelector(selector) : document.body;
        this.area.innerHTML = '';

        this.canvas = document.createElement('canvas');
        this.canvas.id = this.opt.screenId;
        this.canvas.style.backgroundColor = this.opt.bgColor;
        this.area.appendChild(this.canvas);

        resize.call(this);

        window.addEventListener('resize', function () {
            return resize.call(_this);
        }, false);
    }

    function resize() {
        this.canvas.height = this.area.clientHeight;
        this.canvas.width = this.area.clientWidth;
    }

    this.opt = Object.assign({
        screenId: 'screen',
        bgColor: '#22333B'
    }, options);
    init.call(this);

    return this.canvas;
}

module.exports = Screen;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Ball(options) {
    var _this = this;

    this.opt = Object.assign({
        ctx: null,
        pos: {
            x: 10,
            y: 10
        },
        radius: 20,
        color: '#A53860',
        isRandom: false,
        speed: 5
    }, options);

    //Private
    var ctx = null,
        velocity = null,
        originalSize = null;

    function init() {
        ctx = this.opt.ctx;

        originalSize = this.opt.radius = this.opt.isRandom ? rand(5, 15) : this.opt.radius;

        this.opt.pos.x = this.opt.isRandom ? rand(this.opt.radius, this.opt.ctx.canvas.width - this.opt.radius - 12) : this.opt.pos.x;
        this.opt.pos.y = this.opt.isRandom ? rand(this.opt.radius, this.opt.ctx.canvas.height - this.opt.radius - 12) : this.opt.pos.y;

        this.opt.speed = this.opt.isRandom ? rand(0.5, 1) : this.opt.speed;
    }

    function normalize(x, y) {
        x = this.opt.isRandom ? rand(-1, 1) : x;
        y = this.opt.isRandom ? rand(-1, 1) : y;
        if (x > y) {
            return { x: 1, y: x ? y / x : 0 };
        } else {
            return { x: y ? x / y : 0, y: 1 };
        }
    }

    function onMouseArea(pos, mouse, scaleRadius) {
        return pos.x + scaleRadius > mouse.x && pos.x - scaleRadius < mouse.x && pos.y + scaleRadius > mouse.y && pos.y - scaleRadius < mouse.y;
    }

    //Public
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(_this.opt.pos.x, _this.opt.pos.y, _this.opt.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = _this.opt.color;
        ctx.fill();
    };

    this.move = function (xMove, yMove) {
        velocity = velocity ? velocity : normalize.call(_this, xMove, yMove);

        // this.opt.speed
        if (_this.opt.pos.x + velocity.x <= _this.opt.radius || _this.opt.pos.x + velocity.x > _this.opt.ctx.canvas.width - _this.opt.radius) {
            velocity.x *= -1;
        }

        if (_this.opt.pos.y + velocity.y <= _this.opt.radius || _this.opt.pos.y + velocity.y > _this.opt.ctx.canvas.height - _this.opt.radius) {
            velocity.y *= -1;
        }
        _this.opt.pos.x += velocity.x * _this.opt.speed;
        _this.opt.pos.y += velocity.y * _this.opt.speed;

        return _this;
    };

    this.scale = function (mouse, scaleRadius) {
        if (!mouse) return _this;

        if (onMouseArea(_this.opt.pos, mouse, scaleRadius) && _this.opt.radius < 50) {
            _this.opt.radius += 1;
        } else if (_this.opt.radius > originalSize) {
            _this.opt.radius -= 1;
        }

        return _this;
    };

    init.call(this);
}

module.exports = Ball;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.Box = function (ctx, options) {
    undefined.opt = Object.assign({
        pos: { x: 10, y: 10 },
        size: { w: 10, h: 10 },
        color: 'blue'
    }, options);

    function init() {
        ctx.fillStyle = this.opt.color;
        ctx.fillRect(this.opt.pos.x, this.opt.pos.y, this.opt.size.w, this.opt.size.h);
    }

    init.call(undefined);
};

module.exports.Line = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(10, 200);
    ctx.lineTo(50, 100);
    ctx.lineTo(120, 130);
    ctx.strokeStyle = 'white';
    ctx.stroke();
};

module.exports.Circle = function (ctx) {
    ctx.beginPath();
    ctx.arc(300, 200, 50, 0, Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
};

module.exports.Packman = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(400, 200);
    ctx.arc(400, 200, 25, Math.PI / 8, Math.PI * 3 / 1.61, false);
    ctx.closePath();
    ctx.fillStyle = "#F9DBBD";
    ctx.fill();
    ctx.stroke();
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function MouseTail(options) {
    // Private
    var appName = 'Mouse Tail',
        errorTitle = '[' + appName + ' - Error]: ';

    var canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        mouse = new Vector(20, 20);

    function init() {
        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('mousemove', getMousePos, false);
        window.addEventListener('resize', function () {
            resize(area);
        }, false);
        resize(area);

        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
    }

    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, mouse.x, mouse.y);
    }

    function getMousePos(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523'
    }, options);

    init.call(this);
}

module.exports = MouseTail;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Particle = __webpack_require__(12);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CirclePhysics(options) {
    // Private
    var appName = 'CirclePhysics',
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        mouse = new Vector(20, 20),
        particlesNumber = 400,
        particles = [],
        overlapRegenerate = 0,
        fadeRange = 100;

    function init() {
        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('mousemove', getMousePos, false);
        window.addEventListener('resize', function () {
            resize(area);
        }, false);
        resize(area);

        createObjects();
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        particles.forEach(function (particle) {
            particle.update(particles, mouse, fadeRange).draw();
        });
        mouseCircle();
    }

    function mouseCircle() {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, fadeRange, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'rgba(255,249,218,0.1)';
        ctx.stroke();
    }

    function createObjects() {
        particles = [];
        for (var i = 0; i < particlesNumber; i++) {
            var overlap = false,
                r = 10,
                particle = new _Particle2.default({
                ctx: ctx,
                pos: new Vector(rand(r, ctxWidth - r), rand(r, ctxHeight - r)),
                radius: r
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var obj = _step.value;

                    if (particle.hasOverlap(obj)) {
                        overlapRegenerate++;
                        overlap = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (!overlap) particles.push(particle);else i--;
        }
    }

    // Draw User Interface
    function userInterface() {
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
    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523'
    }, options);

    init.call(this);
}

module.exports = CirclePhysics;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Particle(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init(options) {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
    }

    // Update object
    this.update = function (particles, mouse, fadeRange) {

        if (mouse) {
            var x1 = _this.opt.pos.x,
                y1 = _this.opt.pos.y,
                x2 = mouse.x,
                y2 = mouse.y;
            if (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < fadeRange && _this.opt.opacity < 0.5) {
                _this.opt.opacity += 0.02;
                _this.opt.radius += 0.5;
            } else if (_this.opt.opacity > 0) {
                _this.opt.opacity -= 0.02;
                _this.opt.opacity = Math.max(0, _this.opt.opacity);
                _this.opt.radius -= 0.5;
            }
        }

        // particles.forEach( function( particle ){
        //     if( this !== particle){
        //         if( this.hasOverlap( particle ) )
        //             console.log("has");
        //     }
        // }.bind(this));

        var dx = Math.abs(_this.opt.vel.x),
            dy = Math.abs(_this.opt.vel.y),
            x = _this.opt.pos.x,
            y = _this.opt.pos.y,
            r = _this.opt.radius,
            s = _this.opt.speed;

        if (x < r + dx * s || x > ctxWidth - r - dx * s) _this.opt.vel.x *= -1;

        if (y < r + dy * s || y > ctxHeight - r - dy * s) _this.opt.vel.y *= -1;

        _this.opt.pos.move(_this.opt.vel, s);
        return _this;
    };

    // Draw Object
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(_this.opt.pos.x, _this.opt.pos.y, _this.opt.radius, 0, Math.PI * 2, false);
        ctx.save();
        ctx.globalAlpha = _this.opt.opacity;
        ctx.fillStyle = _this.opt.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = _this.opt.color;
        ctx.stroke();
    };

    this.hasOverlap = function (particle) {
        var x1 = _this.opt.pos.x,
            y1 = _this.opt.pos.y,
            x2 = particle.opt.pos.x,
            y2 = particle.opt.pos.y;
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < _this.opt.radius + particle.opt.radius;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        vel: new Vector(rand(-20, 20), rand(-20, 20)),
        speed: 0.04,
        radius: 20,
        opacity: 0,
        color: randColor()
    }, options);
    init.call(this);
}

module.exports = Particle;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Enemy = __webpack_require__(14);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _Player = __webpack_require__(15);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        enemy = [],
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

        window.addEventListener('resize', function () {
            resize(area);
        }, false);
        resize(area);

        player = new _Player2.default({
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
        for (var i = 0; i < enemy.length; i++) {
            enemy[i].update();
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
            b: ctxHeight - margin
        };
        if (player) player.resizeStage(stage);
        if (enemy) {
            makeEnemies();
        }
    }

    //Make enemies
    function makeEnemies() {
        enemy = [];
        for (var i = 0; i < enemies; i++) {
            enemy.push(new _Enemy2.default({
                ctx: ctx,
                stage: stage
            }));
        }
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
        ctx.rect(stage.l + 1, stage.b - player.opt.size - 10, player.opt.size + 10, player.opt.size + 10);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#004356'
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = BlockRunner;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Enemy(option) {
    var _this = this;

    //Public

    //Private
    var speed = 3,
        ctx = null,
        ctxHeight = 0,
        ctxWidth = 0;

    // Init function
    function init() {
        ctx = this.opt.ctx;
        this.resizeStage(this.opt.stage);

        if (this.opt.pos.isEmpty) this.opt.pos = new Vector(rand(this.opt.stage.l, this.opt.stage.r - this.opt.size), rand(this.opt.stage.t, this.opt.stage.b - this.opt.size));
    }

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(_this.opt.pos.x, _this.opt.pos.y, _this.opt.size, _this.opt.size);
        ctx.fillStyle = _this.opt.color;
        ctx.fill();
    };

    this.update = function () {
        _this.draw();
    };

    this.resizeStage = function (stage) {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        _this.opt.stage = stage;
    };

    // Default options
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        color: 'red',
        stage: null,
        size: 20
    }, option);
    init.call(this);
}

module.exports = Enemy;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Player(option) {
    var _this = this;

    // Privates
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    // Initialize
    function init() {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        this.resizeStage(this.opt.stage);

        this.opt.pos.x = this.opt.stage.l + 1;
        this.opt.pos.y = this.opt.stage.b - this.opt.size - 1;

        window.addEventListener('keyup', function (event) {
            Key.onKeyup(event);
        }, false);
        window.addEventListener('keydown', function (event) {
            Key.onKeydown(event);
        }, false);
    }

    this.update = function () {
        var x = 0,
            y = 0;

        if (Key.isDown(Key.UP)) y -= 1;
        if (Key.isDown(Key.LEFT)) x -= 1;
        if (Key.isDown(Key.DOWN)) y += 1;
        if (Key.isDown(Key.RIGHT)) x += 1;
        _this.move(new Vector(x, y)).draw();
    };

    // Draw Ball
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(_this.opt.pos.x, _this.opt.pos.y, _this.opt.size, _this.opt.size);
        ctx.fillStyle = _this.opt.color;
        ctx.fill();
    };

    // Move Ball
    this.move = function (movement) {
        var x = _this.opt.pos.x + movement.x * _this.opt.speed,
            y = _this.opt.pos.y + movement.y * _this.opt.speed,
            w = _this.opt.size;

        if (x > _this.opt.stage.l + 2 && x + w < _this.opt.stage.r - 1) _this.opt.velocity.x = movement.x;else {
            _this.opt.velocity.x = 0;
            _this.opt.pos.x = x < ctxWidth / 2 ? _this.opt.stage.l + 1 : _this.opt.stage.r - w - 1;
        }

        if (y > _this.opt.stage.t + 1 && y + w < _this.opt.stage.b - 1) _this.opt.velocity.y = movement.y;else {
            _this.opt.velocity.y = 0;
            _this.opt.pos.y = y < ctxHeight / 2 ? _this.opt.stage.t + 1 : _this.opt.stage.b - w - 1;
        }

        _this.opt.pos.move(_this.opt.velocity, _this.opt.speed);
        return _this;
    };

    this.resizeStage = function (stage) {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        _this.opt.stage = stage;
    };

    // Default options od class
    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(0, 0),
        velocity: new Vector(),
        size: 20,
        color: '#FFF9DD',
        speed: 5,
        stage: null
    }, option);

    // Call Initialize
    init.call(this);
}

module.exports = Player;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Mouse = __webpack_require__(18);

var _Mouse2 = _interopRequireDefault(_Mouse);

var _Player = __webpack_require__(22);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RotatePlayer(options) {
    // Private
    var appName = 'RotatePlayer',
        canvas = null,
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        mouse = new _Mouse2.default(),
        player = null;

    function init() {
        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', function () {
            resize(area);
        }, false);
        resize(area);

        player = new _Player2.default({
            ctx: ctx,
            pos: new Vector(ctxWidth / 2, ctxHeight / 2),
            velocity: new Vector(0, 0),
            radius: 100
        });
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        player.update(mouse).lookAt(new Vector(10, 200));
        // player.draw();
        userInterface();
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, 10, 50);
    }

    // Resize windows event
    function resize(area) {
        ctxHeight = canvas.height = area.clientHeight;
        ctxWidth = canvas.width = area.clientWidth;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#292C44'
    }, options);

    init.call(this);
}

module.exports = RotatePlayer;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Mouse(options) {
    // Public
    this.x = 0;
    this.y = 0;

    // Private
    var mouse = null;

    function init() {
        var _this = this;

        mouse = this.opt.pos;
        window.addEventListener('mousemove', function (e) {
            getMousePos.call(_this, e);
        }, false);
    }

    // Retrieve mouse position from window
    function getMousePos(e) {
        this.x = mouse.x = e.clientX;
        this.y = mouse.y = e.clientY;
    }

    // return vector
    this.get = function () {
        return mouse;
    };

    this.opt = Object.assign({
        pos: new Vector(0, 0)
    }, options);
    init.call(this);
}

module.exports = Mouse;

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Circle = __webpack_require__(21);

var _Circle2 = _interopRequireDefault(_Circle);

var _Line = __webpack_require__(23);

var _Line2 = _interopRequireDefault(_Line);

var _Rectangle = __webpack_require__(24);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Shapes(type, options) {
    switch (type) {
        case 'circle':
            return new _Circle2.default(options);
        case 'line':
            return new _Line2.default(options);
        case 'rect':
            return new _Rectangle2.default(options);
        default:
            throw 'Undefined Shape type.';
    }
}

module.exports = Shapes;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Circle(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init(options) {
        if (!this.opt.ctx) throw 'Circle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new Vector(ctxWidth / 2, ctxHeight / 2);
        }
    }

    // Update object
    this.update = function (mouse) {
        if (mouse) {
            _this.opt.pos.x = mouse.x;
            _this.opt.pos.y = mouse.y;
        }
        return _this;
    };

    // Draw Object
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(_this.opt.pos.x, _this.opt.pos.y, _this.opt.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = _this.opt.bgColor;
        ctx.fill();

        if (_this.opt.brColor !== null) {
            ctx.strokeStyle = _this.opt.brColor;
            ctx.stroke();
        }
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        bgColor: '#052B3E',
        brColor: null
    }, options);
    init.call(this);
}

module.exports = Circle;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Shapes = __webpack_require__(20);

var _Shapes2 = _interopRequireDefault(_Shapes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Player(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        objBox = null,
        objCircle = null,
        objLine = null,
        mouse = null;

    function init() {
        if (!this.opt.ctx) throw 'Object needs Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        // Objects
        objCircle = (0, _Shapes2.default)('circle', {
            ctx: ctx,
            pos: new Vector(0, 0),
            radius: this.opt.radius,
            bgColor: this.opt.color
        });
        objLine = (0, _Shapes2.default)('line', {
            ctx: ctx,
            thickness: 5,
            from: new Vector(0, 0),
            to: new Vector(this.opt.radius + 10, 0)
        });
        objBox = (0, _Shapes2.default)('rect', {
            ctx: ctx,
            pos: new Vector(2, 3),
            bgColor: '#4F80E1',
            size: { w: 30, h: 50 }
        });
    }

    // Update object
    this.update = function (mPos) {
        if (mPos) {
            mouse = mPos;
        }

        return _this;
    };

    // Draw Object
    this.draw = function () {
        objCircle.draw();
        objLine.draw();
        objBox.draw();
    };

    this.lookAt = function (point) {
        var y = _this.opt.pos.y,
            x = _this.opt.pos.x;

        // 1 degree = 1 * Math.PI/180
        ctx.save();
        ctx.translate(x, y);

        var arcTan = Math.atan2(mouse.y - y, mouse.x - x);
        ctx.rotate(arcTan);

        _this.draw();
        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        radius: 20,
        color: '#FF5349'
    }, options);
    init.call(this);
}

module.exports = Player;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Line(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init() {
        if (!this.opt.ctx) throw 'Line Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.from.isEmpty) {
            this.opt.from = new Vector(ctxWidth / 2 - 5, ctxHeight / 2);
        }

        if (this.opt.to.isEmpty) {
            this.opt.to = new Vector(ctxWidth / 2 + 5, ctxHeight / 2);
        }
    }

    // Update object
    this.update = function () {
        return _this;
    };

    // Draw Object
    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(_this.opt.from.x, _this.opt.from.y);
        ctx.lineTo(_this.opt.to.x, _this.opt.to.y);
        ctx.lineWidth = _this.opt.thickness;
        ctx.strokeStyle = _this.opt.color;
        ctx.stroke();
    };

    this.opt = Object.assign({
        ctx: null,
        from: new Vector(0, 0),
        to: new Vector(),
        thickness: 1,
        color: '#F0F0F1'
    }, options);
    init.call(this);
}

module.exports = Line;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Rectangle(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init() {
        if (!this.opt.ctx) throw 'Rectangle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new Vector(ctxWidth / 2, ctxHeight / 2);
        }

        if (this.opt.size === null) this.opt.size = { w: 10, h: 10 };
    }

    // Update object
    this.update = function (mouse) {
        if (mouse) {
            _this.opt.pos.x = mouse.x;
            _this.opt.pos.y = mouse.y;
        }
        return _this;
    };

    // Draw Object
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(_this.opt.pos.x, _this.opt.pos.y, _this.opt.size.w, _this.opt.size.h);
        ctx.fillStyle = _this.opt.bgColor;
        ctx.fill();

        if (_this.opt.brColor !== null) {
            ctx.strokeStyle = _this.opt.brColor;
            ctx.stroke();
        }
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new Vector(),
        size: null,
        bgColor: '#052B3E',
        brColor: null
    }, options);
    init.call(this);
}

module.exports = Rectangle;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map