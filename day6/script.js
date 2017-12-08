let sha1 = require('sha1');

function compareArray(array1, array2) {
    for (let i = 0, len = array1.length; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

let a = [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5];
// let a = [0, 2, 7, 0];

let length = a.length;

let mas = [Array.from(a)];
let steps = 0;

while (true) {
    let max = Math.max(...a);
    let i = a.indexOf(max);
    let len = a[i];
    a[i++] = 0;
    for (i = i % length; len > 0; len--, i = (i + 1) % length) {
        a[i] += 1;
    }
    steps += 1;

    // let checkArray = mas.filter(array => compareArray(array, a));
    let hash = sha1(a);
    let arrayIndex = mas.indexOf(hash);
    if (arrayIndex > -1) {
        console.log(steps - arrayIndex);
        break;
    }

    mas.push(hash);
}