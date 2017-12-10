let fs = require('fs');

let mas = [],
    names = [];

fs.readFile('day7/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    [mas, names] = mainAction(data.toString());

    let first_parent = toFindFirstParent();
    // if (first_parent !== null) {
    //     console.log(first_parent.name);
    // }

    // toPrintLastChildrens();

    toFindWrongWeightProgram(first_parent);
});

function toFindWrongWeightProgram(parent) {
    let array = [];
    for (let children of parent.childrens) {
        let sum = toSumWeight(children);
        // console.log(children, sum);
        array.push({ children, sum });
    }

    let uni = toCompare(array);

    if (uni === undefined) {
        console.log(parent);
        return;
    }
    console.log(array);

    let index = names.indexOf(uni.children);
    let element = mas[index];
    toFindWrongWeightProgram(element);
}

function toCompare(array) {
    let sum_array = array.map(({ children, sum }) => sum);
    let t = sum_array.reduce((map, el) => {
        map[el] = (map[el] || 0) + 1;
        return map;
    }, {});

    let filtered_value = parseInt(Object.keys(t).filter(el => t[el] === 1)[0]);
    let returned_value = array.filter(({ children, sum }) => sum === filtered_value)[0];
    return returned_value;
}

function toFindFirstParent() {
    for (let element of mas) {
        if (element.parent === null) {
            return element;
        }
    }
    return null;
}

function mainAction(file_text) {
    let [mas, names] = toCreateMainArray(file_text.split('\n'));

    for (let element of mas) {
        if (element.childrens) {
            for (let children of element.childrens) {
                let index = names.indexOf(children);
                mas[index].parent = element.name;
            }
        }
    }

    return [mas, names];
}

function toCreateMainArray(array) {
    let mas = [];
    let names = [];
    for (let line of array) {
        let splitLine = toSplitLine(line);
        mas.push(splitLine);
        names.push(splitLine.name);
    }

    return [mas, names];
}

function toSplitLine(line) {
    let split = line.split(' -> ');
    let childrens;
    if (split.length > 1) {
        childrens = split[1].split(', ');
    } else {
        childrens = null;
    }
    let name = split[0].match(/\w*/)[0];
    let weight = parseInt(split[0].match(/\([0-9]*\)/)[0].split('(')[1].split(')')[0]);

    return {
        name,
        weight,
        childrens,
        parent: null
    };
}

function toPrintLastChildrens() {
    let weights = new Set();
    for (let element of mas) {
        if (element.childrens === null) {
            weights.add(element.weight);
        }
    }
    console.log(Array(...weights).sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }));
}

function toSumWeight(name) {
    let index = names.indexOf(name);
    let element = mas[index];
    let sum = element.weight;
    if (element.childrens) {
        for (let children of element.childrens) {
            sum += toSumWeight(children);
        }
    }
    return sum;
}