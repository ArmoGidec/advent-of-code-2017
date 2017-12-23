function parseLine(line) {
    let args = line.split(' ').slice(1);
    switch (line.split(' ')[0]) {
        case 'set':
            return {
                func: set,
                args
            };
        case 'add':
            return {
                func: add,
                args
            };
        case 'mul':
            return {
                func: mul,
                args
            };
        case 'mod':
            return {
                func: mod,
                args
            };
        case 'jgz':
            return {
                func: jgz,
                args
            };
        case 'rcv':
            return {
                func: rcv,
                args
            };
        case 'snd':
            return {
                func: snd,
                args
            };
    }
}

function parseToInt(val) {
    if (val.search(/\d+/) !== -1) {
        return parseInt(val);
    }
}

function checkRcv(array = []) {
    return new Promise((res, rej) => {
        let result = null;
        setTimeout(function run() {
            if (array.length > 0 && result != null) {
                result = array.slice(0, 1)[0];
            } else {
                setTimeout(run, 100);
            }
        }, 100);
        res(result);
    });
}

function set(register, val) {
    val = parseToInt(val) || this.registers[val];
    this.registers[register] = val;
    return true;
}

function add(register, val) {
    val = parseToInt(val) || this.registers[val];
    this.registers[register] += val;
    return true;
}

function mul(register, val) {
    val = parseToInt(val) || this.registers[val];
    this.registers[register] *= val;
    return true
}

function mod(register, val) {
    val = parseToInt(val) || this.registers[val];
    this.registers[register] %= val;
    return false;
}

function jgz(register, val) {
    val = parseToInt(val) || this.registers[val];
    if (this.registers[register] > 0) {
        this.i = this.i + val - 1;
    }
    return true;
}

function snd(register) {
    let val = this.registers[register];
    if (this.registers[register] !== 0) {
        this.snded.push(val);
        this.snded_k += 1;
        console.log(this.name, this.snded_k);
    }
    return true;
}

async function rcv(register) {
    this.is_wait = true;
    console.log(this.name, 'is wait.');
    let val = await checkRcv(this.toHear);
    this.registers[register] = val;
    this.is_wait = false;
    console.log(this.name, 'stop to wait.');
    return true;
}

class Program {

    constructor(name, instructions) {
        this.name = name;
        this.registers = {};
        this.instructions = instructions.slice();
        this.snded = [];
        this.snded_k = 0;
        this.i = 0;
        this.toHear = [];
        this.is_wait = false;
    }

    async start() {
        let len = 0;
        for (this.i = 0, len = this.instructions.length; this.i < len; this.i++) {
            let {
                func,
                args
            } = parseLine(this.instructions[this.i]);
            let res = await func.bind(this)(...args);
        }
    }


}

module.exports.Program = Program;


/*
function add(register, val) {
    val = parseToInt(val);
    registers[register] += val;
    return false;
}
  
function mul(register, val) {
    val = parseToInt(val);
    registers[register] *= val;
    return false;
}
  
function mod(register, val) {
    val = parseToInt(val);
    registers[register] %= val;
    return false;
}
  
function jgz(register, val) {
    val = parseToInt(val);
    if (registers[register] > 0) {
        i += (val - 1);
    }
    return false;
}
  
function rcv(register) {
    if (registers[register] !== 0) {
        return true;
    }
    return false;
}
  
function snd(register) {
    registers.snd_reg = registers[register];
    return false;
}
*/