let fs = require('fs');

fs.readFile('day20/test.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});

function main(text) {
    let particles = text.split('\n').map(parseLine);
    particles.clean();
    let times = particles.length + 1;
    for (let i = 0; i < 5000; i++) {
        console.log(i, particles.length);
        particles.forEach(({ p, v, a }, i) => {
            [p[0], p[1], p[2]] = [p[0] + v[0], p[1] + v[1], p[2] + v[2]];
            [v[0], v[1], v[2]] = [v[0] + a[0], v[1] + a[1], v[2] + a[2]];
        });
        let s = new Set(particles.map(({p}) => p.join('+')));
        if (particles.length !==s.size) {
            particles.clean();
        }
    }

    // let min = particles.findMin(); //Part1
    // console.log(min);

    console.log('Length =', particles.length); //Part2
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

Array.prototype.clean = function() {
    for (let i = 0; i < this.length - 1; i++) {
        let deleted = new Set();
        for (let j = i + 1; j < this.length; j++) {
            let a = this[i].p.join('+');
            let b = this[j].p.join('+');
            if (a === b) {
                deleted.add(i);
                deleted.add(j);
            }
        }
        for (let j of[...deleted].reverse()) {
            this.splice(j, 1);
        }
    }
}