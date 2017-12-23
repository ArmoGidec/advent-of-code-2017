let fs = require('fs');
let Program = require('./Program').Program;

fs.readFile('./day18/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    main(data.toString());
});

function main(text) {
    let instructions = text.split('\n');
    let program1 = new Program('program1', instructions);
    let program2 = new Program('program2', instructions);

    program1.toHear = program2.snded;
    program2.toHear = program1.snded;

    program1.start();
    program2.start();

    // let timer = setInterval(() => {
    //     console.log('Check:', program1, program2);
    //     if (program1.is_wait && program2.is_wait) {
    //         console.log(program1.snded_k);
    //         clearInterval(timer);
    //     }
    // }, 1000);
}
