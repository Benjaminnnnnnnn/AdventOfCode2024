const fs = require("fs");

function getData() {
  const data = fs.readFileSync("./data/two.txt", "utf8").split("\n");
  data.pop();
  return data;
}
function isGood(vals) {
  const sorted = vals.slice().sort();
  const reverseSorted = vals.slice().sort().reverse();
  const increasing = JSON.stringify(vals) === JSON.stringify(sorted);
  const decreasing = JSON.stringify(vals) === JSON.stringify(reverseSorted);
  const ordered = increasing || decreasing;
  const diffpass = true;
  for (let i = 0; i < vals.length - 1; i++) {
    let diff = Math.abs(vals[i] - vals[i + 1]);
    if (!(1 <= diff <= 4)) {
      diffpass = false;
    }
  }
  return diffpass && ordered;
}
function countSafe(data) {
  let p1 = 0;
  let p2 = 0;
  data.forEach((line) => {
    const vals = line.split(" ").map((val) => parseInt(val, 10));
    if (isGood(vals)) {
      p1 += 1;
    }

    let good = false;
  });

  return p1;
}
function Two() {
  const data = getData();
  const answer = countSafe(data);
  console.log("Count:", answer);
}

Two();
