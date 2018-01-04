let fs = require('fs');

fs.readFile('day20/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});

function main(text) {
    let particles = text.split('\n').map(parseLine);

    for (let i = 0; i < 4; i++) {
        particles.forEach(({ p, v, a }, i) => {
            [p[0], p[1], p[2]] = [p[0] + v[0], p[1] + v[1], p[2] + v[2]];
            [v[0], v[1], v[2]] = [v[0] + a[0], v[1] + a[1], v[2] + a[2]];
        });
    }

    let min = particles.findMin();
    console.log(min);
}

function parseLine(line) {
    let [p, v, a] = line.match(/<-?\d+,-?\d+,-?\d+>/g)
        .map(vals => vals.match(/-?\d+/g)
            .map(val => parseInt(val)));
    return { p, v, a };
}

function getDistance(p) {
    return Math.abs(p[0]) + Math.abs(p[1]) + Math.abs(p[2]);
}

Array.prototype.findMin = function() {
    let min = Math.min(...this.map(({ p }) => getDistance(p)));
    let minElement = this.findIndex(({ p }) => {
        return min === getDistance(p);
    });
    return minElement;
};