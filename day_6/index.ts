import { readFileSync } from "fs";
import path from "path";

const input = 
  readFileSync(path.join(__dirname, "input.txt"), "utf-8").split("");

const getIndex = (lenght: number) =>
  input
    .map((_, index) => input.slice(index - lenght, index))
    .findIndex((value) => new Set(value).size === lenght);

console.log("Part 1: ", getIndex(4));
console.log("Part 2: ", getIndex(14));
