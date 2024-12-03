const fs = require("fs");

function sumMuls() {
  const data = fs.readFileSync("./data/three.txt", "utf8");
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const second_regex = /don't\(\)|do\(\)/g;
  const matches = [...data.matchAll(regex)];
  const second_matches = [...data.matchAll(second_regex)].reverse();
  let current_state = [..."do()".matchAll(second_regex)][0];
  let next_state = second_matches.pop();
  let sum = 0;
  matches.forEach((match) => {
    while (next_state.index < match.index) {
      if (second_matches.length == 0) {
        current_state = next_state;
        break;
      }
      current_state = next_state;
      next_state = second_matches.pop();
    }
    if (current_state[0] == "do()") {
      sum += match[1] * match[2];
    }
  });
  return sum;
}

console.log(sumMuls());
