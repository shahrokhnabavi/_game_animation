import Collision from './modules/Collision/app';
import HeavyBall from './modules/HeavyBall/app';
import BackgroundBalls from './modules/BackgroundBalls/app';
import MouseTail from './modules/MouseTail/app';
import Physics from './modules/Physics/app';
import BlockRunner from './modules/BlockRunner/app';
import RotatePlayer from './modules/RotatePlayer/app';
import Tennis from './modules/Tennis/app';
import OneDirectionMove from './modules/OneDirectionMove/app';
import CodingMath from './modules/CodingMath/app';
import FliesAroundShit from './modules/FliesAroundShit/app';

window.loadGame = idx => {
    switch( idx ){
        case 12:
            new FliesAroundShit();
            break;
        case 11:
            console.log("Clock");
            break;
        case 10:
            new CodingMath();
            break;
        case 9:
            new OneDirectionMove();
            break;
        case 8:
            new Tennis();
            break;
        case 7:
            new RotatePlayer();
            break;
        case 6:
            new Collision();
            break;
        case 5:
            new BackgroundBalls();
            break;
        case 4:
            new HeavyBall();
            break;
        case 3:
            new MouseTail();
            break;
        case 2:
            new Physics();
            break;
        case 1:
            new BlockRunner();
            break;
    }
};
loadGame(11);
