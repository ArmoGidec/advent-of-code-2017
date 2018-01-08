let fs = require('fs');

fs.readFile('day23/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});

let CPU = {
    i: 0,
    registers: {},
    mul_invoked: 0
};

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
    val = parseToInt(val) || CPU.registers[val];
    CPU.registers[register] = val;
}

function sub(register, val) {
    val = parseToInt(val) || CPU.registers[val];
    CPU.registers[register] -= val;
}

function mul(register, val) {
    val = parseToInt(val) || CPU.registers[val];
    CPU.registers[register] *= val;
    CPU.mul_invoked += 1;
}

function jnz(register, val) {
    val = parseInt(val);
    if (CPU.registers[register] !== 0) {
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