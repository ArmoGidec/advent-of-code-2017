let fs = require('fs');

fs.readFile('day19/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});

let route;
let step = 1;
let array = [];

function main(text) {
    route = text.split('\n').map(line => line.split(''));
    let first_step = route[0].indexOf('|');
    go_way(0, first_step);
}

let prevStep = down;

async function go_way(line, ind) {
    let steps = 0;
    while (true) {
        let nextStep = await findDirection(line, ind);
        [line, ind] = await nextStep(line, ind);
        prevStep = nextStep;
        if (line === -1 && ind === -1) {
            console.log(array.join(''));
            console.log('Steps =', steps);
            console.log('The end.');
            return;
        }
        steps += 1;
    }
}

function findDirection(line, ind) {
    let symb = route[line][ind];
    switch (true) {
        case /\|/.test(symb):
            if (prevStep.name !== 'left' && prevStep.name !== 'right') {
                return step === 1 ? down : up;
            }
            return prevStep;
        case /-/.test(symb):
            if (prevStep.name !== 'down' && prevStep.name !== 'up') {
                return step === 1 ? right : left;
            }
            return prevStep;
        case /\+/.test(symb):
            return findWay(line, ind);
        case /[A-Z]/.test(symb):
            array.push(symb);
            return prevStep;
        default:
            return stop;
    }
}

function down(line, ind) {
    return [line + 1, ind];
}

function up(line, ind) {
    return [line - 1, ind];
}

function right(line, ind) {
    return [line, ind + 1];
}

function left(line, ind) {
    return [line, ind - 1];
}

function findWay(line, ind) {
    if (nextIsRight(line, ind)) {
        step = 1;
        return right;
    }

    if (nextIsLeft(line, ind)) {
        step = -1;
        return left;
    }

    if (nextIsDown(line, ind)) {
        step = 1;
        return down;
    }

    if (nextIsUP(line, ind)) {
        step = -1;
        return up;
    }

    console.log(`Can't find next step!`);
    return stop;
}

function nextIsRight(line, ind) {
    let symb = route[line][ind + 1];
    let isChar = /[A-Z]/.test(symb);
    if ((symb === '-' || isChar) && prevStep.name !== 'left' && prevStep.name !== 'right') {
        return true;
    }
    return false;
}

function nextIsLeft(line, ind) {
    let symb = route[line][ind - 1];
    let isChar = /[A-Z]/.test(symb);
    if ((symb === '-' || isChar) && prevStep.name !== 'right' && prevStep.name !== 'left') {
        return true;
    }
    return false;
}
 
function nextIsDown(line, ind) {
    let symb = route[line + 1][ind];
    let isChar = /[A-Z]/.test(symb);
    if ((symb === '|' || isChar) && prevStep.name !== 'up' && prevStep.name !== 'down') {
        return true;
    }
    return false;
}

function nextIsUP(line, ind) {
    let symb = route[line - 1][ind];
    let isChar = /[A-Z]/.test(symb);
    if ((symb === '|' || isChar) && prevStep.name !== 'down' && prevStep.name !== 'up') {
        return true;
    }
    return false;
}

function stop() {
    return [-1, -1];
}