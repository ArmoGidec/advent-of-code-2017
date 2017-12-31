class Program {
    constructor(name, instructions) {
        this.name = 'Program' + name;
        this.registers = { p: name };
        this.instructions = instructions.slice();
        this.snded = [];
        this.snded_k = 0;
        this.i = 0;
        this.toHear = [];
        this.is_wait = false;
        this.logStatus = [];
    }

    async start() {
        let len = 0;
        for (this.i = 0, len = this.instructions.length; this.i < len; this.i++) {
            this.log(`${this.name}: instruciton ${this.i} - ${this.instructions[this.i]}`);
            let {
                func,
                args
            } = parseLine(this.instructions[this.i]);
            let res = await func.bind(this)(...args);
        }
    }

    log(text) {
        console.log(text);
        this.logStatus.push(text);
    }

    status() {
        return this.logStatus[this.logStatus.length - 1];
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
        let timeId = setTimeout(function run() {
            if (array.length > 0) {
                result = array.splice(0, 1)[0];
                clearTimeout(timeId);
                res(result);
            } else {
                setTimeout(run, 100);
            }
        }, 100);
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
    this.snded.push(val);
    this.snded_k += 1;
    this.log(`${this.name}: send ${register} value.`);
    return true;
}

async function rcv(register) {
    this.is_wait = true;
    this.log(`${this.name}: is wait.`);
    let val = await checkRcv(this.toHear);
    this.registers[register] = val;
    this.log(`${this.name}: recive to ${register} register.`);
    this.is_wait = false;
    this.log(`${this.name}: stop wait.`);
    return true;
}

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

module.exports.Program = Program;