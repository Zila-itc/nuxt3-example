// import { getWord } from "../lib/faker";
import { nouns } from "../lib/nouns";
import { verbs } from "../lib/verbs";
import { adverbs } from "../lib/adverbs";
import { adjectives } from "../lib/adjectives";

export default defineEventHandler((event) => {
  const query = useQuery(event);

  const length = +query.length > 4 || +query.length < 2 ? 4 : +query.length;

  const badWords: String[] = [
    "fuck",
    "rape",
    "shit",
    "piss",
    "cunt",
    "dumb",
    "twot",
    "dick",
    "cock",
    "kill"
  ];

  const wordSet = new Set();
  nouns.forEach(wordSet.add, wordSet);
  verbs.forEach(wordSet.add, wordSet);
  adverbs.forEach(wordSet.add, wordSet);
  adjectives.forEach(wordSet.add, wordSet);

  const words= [...wordSet];
  let word: String;

  do {
    // word = getWord(length);
    const random = Math.floor(Math.random() * words.length - 1);
    word = words[random];
  } while (badWords.includes(word));

  return { word };
});
