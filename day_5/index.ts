import { readFileSync } from "fs";
import path from "path";

interface Move {
  count: number;
  from: number;
  to: number;
}

type Stack = { [key: number]: Array<string> };

const input = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const [rawStacks, RawMoves] = input.split("\n\n");
const parsedStacks = rawStacks
  .split("\n")
  .map((line) => [...line].filter((char, index) => index % 4 === 1));

const index = parsedStacks.pop()!;
const stacks: Stack = {};

parsedStacks.map((stack) =>
  stack.map((char, i) => {
    if (char !== " ") {
      stacks[index[i] as any] = [char, ...(stacks[index[i] as any] || [])];
    }
  })
);

const moves: Move[] = RawMoves.split("\n").map((move) => {
  const [count, from, to] = move
    .split(" ")
    .filter(Number)
    .map((value) => parseInt(value));
  return { count, from, to };
});

// day 5 part 1
const playeMoves = (localStack: Stack, move: Move) => {
  for (let i = 0; i < move.count; i++) {
    const crate = localStack[move.from].pop();
    localStack[move.to].push(crate!);
  }
};

const part1 = () => {
  const localStacks: Stack = JSON.parse(JSON.stringify(stacks));
  for (const move of moves) {
    playeMoves(localStacks, move);
  }
  return index
    .map((value) => {
      const stack = localStacks[value as any];
      return stack[stack.length - 1];
    })
    .join("");
};

// day 5 part 2
const part2 = () => {
  const localStacks: { [key: string]: Array<string> } = JSON.parse(
    JSON.stringify(stacks)
  );
  for (const move of moves) {
    const crates = localStacks[move.from].splice(-move.count, move.count);
    localStacks[move.to] = localStacks[move.to].concat(crates);
  }
  return index
    .map((value) => {
      const stack = localStacks[value as string];
      return stack[stack.length - 1];
    })
    .join("");
};

console.log(part1());
console.log(part2());