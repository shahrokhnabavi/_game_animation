import Circle from './Circle';
import Line from './Line';
import Rectangle from './Rectangle';

function Shapes(type, options){
    switch( type ){
        case 'circle':
            return new Circle(options);
        case 'line':
            return new Line(options);
        case 'rect':
            return new Rectangle(options);
        default:
            throw 'Undefined Shape type.'
    }
}


module.exports = Shapes;