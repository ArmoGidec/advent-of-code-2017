let fs = require('fs');

fs.readFile('day11/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    mainAction(data.toString());
});

function mainAction(text) {
    let way_instruction = text.split(/ *, */g);

    let position = {
        x: 0,
        y: 0,
        z: 0
    };

    let max = 0;

    for (let step of way_instruction) {
        let instruction = toGetPositionInstruction(step);
        for (let i of instruction) {
            position[i[0]] += i[1];
        }
        let steps = toGetSteps(position);
        max = Math.max(max, steps);
    }

    console.log(max);
}

function toGetSteps(position) {
    let steps = (Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z))/2;
    return steps;
}

function toGetPositionInstruction(step) {
    switch (step) {
        case 'n':
            return [
                ['y', 1],
                ['z', -1]
            ];
        case 'ne':
            return [
                ['x', 1],
                ['z', -1]
            ];
        case 'se':
            return [
                ['x', 1],
                ['y', -1]
            ];
        case 's':
            return [
                ['y', -1],
                ['z', 1]
            ];
        case 'sw':
            return [
                ['x', -1],
                ['z', 1]
            ];
        case 'nw':
            return [
                ['x', -1],
                ['y', 1]
            ];
    }
}