let fs = require('fs');

function main(text) {
    let components = text.split('\n').map(parseLine);
    let result = build(components);
    return result.max_strength;
}

function build(components, builded = [], last_pin = 0, strength = 0, max_builded = [], max_strength = 0) {
    let suitable_components = findSuitableComponent(components, last_pin);
    if (suitable_components.length === 0) { //если не найдены
        return { max_builded: builded, max_strength: strength };
    }
    for (let component of suitable_components) {
        let result = build(components.exclude(component), builded.concat(component), connect(last_pin, component.pins)[1], strength + component.pins[0] + component.pins[1], max_builded, max_strength);
        if (result.max_builded.length > max_builded.length || (result.max_builded.length === max_builded.length && result.max_strength > max_strength)) {
            max_strength = result.max_strength;
            max_builded = result.max_builded;
        }
    }
    return { max_builded, max_strength }
}

Array.prototype.exclude = function(element) {
    let new_array = this.slice();
    let index = new_array.findIndex(el => Object.is(el, element));
    new_array.splice(index, 1);
    return new_array;
};

function connect(last_pin, pins) {
    return last_pin === pins[0] ? pins : pins.reverse();
}

function findSuitableComponent(components, last_pin) {
    return components.filter(component => component.pins[0] === last_pin || component.pins[1] === last_pin);
}

function parseLine(line) {
    let ports = line.split('/').map(x => parseInt(x));
    return { pins: ports };
}

let Test = {
    tests: [{
        num: 1,
        res: 19
    }],
    pass: async function() {
        return await fs.readFile('day24/test.txt', (err, data) => {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            for (let test of this.tests) {
                let result = main(data.toString());
                if (result !== test.res) {
                    console.log(`Test ${test.num} is failed`);
                    return false;
                }
                console.log(`Test ${test.num} is passed`);
            }
            return true;
        });
    }
};

(function() {
    if (Test.pass()) {
        fs.readFile('day24/input.txt', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let result = main(data.toString());
            console.log(result);
        });
    }
})();