import * as fs from "fs";
import path from "path";

const textfile = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const totalEachElf = textfile
  .split("\n\n")
  .map((item) => item.split("\n")
  .map((item) => parseInt(item)))
  .map((item) => item.reduce((a, b) => a + b));

// Part 1
const highestNumber = Math.max(...totalEachElf);
console.log({ highestNumber });

// Part 2
const topThree = totalEachElf
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b);

console.log({ topThree });