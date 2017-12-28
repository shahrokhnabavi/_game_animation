import Collision from './modules/Collision/app';
import HeavyBall from './modules/HeavyBall/app';
import BackgroundBalls from './modules/BackgroundBalls/app';
import MouseTail from './modules/MouseTail/app';
import Physics from './modules/Physics/app';
import BlockRunner from './modules/BlockRunner/app';


switch( 6 ){
    case 1:
        new Collision();
        break;
    case 2:
        new BackgroundBalls();
        break;
    case 3:
        new HeavyBall();
        break;
    case 4:
        new MouseTail();
        break;
    case 5:
        new Physics();
        break;
    case 6:
        new BlockRunner();
        break;
}