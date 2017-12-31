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
    let program0 = new Program(0, instructions);
    let program1 = new Program(1, instructions);

    program0.toHear = program1.snded;
    program1.toHear = program0.snded;

    program0.start();
    program1.start();

    let timer = setInterval(() => {
        if (program0.is_wait && program1.is_wait && program0.snded.length === 0 && program1.snded.length === 0) {
            console.log(program1.snded_k);
            clearInterval(timer);
        }
    }, 1000);
}
