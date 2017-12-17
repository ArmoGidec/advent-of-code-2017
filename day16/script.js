let fs = require('fs');

fs.readFile('day16/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});

let array = 'abcdefghijklmnop'.split('');

function main(text) {
    let moves = text.split(/ *, */g);
    let len = 1000000000;
    for (let i = 0; i < len; i++) {
        for (let move of moves) {
            let {
                func,
                args
            } = parseMove(move);
            array = func(...args);
        }
        if (array.join('') === 'abcdefghijklmnop') {
            len = len % i;
            i = 0;
        }
    }
    console.log(array.join(''));
}

function parseMove(move) {
    let args;
    switch (move[0]) {
        case 's':
            args = [parseInt(move.slice(1))];
            return {
                func: spin,
                args: args
            };
        case 'x':
            args = move.slice(1).split('/').map(val => parseInt(val));
            return {
                func: exchange,
                args: args
            };
        case 'p':
            args = move.slice(1).split('/');
            return {
                func: partner,
                args: args
            };
    }
}

function spin(len) {
    array = array.spin(len);
    return array;
}

Array.prototype.spin = function (len) {
    let ar = this.slice();
    for (let i = 0, length = this.length; i < length; i++) {
        ar[(i + len) % length] = this[i];
    }
    return ar;
};

function partner(A, B) {
    let a = array.indexOf(A);
    let b = array.indexOf(B);
    return exchange(a, b);
}

function exchange(a, b) {
    array = array.exchange(a, b);
    return array;
}

Array.prototype.exchange = function (a, b) {
    let ar = this.slice();
    ar[a] = [ar[b], ar[b] = ar[a]][0];
    return ar;
}