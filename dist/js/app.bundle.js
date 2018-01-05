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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Shapes = __webpack_require__(1);

module.exports.Game = function (options) {
    var _this2 = this;

    // Public
    this.input = null;
    this.mouse = null;

    // Private
    var ctx = null;

    function init() {
        var _this = this;

        var area = document.querySelector(this.opt.selector);
        area.innerHTML = '';

        var canvas = document.createElement('canvas');
        canvas.id = this.opt.id;
        canvas.style.backgroundColor = this.opt.bgColor;
        area.appendChild(canvas);
        ctx = canvas.getContext('2d');

        if (typeof this.opt.cfClick === 'function') window.addEventListener('click', this.opt.cfClick);

        window.addEventListener('resize', function () {
            _this.resize(area);
        }, false);
        this.resize(area);

        this.input = new Input();
        this.mouse = new Mouse();
    }

    this.getCtx = function () {
        return ctx;
    };

    // Resize windows event
    this.resize = function (area) {
        ctx.canvas.height = area.clientHeight;
        ctx.canvas.width = area.clientWidth;

        if (typeof _this2.opt.cfResize === 'function') _this2.opt.cfResize(ctx);
    };

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#152523',
        cfResize: null,
        cfClick: null
    }, options);
    init.call(this);
};

//+++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
function Mouse(options) {
    // Public
    this.x = 0;
    this.y = 0;

    // Private
    var mouse = null;

    function init() {
        var _this3 = this;

        mouse = this.opt.pos;
        window.addEventListener('mousemove', function (e) {
            getMousePos.call(_this3, e);
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
        pos: new Vector2(0, 0)
    }, options);
    init.call(this);
};

//+++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
var Vector2 = function Vector2(x, y) {
    var _this4 = this;

    this.normal = function (multi) {
        var x = Math.abs(_this4.x),
            y = Math.abs(_this4.y);

        if (x > y) {
            y = y / x;
            x = 1;
        } else if (x < y) {
            x = x / y;
            y = 1;
        } else x = y = 1;

        // x += multi;
        // y += multi;

        x = _this4.x < 0 ? x * -1 : x;
        y = _this4.y < 0 ? y * -1 : y;

        return new Vector2(x, y);
    };

    this.move = function (velocity, speed) {
        if ((typeof velocity === 'undefined' ? 'undefined' : _typeof(velocity)) !== 'object') throw 'Invalid Parameter';
        speed = speed ? speed : 1;
        _this4.x += velocity.x * speed;
        _this4.y += velocity.y * speed;
    };

    this.distance = function (point) {
        if (!point) return Math.sqrt(Math.pow(_this4.x, 2) + Math.pow(_this4.y, 2));
        return Math.sqrt(Math.pow(_this4.x - point.x, 2) + Math.pow(_this4.y - point.y, 2));
    };

    this.isEmpty = typeof x == 'undefined' || typeof y == 'undefined';

    this.x = x;
    this.y = y;
};
module.exports.Vector2 = Vector2;

//+++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
function Input() {

    var _pressed = {};

    this.isDown = function (keyCode) {
        return _pressed[keyCode];
    };

    function onKeydown(event) {
        // console.log(event.code);
        _pressed[event.code] = true;
    }

    function onKeyup(event) {
        delete _pressed[event.code];
    }

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('keyup', onKeyup);
}

//+++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++


function Button(options) {
    var _this5 = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        obj = null;

    function init() {
        if (!this.opt.ctx) throw 'Button Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        obj = new _Shapes.Rectangle({
            ctx: ctx,
            size: {
                w: this.opt.size.x,
                h: this.opt.size.y
            },
            pivot: this.opt.pos,
            bgColor: this.opt.bgColor,
            txtColor: this.opt.txtColor
        });
    }

    // Update object
    this.update = function () {
        _this5.draw();
    };

    this.isClick = function (e) {
        var x = e.clientX,
            y = e.clientY;

        return x > _this5.opt.pos.x && x < _this5.opt.pos.x + _this5.opt.size.x && y > _this5.opt.pos.y && y < _this5.opt.pos.y + _this5.opt.size.y;
    };

    // Draw Object
    this.draw = function () {
        var w = obj.opt.size.w,
            h = obj.opt.size.h,
            x = obj.opt.pivot.x,
            y = obj.opt.pivot.y,
            fSize = _this5.opt.fontSize;
        ctx.beginPath();
        ctx.font = fSize + 'px Arial';

        var ts = ctx.measureText(_this5.opt.text).width;
        obj.opt.size.w = ts + 20;
        obj.draw();

        ctx.textAlign = 'center';
        ctx.fillStyle = _this5.opt.txtColor;
        ctx.fillText(_this5.opt.text, x + w / 2, y + (fSize / 2 - 2) + h / 2);
        ctx.closePath();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        size: new Vector2(80, 30),
        bgColor: 'red',
        txtColor: 'white',
        text: 'Click Me',
        fontSize: 14,
        mouse: null
    }, options);
    init.call(this);
};
module.exports.Button = Button;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

function faceVector(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 0);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

module.exports.Rectangle = function (options) {
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

        if (this.opt.size === null) this.opt.size = { w: 10, h: 10 };
    }

    // Draw Object
    this.draw = function () {
        var thisX = _this.opt.pivot.x,
            thisY = _this.opt.pivot.y;

        ctx.beginPath();
        ctx.rect(thisX, thisY, _this.opt.size.w, _this.opt.size.h);

        if (_this.opt.bgColor !== null) {
            ctx.fillStyle = _this.opt.bgColor;

            var orgAlpha = ctx.globalAlpha;
            if (_this.opt.alpha !== null) ctx.globalAlpha = _this.opt.alpha;
            ctx.fill();
            ctx.globalAlpha = orgAlpha;
        }

        if (_this.opt.brColor !== null) {
            ctx.strokeStyle = _this.opt.brColor;
            ctx.stroke();
        }

        if (_this.opt.showDirection) {
            faceVector(ctx);
        }
    };

    this.opt = Object.assign({
        ctx: null,
        size: null,
        bgColor: '#052B3E',
        brColor: null,
        alpha: null,
        pivot: new _Game.Vector2(0, 0),
        showDirection: false
    }, options);
    init.call(this);
};

// #######################################
module.exports.Circle = function (options) {
    var _this2 = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0;

    function init(options) {
        if (!this.opt.ctx) throw 'Circle Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
    }

    // Draw Object
    this.draw = function () {
        var thisX = _this2.opt.pivot.x,
            thisY = _this2.opt.pivot.y;

        ctx.beginPath();
        ctx.arc(thisX, thisY, _this2.opt.radius, 0, Math.PI * 2, false);
        if (_this2.opt.bgColor !== null) {
            ctx.fillStyle = _this2.opt.bgColor;
            ctx.fill();
        }

        if (_this2.opt.brColor !== null) {
            ctx.strokeStyle = _this2.opt.brColor;
            ctx.stroke();
        }

        if (_this2.opt.showDirection) {
            faceVector(ctx);
        }
    };

    this.opt = Object.assign({
        ctx: null,
        radius: 20,
        bgColor: '#052B3E',
        brColor: null,
        pivot: new _Game.Vector2(0, 0),
        showDirection: false
    }, options);
    init.call(this);
};

// #########################
module.exports.Line = function (options) {
    var _this3 = this;

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
            this.opt.from = new _Game.Vector2(ctxWidth / 2 - 5, ctxHeight / 2);
        }

        if (this.opt.to.isEmpty) {
            this.opt.to = new _Game.Vector2(ctxWidth / 2 + 5, ctxHeight / 2);
        }
    }

    // Update object
    this.update = function () {
        return _this3;
    };

    // Draw Object
    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(_this3.opt.from.x, _this3.opt.from.y);
        ctx.lineTo(_this3.opt.to.x, _this3.opt.to.y);
        ctx.lineWidth = _this3.opt.thickness;
        ctx.strokeStyle = _this3.opt.color;
        ctx.stroke();
    };

    this.opt = Object.assign({
        ctx: null,
        from: new _Game.Vector2(0, 0),
        to: new _Game.Vector2(),
        thickness: 1,
        color: '#F0F0F1'
    }, options);
    init.call(this);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

var _app3 = __webpack_require__(6);

var _app4 = _interopRequireDefault(_app3);

var _app5 = __webpack_require__(8);

var _app6 = _interopRequireDefault(_app5);

var _app7 = __webpack_require__(12);

var _app8 = _interopRequireDefault(_app7);

var _app9 = __webpack_require__(13);

var _app10 = _interopRequireDefault(_app9);

var _app11 = __webpack_require__(15);

var _app12 = _interopRequireDefault(_app11);

var _app13 = __webpack_require__(18);

var _app14 = _interopRequireDefault(_app13);

var _app15 = __webpack_require__(20);

var _app16 = _interopRequireDefault(_app15);

var _app17 = __webpack_require__(23);

var _app18 = _interopRequireDefault(_app17);

var _app19 = __webpack_require__(25);

var _app20 = _interopRequireDefault(_app19);

var _app21 = __webpack_require__(29);

var _app22 = _interopRequireDefault(_app21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.loadGame = function (idx) {
    switch (idx) {
        case 12:
            new _app22.default();
            break;
        case 11:
            console.log("Clock");
            break;
        case 10:
            new _app20.default();
            break;
        case 9:
            new _app18.default();
            break;
        case 8:
            new _app16.default();
            break;
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
};
loadGame(12);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CircleCollision = __webpack_require__(4);

var _CircleCollision2 = _interopRequireDefault(_CircleCollision);

var _BoxCollision = __webpack_require__(5);

var _BoxCollision2 = _interopRequireDefault(_BoxCollision);

var _Game = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Collision(options) {
    // Private
    var appName = 'Collision';

    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        obj1 = null,
        obj2 = null;

    // Initialize
    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(6);

        obj1 = new _BoxCollision2.default({
            ctx: ctx,
            pos: new _Game.Vector2(ctxWidth / 2 - 50, ctxHeight / 2 - 25),
            width: 100,
            height: 50
        });

        obj2 = new _BoxCollision2.default({
            ctx: ctx,
            pos: new _Game.Vector2(ctxWidth / 2 - 25, ctxHeight / 2 - 12.5),
            width: 50,
            height: 25,
            color: '#225D71',
            mouse: g.mouse
        });

        // obj1 = new CircleCollision({
        //     ctx: ctx,
        //     pos: new Vector2(ctxWidth/2 - 255, ctxHeight/2 - 25),
        //     radius: 50,
        // });
        // obj2 = new CircleCollision({
        //     ctx: ctx,
        //     pos: new Vector2(ctxWidth/2 - 12, ctxHeight/2 - 12),
        //     radius: 24,
        //     color: '#225D71',
        //     mouse: g.mouse
        // });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        obj1.update().draw();
        obj2.update().draw();

        if (obj2.collision(obj1)) obj1.opt.color = '#ABC9D8';else obj1.opt.color = '#052B3E';
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }

    //How to Use
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#052B3E";
        ctx.fillText("App Name: " + appName, 20, 30);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Shapes = __webpack_require__(1);

function CircleCollision(options) {
    var _this = this;

    // Private
    var ctx = null,
        obj = null;

    function init(options) {
        if (!this.opt.ctx) throw 'Object needs Context';

        ctx = this.opt.ctx;
        obj = new _Shapes.Circle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            radius: this.opt.radius
        });
    }

    this.update = function () {
        if (_this.opt.mouse) {
            _this.opt.pos.x = _this.opt.mouse.x;
            _this.opt.pos.y = _this.opt.mouse.y;
        }
        return _this;
    };

    this.collision = function (circle) {
        console.log(_this.opt.pos.distance(circle.opt.pos), _this.opt.radius + circle.opt.radius);
        return _this.opt.pos.distance(circle.opt.pos) < _this.opt.radius + circle.opt.radius;
    };

    this.draw = function () {
        obj.opt.bgColor = _this.opt.color;
        obj.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        radius: 20,
        color: '#052B3E',
        mouse: null
    }, options);
    init.call(this);
}

module.exports = CircleCollision;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Shapes = __webpack_require__(1);

function BoxCollision(options) {
    var _this = this;

    // Private
    var ctx = null,
        obj = null;

    function init(options) {
        if (!this.opt.ctx) throw errorTitle + 'Object needs Context';

        ctx = this.opt.ctx;

        obj = new _Shapes.Rectangle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            size: { w: this.opt.width, h: this.opt.height }
        });
    }

    this.update = function () {
        if (_this.opt.mouse) {
            _this.opt.pos.x = _this.opt.mouse.x - _this.opt.width / 2;
            _this.opt.pos.y = _this.opt.mouse.y - _this.opt.height / 2;
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
        obj.opt.bgColor = _this.opt.color;
        obj.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        width: 20,
        height: 20,
        color: '#052B3E',
        mouse: null
    }, options);
    init.call(this);
}

module.exports = BoxCollision;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Ball = __webpack_require__(7);

var _Ball2 = _interopRequireDefault(_Ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeavyBall(options) {
    // Private
    var appName = 'HeavyBall',
        errorTitle = '[' + appName + ' - Error]: ';

    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        balls = [];

    // Initialize
    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(4);

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
            velocity: new _Game.Vector2(rand(-2, 2), 0),
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
                    velocity: new _Game.Vector2(rand(-2, 2), rand(-2, 2)),
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
            velocity: new _Game.Vector2(rand(-2, 2), rand(-2, 2)),
            pos: new _Game.Vector2(e.clientX, e.clientY),
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
        ctx.fillText("App Name:" + appName, 20, 30);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

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

        if (this.opt.pos.isEmpty) this.opt.pos = new _Game.Vector2(rand(this.opt.radius, ctxWidth - this.opt.radius), rand(this.opt.radius, ctxHeight - this.opt.radius));

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
        pos: new _Game.Vector2(),
        velocity: new _Game.Vector2(rand(-0.5, 0.5), rand(-0.5, 0.5)),
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _screen = __webpack_require__(9);

var _screen2 = _interopRequireDefault(_screen);

var _ball = __webpack_require__(10);

var _ball2 = _interopRequireDefault(_ball);

var _shapes = __webpack_require__(11);

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

        allGamesMenu(5);

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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

function MouseTail(options) {
    // Private
    var appName = 'Mouse Tail';

    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        mouse = null;

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        mouse = g.mouse;

        allGamesMenu(3);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Particle = __webpack_require__(14);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Movement(Changing the position)
    Position = A pair of (x, y)
    Velocity = Changing position by time
    Acceleration = Changing velocity by time

 */

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

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(2);

        mouse = g.mouse;
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
                pos: new _Game.Vector2(rand(r, ctxWidth - r), rand(r, ctxHeight - r)),
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
        ctxHeight = ctxMe.canvas.height;
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

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
        pos: new _Game.Vector2(),
        vel: new _Game.Vector2(rand(-20, 20), rand(-20, 20)),
        speed: 0.04,
        radius: 20,
        opacity: 0,
        color: randColor()
    }, options);
    init.call(this);
}

module.exports = Particle;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Enemy = __webpack_require__(16);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _Player = __webpack_require__(17);

var _Player2 = _interopRequireDefault(_Player);

var _Shapes = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BlockRunner(options) {
    // Private
    var appName = 'BlockRunner',
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
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(1);

        player = new _Player2.default({
            ctx: ctx,
            stage: stage,
            size: playerSize,
            life: 50,
            input: g.input
        });

        gamePanel = new _Shapes.Rectangle({
            ctx: ctx,
            bgColor: '#152C35',
            brColor: 'white',
            pivot: new _Game.Vector2(stage.l, stage.t),
            size: { w: stage.r - stage.l, h: stage.b - stage.t }
        });

        playerHome = new _Shapes.Rectangle({
            ctx: ctx,
            bgColor: '#152C35',
            brColor: '#03BF94',
            pivot: new _Game.Vector2(stage.l, stage.b - playerHomeSize),
            size: { w: playerHomeSize, h: playerHomeSize }
        });
        update();
    }

    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        if (player.life > 0) {
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
    function resize(ctxMe) {
        ctxHeight = ctxMe.canvas.height;
        ctxWidth = ctxMe.canvas.width;

        stage = {
            l: margin,
            t: bodyArea,
            r: ctxWidth - margin,
            b: ctxHeight - margin
        };
        if (player) player.resizeStage(stage);

        if (ctx !== null && enemies) {
            makeEnemies();
        }
    }

    //Make enemies
    function makeEnemies() {
        enemies = [];

        for (var i = 0; i < enemyCount; i++) {
            var enemy = new _Enemy2.default({
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
        ctx.fillText("App Name: " + appName, 20, 30);
        ctx.font = "16px Georgia";
        ctx.textAlign = 'right';
        ctx.fillText("Player life: " + player.life, stage.r, 30);

        gamePanel.opt.size = { w: stage.r - stage.l, h: stage.b - stage.t };
        gamePanel.draw();
        playerHome.opt.pivot = new _Game.Vector2(stage.l + 1, stage.b - playerHomeSize - 1);
        playerHome.draw();
    }

    function gameOver() {
        new _Shapes.Rectangle({
            ctx: ctx,
            pos: new _Game.Vector2(0, 0),
            size: { w: ctxWidth, h: ctxHeight },
            alpha: 0.5,
            bgColor: 'black'
        }).draw();

        ctx.font = "72px Georgia";
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", ctxWidth / 2, ctxHeight / 2);
    }

    // Default options od class
    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#113E52',
        cfResize: resize
    }, options);

    // Call Initialize
    init.call(this);
}

module.exports = BlockRunner;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function Enemy(option) {
    var _this = this;

    //Public
    this.isExplode = false;

    //Private
    var ctx = null,
        ctxHeight = 0,
        ctxWidth = 0,
        box = null;

    // Init function
    function init() {
        ctx = this.opt.ctx;
        this.resizeStage(this.opt.stage);

        if (this.opt.pos.isEmpty) this.opt.pos = new _Game.Vector2(rand(this.opt.stage.l, this.opt.stage.r - this.opt.size), rand(this.opt.stage.t, this.opt.stage.b - this.opt.size));

        box = new _Shapes.Rectangle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            size: { w: this.opt.size, h: this.opt.size }
        });
    }

    this.isInPlayerHome = function () {
        //x=111 , y=288
        return _this.opt.pos.x < _this.opt.stage.l + 1 + _this.opt.playerHomeSize && _this.opt.pos.y > _this.opt.stage.b - 1 - _this.opt.playerHomeSize - _this.opt.size;
    };

    this.isIntersection = function (enemies) {
        var xl0 = _this.opt.pos.x,
            yl0 = _this.opt.pos.y,
            xr0 = _this.opt.pos.x + _this.opt.size,
            yr0 = _this.opt.pos.y + _this.opt.size,
            result = false;

        enemies.forEach(function (enemy) {
            var xl1 = enemy.opt.pos.x,
                yl1 = enemy.opt.pos.y,
                xr1 = enemy.opt.pos.x + enemy.opt.size,
                yr1 = enemy.opt.pos.y + enemy.opt.size;
            //
            if (xl0 > xr1 || xl1 > xr0) return false;
            if (yl0 > yr1 || yl1 > yr0) return false;

            result = true;
        });
        return result;
    };

    this.update = function (player) {
        if (_this.hitPlayer(player)) _this.isExplode = true;

        box.draw();
    };

    this.hitPlayer = function (player) {
        var xl0 = _this.opt.pos.x,
            yl0 = _this.opt.pos.y,
            xr0 = _this.opt.pos.x + _this.opt.size,
            yr0 = _this.opt.pos.y + _this.opt.size,
            xl1 = player.opt.pos.x,
            yl1 = player.opt.pos.y,
            xr1 = player.opt.pos.x + player.opt.size,
            yr1 = player.opt.pos.y + player.opt.size;

        if (xl0 > xr1 || xl1 > xr0) return false;
        if (yl0 > yr1 || yl1 > yr0) return false;

        return true;
    };

    this.resizeStage = function (stage) {
        // ctxHeight = ctx.canvas.clientHeight;
        // ctxWidth = ctx.canvas.clientWidth;

        _this.opt.stage = stage;
    };

    // Default options
    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2(),
        color: '#FF1E40',
        stage: null,
        size: 20,
        playerHomeSize: 20
    }, option);
    init.call(this);
}

module.exports = Enemy;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function Player(option) {
    var _this = this;

    // Privates
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        box = null;

    // Initialize
    function init() {
        ctx = this.opt.ctx;

        this.resizeStage(this.opt.stage);

        this.opt.pos.x = this.opt.stage.l + 1;
        this.opt.pos.y = this.opt.stage.b - this.opt.size - 1;

        this.life = this.opt.life;
        box = new _Shapes.Rectangle({
            ctx: ctx,
            pivot: this.opt.pos,
            bgColor: this.opt.color,
            size: { w: this.opt.size, h: this.opt.size }
        });
    }

    this.update = function () {
        var x = 0,
            y = 0,
            Key = _this.opt.input;

        if (Key.isDown('ArrowUp')) y -= 1;
        if (Key.isDown('ArrowLeft')) x -= 1;
        if (Key.isDown('ArrowDown')) y += 1;
        if (Key.isDown('ArrowRight')) x += 1;
        _this.move(new _Game.Vector2(x, y));
        _this.draw();
    };

    // Draw Ball
    this.draw = function () {
        box.opt.pivot = _this.opt.pos;
        box.draw();
    };

    this.damage = function (amount) {
        _this.life -= amount;
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
        pos: new _Game.Vector2(0, 0),
        velocity: new _Game.Vector2(),
        size: 20,
        color: '#FFF9DD',
        speed: 2,
        stage: null,
        life: 1000
    }, option);

    // Call Initialize
    init.call(this);
}

module.exports = Player;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Player = __webpack_require__(19);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RotatePlayer(options) {
    // Private
    var appName = 'RotatePlayer',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        mouse = null,
        player = null;

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        mouse = g.mouse;

        allGamesMenu(7);

        player = new _Player2.default({
            ctx: ctx,
            pos: new _Game.Vector2(ctxWidth / 2, ctxHeight / 2),
            velocity: new _Game.Vector2(0, 0),
            radius: 100
        });
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        player.update(mouse).lookAt(new _Game.Vector2(10, 200));
        userInterface();
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    // Resize windows event
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#292C44',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = RotatePlayer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

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
        objCircle = new _Shapes.Circle({
            ctx: ctx,
            pivot: new _Game.Vector2(0, 0),
            radius: this.opt.radius,
            bgColor: this.opt.color
        });
        objLine = new _Shapes.Line({
            ctx: ctx,
            thickness: 5,
            from: new _Game.Vector2(0, 0),
            to: new _Game.Vector2(this.opt.radius + 10, 0)
        });
        objBox = new _Shapes.Rectangle({
            ctx: ctx,
            pivot: new _Game.Vector2(2, 3),
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
        pos: new _Game.Vector2(),
        radius: 20,
        color: '#FF5349'
    }, options);
    init.call(this);
}

module.exports = Player;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

var _player = __webpack_require__(21);

var _player2 = _interopRequireDefault(_player);

var _ball = __webpack_require__(22);

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tennis(options) {
    // Private
    var appName = ' Tennis',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        margin = 5,
        player = null,
        computer = null,
        ball = null;

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(8);

        player = new _player2.default({ ctx: ctx, pos: new _Game.Vector2(margin, ctxHeight / 2), input: g.input, mouse: g.mouse });
        computer = new _player2.default({ ctx: ctx, pos: new _Game.Vector2(ctxWidth - margin - player.wPlayer, ctxHeight / 2), isAi: true });
        ball = new _ball2.default({ ctx: ctx });
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        player.catchBall(ball).update(ball);
        computer.catchBall(ball).update(ball);
        ball.update();
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;

        if (ball) ball.resize();
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#4D6266";
        ctx.fillText("App Name: " + appName, ctxWidth / 2, ctxHeight - 10);

        ctx.font = "14px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#E6F2EF";
        ctx.fillText("Player Score: " + player.score, 20, 15);

        ctx.textAlign = 'right';
        ctx.fillText("AI Score: " + computer.score, ctxWidth - 20, 15);

        for (var i = 0; i < ctxHeight; i += 30) {
            new _Shapes.Rectangle({
                ctx: ctx,
                pivot: new _Game.Vector2(ctxWidth / 2, i),
                size: { w: 2, h: 15 },
                bgColor: '#E6F2EF'
            }).draw();
        }
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#16262C',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = Tennis;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Shapes = __webpack_require__(1);

function TennisPlayer(options) {
    var _this = this;

    // Public
    this.wPlayer = 5;
    this.hPlayer = 40;
    this.score = 0;

    // Private
    var ctx = null,
        aiSpeed = 2,
        aiOffset = 10,
        ball = null,
        player = null;

    function init() {
        ctx = this.opt.ctx;

        player = new _Shapes.Rectangle({
            ctx: ctx,
            pivot: this.opt.pos,
            size: { w: this.wPlayer, h: this.hPlayer },
            bgColor: this.opt.bgColor
        });
    }

    // Update object
    this.update = function () {
        if (!_this.opt.isAi) {
            var mouse = _this.opt.mouse;
            if (mouse) {
                _this.opt.pos.y = mouse.y - _this.hPlayer / 2;
            }

            if (_this.opt.input.isDown('ArrowUp')) {
                _this.opt.pos.y -= 5;
                mouse.y -= 5;
            }

            if (_this.opt.input.isDown('ArrowDown')) {
                _this.opt.pos.y += 5;
                mouse.y += 5;
            }

            if (ball.rightGoal) {
                ball.rightGoal = false;
                _this.score++;
            }
        } else {

            var playerY = _this.opt.pos.y + _this.hPlayer / 2,
                ballY = ball.opt.pos.y;

            if (Math.abs(playerY - ballY) > aiOffset) if (playerY < ballY) _this.opt.pos.y += aiSpeed;else _this.opt.pos.y -= aiSpeed;

            if (ball.leftGoal) {
                ball.leftGoal = false;
                _this.score++;
            }
        }

        if (_this.opt.pos.y < 0) _this.opt.pos.y = 0;

        if (_this.opt.pos.y + _this.hPlayer > ctx.canvas.height) _this.opt.pos.y = ctx.canvas.height - _this.hPlayer;

        player.draw();
    };

    this.catchBall = function (b) {
        ball = b;
        var playerCondition = !_this.opt.isAi ? ball.opt.pos.x > _this.opt.pos.x + _this.wPlayer + ball.radius : ball.opt.pos.x < _this.opt.pos.x - ball.radius;

        if (!(playerCondition || ball.opt.pos.y < _this.opt.pos.y - ball.radius || ball.opt.pos.y > _this.opt.pos.y + _this.hPlayer + ball.radius)) {
            ball.opt.velocity.y = (ball.opt.pos.y - (_this.opt.pos.y + _this.hPlayer / 2)) / 10;
            ball.opt.velocity.x *= -1;
        }

        return _this;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null,
        bgColor: '#E6F2EF',
        input: null,
        mouse: null,
        isAi: false
    }, options);
    init.call(this);
}

module.exports = TennisPlayer;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function Ball(options) {
    var _this = this;

    // public
    this.radius = 10;
    this.leftGoal = false;
    this.rightGoal = false;
    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        ball = null;

    function init() {
        if (!this.opt.ctx) throw 'Ball Objects need Context';

        ctx = this.opt.ctx;
        this.resize();

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new _Game.Vector2(ctxWidth / 2, ctxHeight / 2);
        }

        ball = new _Shapes.Circle({
            ctx: ctx,
            pos: this.opt.pos,
            bgColor: this.opt.bgColor,
            radius: this.radius
        });
    }

    // Update object
    this.update = function () {

        if (_this.opt.pos.y < _this.radius || _this.opt.pos.y > ctxHeight - _this.radius) {
            _this.opt.velocity.y *= -1;
        }

        if (_this.opt.pos.x < _this.radius) {
            _this.leftGoal = true;
            _this.reset();
        }

        if (_this.opt.pos.x > ctxWidth - _this.radius) {
            _this.rightGoal = true;
            _this.reset();
        }

        _this.opt.pos.move(_this.opt.velocity, 3);
        ball.opt.pivot = _this.opt.pos;
        ball.draw();
    };

    this.reset = function () {
        _this.opt.pos.x = ctxWidth / 2;
        _this.opt.pos.y = ctxHeight / 2;
        _this.opt.velocity.x *= -1;
        _this.opt.velocity.y = rangeRand(0.2, 1);
    };

    this.resize = function () {
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2(),
        bgColor: '#BEDADC',
        velocity: new _Game.Vector2(rangeRand(5, 9), rangeRand(2, 4)).normal()
    }, options);
    init.call(this);
}

module.exports = Ball;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Auto = __webpack_require__(24);

var _Auto2 = _interopRequireDefault(_Auto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OneDirectionMove(options) {
    // Private
    var appName = ' OneDirectionMove',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        auto = null;

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        allGamesMenu(9);

        auto = new _Auto2.default({ ctx: ctx, input: g.input });
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();
        auto.update();
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#443954";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#F4EEEC',
        cfResize: resize
    }, options);

    init.call(this);
}

module.exports = OneDirectionMove;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function Auto(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        obj = null,
        vx = 0,
        vy = 0,
        angle = toRadian(0),
        dAngle = 0.07,
        acc = 0.1,
        v = 0,
        vmax = 5;

    function init() {
        if (!this.opt.ctx) throw 'Auto Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        this.opt.pos = new _Game.Vector2(ctxWidth / 2, ctxHeight / 2);
        obj = new _Shapes.Rectangle({
            ctx: ctx,
            size: { w: 80, h: 10 },
            pivot: new _Game.Vector2(-40, -5),
            showDirection: true
        });
    }

    // Update object
    this.update = function () {
        var input = _this.opt.input;

        if (input.isDown('KeyW')) {
            v += acc;
            if (v > vmax) v = vmax;
        } else if (input.isDown('KeyS')) {
            v -= acc;
            if (v < -vmax) v = -vmax;
        } else {
            if (v < 0.03 && v > -0.03) {
                v = 0;
            };

            if (v < 0) {
                v += 0.03;
            }
            if (v > 0) {
                v -= 0.03;
            }
        }

        var upKey = v < 0 ? input.isDown('KeyA') : input.isDown('KeyD');
        var downKey = v < 0 ? input.isDown('KeyD') : input.isDown('KeyA');
        if (upKey) {
            angle += dAngle;
            if (angle > Math.PI * 2) angle -= Math.PI * 2;
        }
        if (downKey) {
            angle -= dAngle;
            if (angle < 0) angle += Math.PI * 2;
        }

        vy = v * Math.sin(angle);
        vx = v * Math.cos(angle);

        _this.opt.pos.x += vx;
        _this.opt.pos.y += vy;

        _this.draw();
    };

    // Draw Object
    this.draw = function () {
        ctx.save();
        ctx.translate(_this.opt.pos.x, _this.opt.pos.y);
        ctx.rotate(angle);

        obj.draw();

        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: null
    }, options);
    init.call(this);
}

module.exports = Auto;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _SinWave = __webpack_require__(26);

var _SinWave2 = _interopRequireDefault(_SinWave);

var _CosMove = __webpack_require__(27);

var _CosMove2 = _interopRequireDefault(_CosMove);

var _CircleMove = __webpack_require__(28);

var _CircleMove2 = _interopRequireDefault(_CircleMove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.min = 0;
window.max = 360;

function CodingMath(options) {
    // Private
    var appName = ' CodingMath',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        btn = [],
        sinWave = null,
        cosMove = null,
        circleMove = null;

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;
        allGamesMenu(10);

        var clr = '#594F4F',
            w = ctxWidth / 2;
        btn.push({ btn: new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(w + 90, 10), bgColor: clr, text: 'Sin' }), clk: false });
        btn.push({ btn: new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(w + 135, 10), bgColor: clr, text: 'Cos Move' }), clk: false });
        btn.push({ btn: new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(w + 223, 10), bgColor: clr, text: 'Circle Movement' }), clk: false });

        sinWave = new _SinWave2.default({ ctx: ctx });
        cosMove = new _CosMove2.default({ ctx: ctx, pos: new _Game.Vector2(ctxWidth / 2, ctxHeight / 2) });
        circleMove = new _CircleMove2.default({ ctx: ctx });
        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        if (btn[0].clk) sinWave.update();

        if (btn[1].clk) cosMove.update();

        if (btn[2].clk) circleMove.update();
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#152C35";
        ctx.fillText("App Name: " + appName, 20, 30);

        btn.forEach(function (item) {
            item.btn.draw();
        });
    }

    function clickHandler(e) {
        if (btn[0].clk) sinWave.click(e);

        if (btn[1].clk) cosMove.click(e);

        if (btn[2].clk) circleMove.click(e);

        btn.forEach(function (item, index) {
            if (item.btn.isClick(e)) {
                unclickAll();
                item.clk = !item.clk;
            }
        });
    }

    function unclickAll() {
        btn.forEach(function (item) {
            item.clk = false;
        });
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#F2F0F2',
        cfResize: resize,
        cfClick: clickHandler
    }, options);

    init.call(this);
}

module.exports = CodingMath;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

function SinWave(options) {
    var _this = this;

    // Public

    // Private
    var ctx = null,
        ctxWidth = 0,
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

    function init() {
        if (!this.opt.ctx) throw 'SinWave Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        length = maxLength;
        amplitude = maxAmplitude;

        btn1 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 100), bgColor: '#F29B00', text: 'Wavelength' });
        btn2 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 140), bgColor: '#F25533', text: 'Amplitude' });
        btn3 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 180), bgColor: '#378C3F', text: 'Increase Distance' });
    }

    this.update = function () {
        if (isLength) _this.waveLength();

        if (isAmplitude) _this.amplitude();

        if (isDistance) {
            _this.distance(window.min, window.max);
        }
        _this.draw();
    };

    this.waveLength = function () {
        if (length <= 20 || length >= maxLength) lengthStep *= -1;
        length += lengthStep;
    };

    this.amplitude = function () {
        if (amplitude <= 20 || amplitude >= maxAmplitude) amplitudeStep *= -1;
        amplitude += amplitudeStep;
    };

    this.distance = function (from, to) {
        minDistance = from;
        maxDistance = to;
    };

    // Draw Object
    this.draw = function () {
        btn1.draw();
        btn2.draw();
        btn3.draw();

        ctx.save();
        ctx.translate(150, ctxHeight / 2);
        ctx.fillStyle = 'blue';
        for (var i = toRadian(minDistance); i < toRadian(maxDistance); i += 0.01) {
            var x = i * length,
                y = Math.sin(i) * amplitude;

            ctx.fillRect(x, y, 2, 2);
        }
        ctx.restore();
    };

    this.click = function (e) {
        if (btn1.isClick(e)) isLength = !isLength;

        if (btn2.isClick(e)) isAmplitude = !isAmplitude;

        if (btn3.isClick(e)) isDistance = !isDistance;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2()
    }, options);
    init.call(this);
}

module.exports = SinWave;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function CosMove(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        btn1 = null,
        btn2 = null,
        btn3 = null,
        isSin = false,
        isCos = false,
        isRadius = false,
        speed = 1,
        angle = 0,
        range = 100,
        offsetX = 0,
        offsetY = 0,
        obj = null;

    function init() {
        if (!this.opt.ctx) throw 'CosMove Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        obj = new _Shapes.Circle({
            ctx: ctx,
            pivot: this.opt.pos,
            radius: 20,
            bgColor: '#052B3E'
        });

        offsetX = this.opt.pos.x;
        offsetY = this.opt.pos.y;

        btn1 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 100), bgColor: '#F29B00', text: 'Sin' });
        btn2 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 140), bgColor: '#F25533', text: 'Cos' });
        btn3 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 180), bgColor: '#378C3F', text: 'Radius' });
    }

    // Update object
    this.update = function () {
        if (angle > 360) angle = 0;
        angle += speed;

        if (isSin) obj.opt.pivot.y = offsetY + Math.sin(toRadian(angle)) * range;

        if (isCos) obj.opt.pivot.x = offsetX + Math.cos(toRadian(angle)) * range;

        if (isRadius) obj.opt.radius = 20 + Math.abs(Math.cos(toRadian(angle)) * range);

        _this.draw();
    };

    // Draw Object
    this.draw = function () {
        obj.draw();
        btn1.draw();
        btn2.draw();
        btn3.draw();
    };

    this.click = function (e) {
        if (btn1.isClick(e)) isSin = !isSin;

        if (btn2.isClick(e)) isCos = !isCos;

        if (btn3.isClick(e)) isRadius = !isRadius;
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2()
    }, options);
    init.call(this);
}

module.exports = CosMove;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function CircleMove(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        btn1 = null,
        btn2 = null,
        btn3 = null,
        isCircle = false,
        isEllipse = false,
        isLissajous = false,
        path = null,
        obj = null,
        boxSize = 20,
        angle = 0,
        angleL = 0;

    function init() {
        if (!this.opt.ctx) throw 'CircleMove Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new _Game.Vector2(ctxWidth / 2 - boxSize / 2, ctxHeight / 2 - boxSize / 2);
        }

        btn1 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 100), bgColor: '#F29B00', text: 'Circle' });
        btn2 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 140), bgColor: '#F25533', text: 'Ellipse' });
        btn3 = new _Game.Button({ ctx: ctx, pos: new _Game.Vector2(20, 180), bgColor: '#378C3F', text: 'Lissajous' });

        obj = new _Shapes.Rectangle({
            ctx: ctx,
            size: { w: boxSize, h: boxSize },
            pivot: new _Game.Vector2(this.opt.pos.x, this.opt.pos.y)
        });
        path = new _Shapes.Circle({
            ctx: ctx,
            radius: this.opt.rotateRadius,
            pivot: new _Game.Vector2(this.opt.pos.x, this.opt.pos.y),
            bgColor: null,
            brColor: '#FBBA42'
        });
    }

    // Update object
    this.update = function () {
        var centerX = _this.opt.pos.x - boxSize / 2,
            centerY = _this.opt.pos.y - boxSize / 2,
            radius = _this.opt.rotateRadius,
            speed = _this.opt.speed,
            speedL = 4,
            posX = void 0,
            posY = void 0;

        if (angle > 360) angle = 0;

        if (angleL > 360) angleL = 0;

        if (isCircle) {
            posX = centerX + radius * Math.cos(toRadian(angle));
            posY = centerY + radius * Math.sin(toRadian(angle));
            angle += speed;
            obj.opt.size.w = obj.opt.size.h = boxSize;
        }

        if (isEllipse) {
            posX = centerX + (radius - 50) * Math.cos(toRadian(angle));
            posY = centerY + (radius + 20) * Math.sin(toRadian(angle));
            angle += speed;
            obj.opt.size.w = obj.opt.size.h = boxSize;
        }

        if (isLissajous) {
            obj.opt.size.w = obj.opt.size.h = 4;
            speed = 3;
            posX = centerX + radius * Math.cos(toRadian(angle));
            posY = centerY + radius * Math.sin(toRadian(angleL));
            angle += speed;
            angleL += speedL;
        }

        obj.opt.pivot.x = posX;
        obj.opt.pivot.y = posY;
        _this.draw();
    };

    this.click = function (e) {
        if (btn1.isClick(e)) isCircle = !isCircle;

        if (btn2.isClick(e)) isEllipse = !isEllipse;

        if (btn3.isClick(e)) isLissajous = !isLissajous;
    };

    // Draw Object
    this.draw = function () {
        obj.draw();
        path.draw();

        btn1.draw();
        btn2.draw();
        btn3.draw();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2(),
        rotateRadius: 80,
        speed: 1
    }, options);
    init.call(this);
}

module.exports = CircleMove;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shit = __webpack_require__(30);

var _Shit2 = _interopRequireDefault(_Shit);

var _Fly = __webpack_require__(31);

var _Fly2 = _interopRequireDefault(_Fly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FliesAroundShit(options) {
    // Private
    var appName = ' FliesAroundShit',
        ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        shit = null,
        flyNumber = 10,
        flies = [];

    function init() {
        var g = new _Game.Game(this.opt);

        ctx = g.getCtx();
        ctxWidth = ctx.canvas.width;
        ctxHeight = ctx.canvas.height;

        shit = new _Shit2.default({ ctx: ctx });
        for (var i = 0; i < flyNumber; i++) {
            flies.push(new _Fly2.default({ ctx: ctx }));
        }

        update();
    }

    // Update animation
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        userInterface();

        shit.update();
        flies.forEach(function (item) {
            item.update();
        });
    }

    function clickHandler(e) {
        flies.push(new _Fly2.default({ ctx: ctx }));
    }

    // onResize Game
    function resize(ctxMe) {
        ctxWidth = ctxMe.canvas.width;
        ctxHeight = ctxMe.canvas.height;
    }

    // Draw User Interface
    function userInterface() {
        ctx.font = "20px Georgia";
        ctx.textAlign = 'left';
        ctx.fillStyle = "#F24C27";
        ctx.fillText("App Name: " + appName, 20, 30);
    }

    this.opt = Object.assign({
        selector: 'body',
        id: 'screen',
        bgColor: '#FEFEFE',
        cfResize: resize,
        cfClick: clickHandler
    }, options);

    init.call(this);
}

module.exports = FliesAroundShit;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function Shit(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        img1 = null;

    function init() {
        if (!this.opt.ctx) throw 'Shit Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;
        allGamesMenu(12);

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new _Game.Vector2(ctxWidth / 2, ctxHeight / 2);
        }

        img1 = new Image();
        img1.src = '/dist/img/shit.png';
    }

    // Update object
    this.update = function () {
        _this.draw();
    };

    // Draw Object
    this.draw = function () {
        var thisX = _this.opt.pos.x - img1.width / 2,
            thisY = _this.opt.pos.y - 30;

        ctx.drawImage(img1, thisX, thisY);
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2()
    }, options);
    init.call(this);
}

module.exports = Shit;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Shapes = __webpack_require__(1);

function Fly(options) {
    var _this = this;

    // Private
    var ctx = null,
        ctxWidth = 0,
        ctxHeight = 0,
        img1 = null,
        angleX = rand(0, 360),
        angleY = rand(0, 360),
        cX,
        cY,
        r,
        speedX,
        speedY,
        rotate;

    function init() {
        if (!this.opt.ctx) throw 'Fly Objects need Context';

        ctx = this.opt.ctx;
        ctxHeight = ctx.canvas.clientHeight;
        ctxWidth = ctx.canvas.clientWidth;

        if (this.opt.pos.isEmpty) {
            this.opt.pos = new _Game.Vector2(ctxWidth / 2, ctxHeight / 2);
        }

        img1 = new Image();
        img1.src = '/dist/img/fly.png';

        cX = this.opt.pos.x;
        cY = this.opt.pos.y;
        r = rand(30, 90);
        speedX = rand(2, 4);
        speedY = rand(4, 7);
        rotate = rangeRand(20, 25);
    }

    // Update object
    this.update = function () {

        _this.opt.pos.x = cX + r * Math.cos(toRadian(angleX));
        _this.opt.pos.y = cY + r * Math.sin(toRadian(angleY));

        if (angleX > 360) angleX = 0;
        angleX += speedX;

        if (angleY > 360) angleY = 0;
        angleY += speedY;

        _this.draw();
    };

    // Draw Object
    this.draw = function () {
        var thisX = _this.opt.pos.x - img1.width / 2,
            thisY = _this.opt.pos.y;
        ctx.save();
        ctx.translate(ctxWidth / 2, ctxHeight / 2);
        ctx.rotate(rotate);
        ctx.drawImage(img1, ctxWidth / 2 - thisX, ctxHeight / 2 - thisY, 10, 5);
        ctx.restore();
    };

    this.opt = Object.assign({
        ctx: null,
        pos: new _Game.Vector2()
    }, options);
    init.call(this);
}

module.exports = Fly;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map