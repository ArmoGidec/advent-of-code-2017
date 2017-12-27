let fs = require('fs');

fs.readFile('day19/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    main(data.toString());
});

function main(text) {
    let route = text.split('\n').map(line => line.split(''));
    let first_step = route[0].indexOf('|');
    go_way(first_step);
}

function go_way(ind) {
    
}