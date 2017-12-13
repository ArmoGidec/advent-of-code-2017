const size = 6;
let firewall = new Array(size).fill({
    array: []
});
let lines = [];

let fs = require('fs');
fs.readFile('day13/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    mainAction(data.toString());
});


function mainAction(text) {
    lines = text.split('\n');
    // let caughted = toPassFirewall();
    // let depth = toMathDepth(caughted);
    // console.log(depth);

    let delay = toPassFirewall();
    console.log(delay);
}

function createArray() {
    let firewall_first= new Array(size).fill({
        array: []
    });
    lines.forEach(line => {
        let {
            i,
            range
        } = toParseLine(line);
        firewall_first[i] = {
            direction: 1,
            array: new Array(range).fill(0)
        };
        firewall_first[i].array[0] = 1;
    });
    return firewall_first;
}

function toMathDepth(c_layers) {
    let result = c_layers.reduce((prev, cur) => prev + cur * firewall[cur].array.length);
    return result;
}

function toPassFirewall(i = 0) {
    let b;
    while (!b) {
        firewall = createArray();
        toDelay(i);
        b = true;
        for (let j = 0; j <= size; j++) {
            if (caughtOnNextLayer(j)) {
                console.log(`Is traped on ${j}'s layer. Delay ${i}.`);
                i += 1;
                b = false;
                break;
            }
        }
    }
    return i;
}

function toDelay(i) {
    for (let j = 0; j < i; j++) {
        updateFirewallState();
    }
}

function caughtOnNextLayer(j) {
    let caught = firewall[j].array[0] === 1;
    updateFirewallState();
    return caught;
}

function updateFirewallState() {
    for (let i of firewall) {
        if (i.array.length === 0) {
            continue;
        }
        let position = i.array.indexOf(1);
        if ((position === i.array.length - 1 && i.direction === 1) || (position === 0 && i.direction === -1)) {
            i.direction = i.direction * (-1);
        }
        i.array[position] = 0;
        i.array[position + i.direction] = 1;
    }
}


function toParseLine(line) {
    let s = line.split(': ');
    let i = parseInt(s[0]);
    let range = parseInt(s[1]);
    return {
        i,
        range
    };
}