const input = 361527;
const size = toMathSize(input);
let square;

function main() {
    square = toCreateSquare(size);
    let state = toMathPosition(size);
    let [x, y] = [state.x, state.y];
    state.step = 1;
    state.len = 1;
    state.constant = 1;

    state = toGo(square, state);

    let steps = Math.abs(x - state.x) + Math.abs(y - state.y);
    console.log(state);
}

main();

function toGo(square, state) {
    let instructions_order = [
        ['x', 1, 'len'],
        ['y', -1, 'len'],
        ['len', 1, 'constant'],
        ['x', -1, 'len'],
        ['y', 1, 'len'],
        ['len', 1, 'constant']
    ];
    square[state.y][state.x] = state.step;

    let b = true;
    for (let i = 0; b; i = (i + 1) % 6) {
        for (let j = 0; j < state[instructions_order[i][2]]; j++) {
            let attr = instructions_order[i][0];
            let value = instructions_order[i][1];
            state[attr] += value;
            if (instructions_order[i][0] != 'len') {
                state.step = toMathValue(state.x, state.y);
                square[state.y][state.x] = state.step;
                if (state.step > input) {
                    b = false;
                    break;
                }
            }
        }
    }

    return state;
}

function toMathValue(x, y) {
    let values = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let val = square[y + i][x + j];
            let b = isNaN(val);
            if (!b && !(y + i == y && x + j == x)) {
                values.push(square[y + i][x + j]);
            }
        }
    }
    let result = values.reduce((prev, cur) => prev + cur);
    return result;
}

function toMathPosition(size) {
    let position = Math.ceil(size / 2);
    return {
        'x': position-1,
        'y': position-1
    };
}

function toCreateSquare(size) {
    let square = new Array(size);
    for (let i = 0; i < size; i++) {
        square[i] = new Array(size);
    }
    return square;
}

function toMathSize(input) {
    let size = 1;
    while (Math.pow(size, 2) < input) {
        size += 2;
    }
    return size;
}