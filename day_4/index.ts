import * as fs from "fs";
import path from "path";

type Range = {
  min: number;
  max: number;
};

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const elfs = input.split("\n").map((e) =>
  e.split(",").map((e) => {
    const [x, y] = e.split("-");
    return { min: parseInt(x), max: parseInt(y) };
  })
);

const isContained = (a: Range, b: Range) => a.min >= b.min && a.max <= b.max;

const isOverlapping = (a: Range, b: Range) => a.min <= b.max && a.max >= b.min;

const isFullyContained = (a: Range, b: Range) =>
  isContained(a, b) || isContained(b, a);

// Part 1
const part1 = elfs.filter(([a, b]) => isFullyContained(a, b)).length;
console.log({ part1 });

// Part 2
const part2 = elfs.filter(([a, b]) => isOverlapping(a, b)).length;
console.log({ part2 });
