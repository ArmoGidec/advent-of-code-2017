let fs = require('fs');

fs.readFile('./js/day21/input.txt', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }
  main(data.toString());
});

function main(text) {
  let firstPattern = '.#./..#/###';
  let rules = text.split('\n').map(line => parseLine(line));
}

function parseLine(line) {
  let res = line.split(' => ');
  return {
    in: res[0],
    to: res[1]
  };
}
