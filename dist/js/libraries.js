function allGamesMenu( idxGame ){

    var area = document.body,
        select = document.createElement('select'),
        games = [
            'BlockRunner','Physics','MouseTail','HeavyBall','BackgroundBalls','Collision','RotatePlayer',
            'Tennis','One Direction Move','Coding Math',
        ];

    select.id = 'game';
    area.appendChild(select);

    games.forEach( (game, index) => {
        let opt = document.createElement('option');
        opt.innerText = game;
        if( idxGame === (index+1) )
            opt.setAttribute('selected', 'selected');

        select.appendChild(opt);
    });
    select.addEventListener('change', (e) => {loadGame(select.selectedIndex+1);});
}



// Utility
rangeRand = (min, max) => {
    min = min ? min : 0;
    max = max ? max : 100,
    sign = Math.random() > 0.5 ? 1 : -1;

    return rand(min, max) * sign;
};

rand = (min, max) => {
    min = min ? min : 0;
    max = max ? max : 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

randPos = (xMin, xMax, yMin, yMax) => {
    return {
        x: rand(xMin, xMax),
        y: rand(yMin, yMax)
    };
};

randColor = () => {
    var colors= [
        // "114b5f","028090","e4fde1","456990","f45b69","d5573b","885053","777da7","94c9a9","c6ecae"
        "4259A7", "3EA9A6", "E4DFDB", "D6B389", "C4656B"
    ];
    return '#' + colors[rand(0, colors.length-1)];
};

function toRadian(degree){
    return degree * Math.PI / 180;
}

function toDegree(radian){
    return radian * 180 / Math.PI;
}