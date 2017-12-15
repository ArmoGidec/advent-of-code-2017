let toGetHash = require('./k_hash').toGetHash;

let input = 'oundnydw';
let used_squares = 0;
let disk = [];
for (let i = 0; i < 128; i++) {
    let s = `${input}-${i}`;
    let hash = toGetHash(s).split('').map(char => {
        let hex = parseInt(char, 16).toString(2);
        return ('0'.repeat(4 - hex.length) + hex).replace(/0/g, '.').replace(/1/g, '#');
    }).join('');
    used_squares += hash.split('').filter(i => i === '#').length;
    disk.push(hash);
}

console.log(used_squares);