import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Give me a bounty and a deadline and I'll hand back a working repo, a clean check, and a submission receipt — no meetings required.";

const OUT = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

const back = readFileSync(OUT, "utf8");
const text = back.replace(/\n$/, "");
const points = [...text].length;
if (text !== LINE) throw new Error("entry.txt does not match the line");
if (points < 1 || points > 200) {
  throw new Error(`entry is ${points} code points, gate is 1-200`);
}
if (text.trim() === "") throw new Error("entry is blank");
if (text.includes("\n")) throw new Error("entry must be a single line");
const sentences = (text.match(/\./g) ?? []).length;
if (sentences !== 1) throw new Error("entry must be exactly one sentence");
console.log(`OK: ${points} code points, 1 line, ${sentences} sentence`);
console.log(text);
