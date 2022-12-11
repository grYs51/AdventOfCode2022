import { readFileSync } from "fs";
import { join } from "path";

const MAX = 100000;
const DISK = 70000000;
const UPDATE = 30000000;

const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\n");

const parseInstruction = (input: string[]) => {
  let directory: string[] = [];
  const sizes = new Map<string, number>();

  for (let i = 0; i < input.length; i++) {
    const instruction = input[i];

    if (instruction.match(/\$ cd .+/)) {
      changeDirectory(instruction, directory);
    }
    if (instruction.match(/\d+/)) {
      setSize(instruction, directory, sizes);
    }
  }

  return sizes;
};

const changeDirectory = (instruction: string, directory: string[]) => {
  if (instruction === "$ cd ..") {
    directory.pop();
  } else {
    const match = instruction.match(/([/\w]+)\s*$/) || [];
    if (match.length > 1) {
      directory.push(match[1]);
    }
  }
};

const setSize = (
  instruction: string,
  directory: string[],
  sizes: Map<string, number>
) => {
  const match = instruction.match(/\d+/) || [];
  const size = Number(match[0]);
  const pathes = getPathes(directory);

  pathes.forEach((path) => {
    sizes.set(path, (sizes.get(path) ?? 0) + size);
  });
};

const getPathes = (directory: string[]) =>
  directory.map((_, i, initArr) => initArr.slice(0, i + 1).join("/"));

const getSumWithCondition = (values: number[], max: number) => {
  return values.reduce((acc, curr) => acc + (curr <= max ? curr : 0), 0);
};

const sizes = parseInstruction(input as string[]);

// part 1
const part1 = getSumWithCondition(Array.from(sizes.values()), MAX);
console.log({ part1 });

const rootSize = sizes.get("/") || 0;
const values = Array.from(sizes.values());

const usedSpace = DISK - rootSize;
const needDelete = UPDATE - usedSpace;

const getMinWithCondition = (arr: number[], needDelete: number) => {
  let min = arr[0];

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (curr >= needDelete && curr < min) {
      min = curr;
    }
  }

  return min;
};

const part2 = getMinWithCondition(values, needDelete);
console.log({ part2 });
