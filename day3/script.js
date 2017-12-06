function move(sign, side) {
    if (side === 'x') {
        x += sign;
    } else y += sign;
    return [x, y];
}

function main() {
    const input = 361527;
    let step = 1;

    let [x, y] = [0, 0];

    let len = 1;

    let sign = 1;
    let side = 'x';

    while (step != input) {

        [x, y] = move(sign, side);
        step += 1;
    }
}