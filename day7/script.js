let fs = require('fs');

fs.readFile('day7/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    let first_parent = mainAction(data.toString());
    if (first_parent !== null) {
        console.log(first_parent.name);
    }
});

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

    for (let element of mas) {
        if (element.parent === null) {
            return element;
        }
    }
    return null;
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

    return { name, weight, childrens, parent: null };
}