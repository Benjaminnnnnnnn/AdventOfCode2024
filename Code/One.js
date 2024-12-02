const fs = require("fs");

function createLists(text) {
  const a = [];
  const b = [];
  const separated = fs.readFileSync(text, "utf8").split("\n");
  separated.forEach((line) => {
    const pair = line.split("   ");
    if (pair.length == 2) {
      a.push(parseInt(pair[0]));
      b.push(parseInt(pair[1]));
    }
  });
  a.sort();
  b.sort();
  return { a, b };
}

function createListsSimi(text) {
  const a = [];
  const b = [];
  const separated = fs.readFileSync(text, "utf8").split("\n");
  separated.forEach((line) => {
    const pair = line.split("   ");
    if (pair.length == 2) {
      a.push(parseInt(pair[0]));
      b.push(parseInt(pair[1]));
    }
  });
  return { a, b };
}

function calculateDistance(a, b) {
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    let diff = a[i] - b[i];
    total += Math.abs(diff);
  }
  return total;
}

function calculateSimilarity(a, b) {
  let Hash = new Map();
  b.forEach((number) => {
    if (!Hash.has(number)) {
      Hash.set(number, 1);
    } else {
      Hash.set(number, Hash.get(number) + 1);
    }
  });

  let score = 0;

  a.forEach((num) => {
    if (!Hash.has(num)) {
      score += 0;
    } else {
      score += num * Hash.get(num);
    }
  });
  return score;
}

function One() {
  const { a, b } = createLists("./data/one.txt");
  const distance = calculateDistance(a, b);
  console.log("Dist:", distance);
  const similarity = calculateSimilarity(a, b);
  console.log("Simi:", similarity);
}

One();
