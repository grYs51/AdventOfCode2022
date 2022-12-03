import * as fs from "fs";
import path from "path";

const priority = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};
type Priority = keyof typeof priority;

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

// check if if second part containt a letter from first part
const checkLetter = (array: string[][][]) =>
  array
    .map((item) => {
      const [first, second] = item;
      const result = second.find((letter) => first.includes(letter));
      return result;
    })
    .filter((item) => item);

// divide each word into two parts
const divideIntoTwo = (array: string[][]) =>
  array.map((item) => {
    const lenght = item.length;
    const half = Math.floor(lenght / 2);
    const first = item.slice(0, half);
    const second = item.slice(half, lenght);
    return [first, second];
  });

const getCount = (array: (string | undefined)[]) =>
  array
    .filter((item) => item)
    .map((item) => priority[item as Priority])
    .reduce((a, b) => a + b, 0);

// Part 1
const words = input.split("\n").map((item) => item.split(""));
const divided = divideIntoTwo(words);
const check = checkLetter(divided);
const count = getCount(check);
console.log({ count });

// Part 2
const words2 = input.split("\n");

const combined = (array: string[]) =>
  words2.reduce((acc, item, index) => {
    if (index % 3 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, [] as string[][]);

const threeCombined = combined(words2).map((item) => item.map((item) => item.split("")));
const checkLetter2 = (array: string[][][]) =>
  array.map((item) => {
    const [first, second, third] = item;
    const result = second.find((letter) => first.includes(letter) && third.includes(letter));
    return result;
  });

const check2 = checkLetter2(threeCombined);
const count2 = getCount(check2);
console.log({ count2 });