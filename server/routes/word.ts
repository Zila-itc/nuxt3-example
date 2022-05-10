import { getWord } from "../lib/faker";

export default defineEventHandler((event) => {
  const query = useQuery(event);

  const length = +query.length > 4 || +query.length < 2 ? 4 : +query.length;

  let word: String;

  const badWords: String[] = ["fuck", "rape", "shit", "piss", "cunt", "dumb", "twot", "dick", "cock"];

  do {
    word = getWord(length);
  } while (badWords.includes(word));

  return { word };
});
