let fs = require('fs');
let rules = [];

fs.readFile('day21/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});


/** @param {string} text */
function main(text) {
    console.clear();
    rules = text.split('\n').map(line => parseLine(line));
    let pattern = '.#./..#/###';
    for (let i = 0; i < 19; i++) {
        let time = Date.now();
        let squares = getSquares(toImage(pattern));
        let expanded = toExpand(squares);
        pattern = toPattern(toCombine(expanded));
        console.log(`${i+1}: ${(Date.now() - time)/1000}s`);
    }
    let check = toImage(pattern);
    let on = pattern.match(/#/g);
    console.log(on.length);
}

function toCombine(squares) {
    let mod = squares.length % 2 === 0 ? 2 : 3;
    let expanded_square = [];

    for (let k = 0, times = Math.sqrt(squares.length); k < times; k++) {
        let line = squares[k * mod];
        for (let i = k * mod + 1, len = i + times - 1; i < len; i++) {
            line = line.map((val, j) => val.concat(squares[i][j]));
        }
        expanded_square = expanded_square.concat(line);
    }
    return expanded_square;
}

/** @param {string} line */
function parseLine(line) { //парсинг строк правил (из ... в ...)
    let res = line.split(' => ');
    return { in: res[0],
        to: res[1]
    };
}

/** @param {string[][]} image*/
function getSquares(image) { //разбитие матрицы на делимые квадраты
    let mod = image.length % 2 === 0 ? 2 : 3; //определяем правило разбития
    let side_len = Math.floor(image.length / mod);
    let squares = [];
    for (let k = 0, len = Math.pow(side_len, 2); k < len; k++) {
        let square = [];
        let start = k % mod * mod;
        let end = start + mod;
        for (let i = Math.floor(k / side_len) * mod, times = i + mod; i < times; i++) {
            let line = image[i].slice(start, end);
            square.push(line);
        }
        squares.push(square);
    }
    return squares;
}

/** @param {string} pattern */
function toImage(pattern) { //из строки-паттерна в матрицу
    return pattern.split('/').map(line => line.split(''));
}

/** @param {string[][][]} squares*/
function toExpand(squares) { //функция расширения
    squares = squares.map(square => {
        let rule = findRule(square);
        if (rule === undefined) {
            console.error(new Error('Can\'t to find rule!'));
        }
        square = toImage(rule.to);
        return square;
    });
    return squares;
}

function findRule(square) { //определяем правило расширения
    while (true) {
        for (let i = 0; i < 5; i++) {
            let pattern = toPattern(square);
            let len = pattern.length;
            for (let rule of rules) {
                if (rule.in.length === len && rule.in === pattern) {
                    return rule;
                }
            }
            square = square.rotate();
        }
        square = square.flip();
    }
}

function toPattern(square) { //из матрицы в строку-паттерн
    let pattern = square.map(val => val.join('')).join('/');
    return pattern;
}

Array.prototype.rotate = function () {
    let rotated = this.map(i => i.slice());
    for (let i = 0, len = this.length; i < len; i++) {
        for (let j = 0; j < len; j++) {
            rotated[i][j] = this[j][len - 1 - i];
        }
    }
    return rotated;
};

Array.prototype.flip = function () {
    let fliped = this.map(i => i.slice()).reverse();
    return fliped;
};