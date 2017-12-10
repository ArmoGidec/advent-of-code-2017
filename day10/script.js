let fs = require('fs');

fs.readFile('day10/input.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    main(data.toString());
});

function main(text) {
    let index = 0;
    let pass = 0;
    let lenghts = toGetLenghts(text);
    lenghts.push(17, 31, 73, 47, 23);
    let list = toGetList();
    let hashes = [];
    for (let i = 0; i < 64; i++) {
        [list, index, pass] = toGetPreHash(list, lenghts, index, pass);
    }
    let hash_list = toGetHashList(list);
    let hex_hash = toGetHex(hash_list);
    console.log(hex_hash);
}

function toGetHex(array) {
    let hex_list = array.map(el => el.toString(16));
    return hex_list.join('');
}

function toGetHashList(list) {
    let knotHashList = [];
    for (let i=0; i<16; i++) {
        let start_index = i*16;
        let dense_hash = 0;
        for (let j=start_index; j<start_index+16; j++) {
            dense_hash ^= list[j];
        }
        knotHashList.push(dense_hash);
    }
    return knotHashList;
}

function toGetLenghts(text) {
    // let lenghts = text.split(',').map(i => parseInt(i));
    let lenghts = text.replace(/ *, */g, ',').split('').map(i => i.charCodeAt(0));
    return lenghts;
}

function toGetList() {
    let list = [];
    for (let i = 0; i < 256; i++) {
        list[i] = i;
    }
    return list;
}

function toGetPreHash(list, lenghts, index = 0, pass = 0) {
    let list_len = list.length;

    for (let len of lenghts) {
        let subArray = [];
        for (let i = index, j = 0; j < len; i = (i + 1) % list_len, j++) {
            subArray.push(list[i]);
        }
        subArray.reverse();
        for (let i = index, j = 0; j < len; i = (i + 1) % list_len, j++) {
            list[i] = subArray[j];
        }
        index = (index + len + pass++) % list_len;
    }

    return [list, index, pass];
}