let states = {
    A: [{
        value: 1,
        move: rigth,
        state: 'B'
    }, {
        value: 0,
        move: rigth,
        state: 'C'
    }],
    B: [{
        value: 0,
        move: left,
        state: 'A'
    }, {
        value: 0,
        move: rigth,
        state: 'D'
    }],
    C: [{
        value: 1,
        move: rigth,
        state: 'D'
    }, {
        value: 1,
        move: rigth,
        state: 'A'
    }],
    D: [{
        value: 1,
        move: left,
        state: 'E'
    }, {
        value: 0,
        move: left,
        state: 'D'
    }],
    E: [{
        value: 1,
        move: rigth,
        state: 'F'
    }, {
        value: 1,
        move: left,
        state: 'B'
    }],
    F: [{
        value: 1,
        move: rigth,
        state: 'A'
    }, {
        value: 1,
        move: rigth,
        state: 'E'
    }]
};

let tape = new Array(6).fill(0);
let j = tape.length / 2;

function main() {
    let times = 12368930;
    let state = states.A;
    for (let i = 0; i < times; i++) {
        state = checksum(state);
    }
    return tape.join('').match(/1/g).length;
}

function checksum(state, current_value = j) {
    let instruction = state[tape[current_value]];
    return execute(instruction);
}

function execute(instruction) {
    tape[j] = instruction.value;
    instruction.move();
    return states[instruction.state];
}

function rigth() {
    if (j === tape.length - 1) {
        tape.push(0);
    }
    j += 1;
}

function left() {
    if (j === 0) {
        tape.unshift(0);
    } else j -= 1;
}

let result = main();
console.log(result);