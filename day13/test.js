let fs = require('fs');
fs.readFile('day13/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    mainAction(data.toString());
});

function mainAction(input) {
    const guards = input.split('\n').map(s => s.match(/\d+/g).map(Number));
    const caughtByGuard = delay => ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
    const severity = delay => guards.filter(caughtByGuard(delay))
        .reduce((n, [d, r]) => n + d * r, 0);

    let delay = -1;
    while (guards.some(caughtByGuard(++delay)));
    console.log([severity(0), delay]);
}