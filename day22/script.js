let fs = require('fs');

let default_carrier = {
        direction: up,
        position: {
            i: 0,
            j: 0
        },
        infected: 0
    },
    carrier;

function* test_func(val, res) {
    return yield fs.readFile('day22/test.txt', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let result = main(data.toString(), val);
        if (res === result) {
            return true;
        }
        return false;
    });
}

let map;

function main(text, val) {
    carrier = default_carrier;
    map = text.split('\n').map(line => line.split(''));

    let first_position = Math.floor(map.length / 2);
    carrier.position = {
        i: first_position,
        j: first_position
    };

    let result = start(val);
    return result;
}

function start(val) {
    for (let k = 0; k < val; k++) {
        let [i, j] = [carrier.position.i, carrier.position.j];
        carrier.direction = switchTurn(map[i][j], carrier.direction);
        let result = toggle(i, j);
        if (!result) {
            return false;
        }
        carrier.direction();
    }
    let res = map.map(line => line.join('')).join('/');
    return carrier.infected;
}

function toggle(i, j) {
    switch (map[i][j]) {
        case '.':
            map[i][j] = 'W';
            return true;
        case 'W':
            map[i][j] = '#';
            carrier.infected += 1;
            return true;
        case '#':
            map[i][j] = 'F';
            return true;
        case 'F':
            map[i][j] = '.';
            return true;
        default:
            console.log('Error value');
            return false;
    }
}

function switchTurn(state, direction) {
    switch (state) {
        case 'W':
            return direction;
        case '#':
            return turnRigth(direction);
        case '.':
            return turnLeft(direction);
        case 'F':
            return reverse(direction);
        default:
            console.error('Unknown state');
            exit();
    }
}

function reverse(direction) {
    switch (direction.name) {
        case 'up':
            return down;
        case 'rigth':
            return left;
        case 'down':
            return up;
        case 'left':
            return rigth;
        default:
            console.log('Cant find direction');
            return exit;
    }
}

function turnLeft(direction) {
    switch (direction.name) {
        case 'up':
            return left;
        case 'rigth':
            return up;
        case 'down':
            return rigth;
        case 'left':
            return down;
        default:
            console.log('Cant find direction');
            return exit;
    }
}

function turnRigth(direction) {
    switch (direction.name) {
        case 'up':
            return rigth;
        case 'rigth':
            return down;
        case 'down':
            return left;
        case 'left':
            return up;
        default:
            console.log('Cant find direction');
            return exit;
    }
}

function up() {
    if (carrier.position.i === 0) {
        let first_line = new Array(map[0].length).fill('.');
        map = [first_line, ...map];
    } else carrier.position.i -= 1;
    return true;
}

function down() {
    carrier.position.i += 1;
    if (carrier.position.i === map.length) {
        let last_line = new Array(map[0].length).fill('.');
        map = [...map, last_line];
    }
    return true;
}

function rigth() {
    carrier.position.j += 1;
    if (carrier.position.j === map[0].length) {
        map = map.map(line => [...line, '.']);
    }
    return true;
}

function left() {
    if (carrier.position.j === 0) {
        map = map.map(line => ['.', ...line]);
    } else carrier.position.j -= 1;
    return true;
}

function exit() {
    throw new Error('Exit');
}

let Test = {
    tests: [{
            num: 1,
            val: 100,
            res: 26
        },
        {
            num: 2,
            val: 10000000,
            res: 2511944
        }
    ],
    pass: function() {
        for (let test of this.tests) {
            if (!test_func(test.res, test.res)) {
                console.log(`Test ${test.num} is failed`);
                return false;
            }
            console.log(`Test ${test.num} is passed`);
        }
        return true;
    }
};

(function() {
    if (Test.pass()) {
        fs.readFile('day22/input.txt', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            carrier = default_carrier;
            let result = main(data.toString(), 10000000);
            console.log(result);
        });
    }
})();