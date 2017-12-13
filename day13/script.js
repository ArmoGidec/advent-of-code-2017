const size = 84;
let firewall_first_state = new Array(size).fill({
    array: []
});
let firewall;

let fs = require('fs');
fs.readFile('day13/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    mainAction(data.toString());
});


function mainAction(text) {
    firewall = Array.from(firewall_first_state);
    text.split('\n').forEach(line => {
        let {
            i,
            range
        } = toParseLine(line);
        firewall[i] = {
            direction: 1,
            array: new Array(range).fill(0)
        };
        firewall[i].array[0] = 1;
    });

    let caughted = toPassFirewall();
    let depth = toMathDepth(caughted);
    console.log(depth);
}

function toMathDepth(c_layers) {
    let result = c_layers.reduce((prev, cur) => prev + cur * firewall[cur].array.length);
    return result;
}

function toPassFirewall(j = 1) {
    let layers = [0];

    for (; j <= size; j++) {
        if (caughtOnNextLayer(j)) {
            layers.push(j);
        }
    }
    return layers;
}

function caughtOnNextLayer(j) {
    updateFirewallState();
    return firewall[j] !== undefined && firewall[j].array[0] === 1;
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