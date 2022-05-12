// const { add } = require("./math");
import { it, expect } from "vitest";
import { getWord } from "./server/lib/faker";

it("word should be 4 characters long", () => {
  const word = getWord(4);
  // console.log(word);
  expect(word.length).toBe(4);
});
