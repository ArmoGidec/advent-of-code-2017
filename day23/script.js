let fs = require('fs');

fs.readFile('day23/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
    part2();
});

let CPU = {
    i: 0,
    registers: {},
    mul_invoked: 0
};

function part2() {
    /*
    for x in range(105700,122700 + 1,17):
        for i in range(2,x):
            if x % i == 0:
                h += 1
                break
    print(h)
    */
    let h = 0;
    for (let x = 109300; x < 126300 + 1; x += 17) {
        for (let i = 2; i < x; i++) {
            if (x % i == 0) {
                h += 1;
                break;
            }
        }
    }
    console.log(`h = ${h}`);
}

function main(text) {
    "abcdefgh".split('').forEach(register => CPU.registers[register] = 0);
    let instructions = text.split('\n').map(parseLine);
    for (let len = instructions.length; CPU.i < len; CPU.i++) {
        let { func, args } = instructions[CPU.i];
        func(...args);
    }
    console.log(`Mul invoked ${CPU.mul_invoked} times.`);
}

function set(register, val) {
    let new_val = parseToInt(val);
    val = new_val !== undefined ? new_val : CPU.registers[val];
    CPU.registers[register] = val;
}

function sub(register, val) {
    let new_val = parseToInt(val);
    val = new_val !== undefined ? new_val : CPU.registers[val];
    CPU.registers[register] -= val;
}

function mul(register, val) {
    let new_val = parseToInt(val);
    val = new_val !== undefined ? new_val : CPU.registers[val];
    CPU.mul_invoked += 1;
}

function jnz(register, val) {
    val = parseInt(val);
    let new_val = parseToInt(register);
    let check_val = new_val !== undefined ? new_val : CPU.registers[register];
    if (check_val !== 0) {
        CPU.i += val - 1;
    }
}

function parseToInt(val) {
    if (val.search(/\d+/) !== -1) {
        return parseInt(val);
    }
}

function parseLine(line) {
    let args = line.split(' ').slice(1);
    switch (line.split(' ')[0]) {
        case 'set':
            return {
                func: set,
                args
            };
        case 'sub':
            return {
                func: sub,
                args
            };
        case 'mul':
            return {
                func: mul,
                args
            };
        case 'jnz':
            return {
                func: jnz,
                args
            };
    }
}