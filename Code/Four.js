import fs from "fs";

const Lookup = {
  X: "M",
  M: "A",
  A: "S",
  S: "F",
};
const data = fs
  .readFileSync("./data/test.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));
data.pop();
const recurArea = (row, col, key = "X") => {
  console.log(key, row, col);
  let count = 0;
  if (key == "S") {
    console.log("Found", row, col);
    return 1;
  }
  const next_val = Lookup[key];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (
        !(
          row + i < 0 ||
          col + j < 0 ||
          row + i > data.length - 1 ||
          col + j > data.length - 1
        ) &&
        data[row + i][col + j] == next_val
      ) {
        let found = recurArea(row + i, col + j, next_val);
        if (found) {
          data[row + i][col + j] = ".";
        }
        return found;
      }
    }
  }
  return 0;
};

const four = () => {
  let count = 0;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data.length; col++) {
      if (data[row][col] == "X") {
        count += recurArea(row, col);
      }
    }
  }
  return count;
};

console.log(four());
