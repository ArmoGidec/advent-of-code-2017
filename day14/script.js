let toGetHash = require('./k_hash').toGetHash;

let input = 'oundnydw';
let used_squares = 0;
let disk = [];
for (let i = 0; i < 128; i++) {
    let s = `${input}-${i}`;
    let hash = toGetHash(s);
    let disk_hash = hash.split('').map(char => {
        let hex = parseInt(char, 16).toString(2);
        return ('0'.repeat(4 - hex.length) + hex).replace(/0/g, '.').replace(/1/g, '#');
    }).join('');
    used_squares += disk_hash.split('').filter(i => i === '#').length;
    disk.push(disk_hash.split(''));
}

console.log(used_squares);

let num_reg = 1;

function searchRegion(i, j) {
    let b = false;
    if (disk[i][j] === '#') {
        disk[i][j]=num_reg;
        b = true;
        if (i < disk.length - 1 && disk[i + 1][j] === '#') {
            disk[i + 1][j] = num_reg;
            searchRegion(i + 1, j);
        }
        if (disk[i][j + 1] === '#') {
            disk[i][j + 1] = num_reg;
            searchRegion(i, j + 1);
        }
        if (i > 0 && disk[i - 1][j] === '#') {
            disk[i - 1][j] = num_reg;
            searchRegion(i - 1, j);
        }
        if (disk[i][j - 1] === '#') {
            disk[i][j - 1] = num_reg;
            searchRegion(i, j - 1);
        }
    }
    return b;
}

for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
        if (searchRegion(i, j)) {
            num_reg += 1;
        }
    }
}

console.log(num_reg);