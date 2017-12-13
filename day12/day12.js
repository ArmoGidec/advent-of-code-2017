function toGetMatrix() {
  const size = 2000;
  let matrix = new Array(size);
  for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
}

let fs = require('fs');
fs.readFile('input.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  mainAction(data.toString());
});

let matrix;

function mainAction(text) {
  matrix = toGetMatrix();
  text.split('\n').forEach(line => {
    let {
      i,
      dest
    } = toParseLine(line);
    for (let j of dest) {
      matrix[i][j] = matrix[j][i] = 1;
    }
  });
  let nodes = [[]];
  for (let i = 0; i<matrix.length;i++) {
    let b = true;
    for (let a of nodes) {
      if (a.includes(i)) {
        b = false;
        break;
      }
    }
    if (b) {
      let result = toGo(i);
      console.log(i, result.length);
      nodes.push(result);
    }
  }
  console.log(nodes.length-1);
}

function toGo(i = 0, nodes = [0]) {
  let dest = matrix[i].map((element, index) => {
    if (element == 1) return index;
  });
  for (let node of dest) {
    if (!nodes.includes(node)) {
      nodes = toGo(node, nodes.add(node));
    }
  }
  return nodes;
}

Array.prototype.add = function(element) {
  this.push(element);
  return this;
}

function toParseLine(line) {
  let s = line.split(' <-> ');
  let i = parseInt(s[0]);
  let dest = s[1].split(',').map(i => parseInt(i));
  return {
    i,
    dest
  };
}