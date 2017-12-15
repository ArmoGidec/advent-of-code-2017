const mod = 2147483647;

function main() {
    let factorA = 16807;
    let factorB = 48271;

    let seedA = 516;
    let seedB = 190;

    let total = 0;
    for (let i = 0; i < 5000000; i++) {
        seedA = findGood(seedA, factorA, 4);
        seedB = findGood(seedB, factorB, 8);
        total = getTotal(seedA, seedB, total);
    }

    console.log(total);
}

function findGood(current, factor, multiple) {
    let res = current * factor % mod;
    if (res%multiple === 0) {
        return res;
    } else {
        return findGood(res, factor, multiple);
    }
}

function getTotal(seedA, seedB, total) {
    let b = ((seedA ^ seedB) & 0xffff) === 0;
    total = b ? total + 1 : total;
    return total;
}

main();