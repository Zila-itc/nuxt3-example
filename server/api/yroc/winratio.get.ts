import { useQuery } from "h3";
import { queryByCollection } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    if (query.key !== "winners") return "Nothing to see here!";
    const docs = await queryByCollection(query.col as string);

    // const ips = new Set();
    // docs.forEach((d) => {
    //   ips.add(d.user.ip);
    // });

    let winners = 0;
    let losers = 0;

    const words = new Set();
    // const uniqueCompleted = [];
    docs.forEach((d) => {
      const word = d.chars.join("");
      words.add(word);

      if (d.words?.length > 0) {
        const guessedWords: String[] = d.words.map((w) => {
          const cleaned = w?.split(",");
          const newWord = cleaned.join("")
          // console.log(newWord)
          return newWord;
        });

        const winner = guessedWords.includes(word);
        winner ? winners++ : losers++;
      }
    });

    const percentWinners = (winners / losers) * 100;

    // console.log(percentWinners)

    return {
      winners: winners,
      losers: losers,
      percentWinners: percentWinners,
    };
  } catch (error) {
    return { result: [], error: error.message };
  }
});
