import * as fs from "fs";
import path from "path";

const comparison = { A : "X", B : "Y", C : "Z" } as const;
type ELF = keyof typeof comparison;
const points = { X: 1, Y: 2, Z: 3 };
type Point = keyof typeof points;

const rules = { LOSE: "X", DRAW: "Y", WIN: "Z" } as const;
const points2 = {
  TIE: { X : 1, Y : 2, Z : 3 },
  WIN: { X : 2, Y : 3, Z : 1 },
  LOSE: { X : 3, Y : 1, Z : 2 },
}

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

// Part 1
const games = input.split("\n").map((item) => item.split(" "))

const equal = games.map((item) => {
  const [a, b] = item;
  const aLetter = comparison[a as ELF];
  return [aLetter, b];
});

const inPoints = equal.map((item) => {
  const [a, b] = item;
  const addpoints = points[b as Point];
  if (a === b) {
    return 3 + addpoints;
  } else if (a === "X" && b === "Z" || a === "Y" && b === "X" || a === "Z" && b === "Y") {
    return addpoints;
  } 
  return 6 + addpoints;
});

const sum = inPoints.reduce((a, b) => a + b, 0);
console.log({sum});

// part 2
const inPoints2 = equal.map((item) => {
  const [a, b] = item;
  if(b === rules.DRAW) {
    return 3 + points2.TIE[a as Point];
  } else if (b === rules.LOSE) {
    return points2.LOSE[a as Point];
  } 
  return 6 + points2.WIN[a as Point];
}
);

const sum2 = inPoints2.reduce((a, b) => a + b, 0);
console.log({sum2});

