const input = 303;


function part1() {
    let array = [0];

    let value = 1;
    let position = 0;
    for (let i = 0; i < 2017; i++) {
        position = (position + input) % array.length + 1;
        array.splice(position, 0, value++);
    }
    return array[position + 1];
}

function part2() { //imitation
    let len = 1;
    let n = 1;
    let position = 0;
    let value = 1;
    for (let i = 0; i < 50000000; i++) {
        position = (position + input) % len + 1;
        if (position == 1) {
            n = value;
        }
        value += 1;
        len += 1;
    }
    return n;
}

console.log(`Part1: ${part1()}`);
console.log(`Part2: ${part2()}`);