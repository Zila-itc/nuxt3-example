import { useQuery } from "h3";
import { queryByCollection } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    if (query.key !== "yroc") return "Nothing to see here!";
    const docs = await queryByCollection(query.col as string);

    const ips = new Set();
    docs.forEach((d) => {
      ips.add(d.user.ip);
    });

    let winners = 0;
    let losers = 0;

    const words = new Set();
    const uniqueCompleted = [];
    docs.forEach((d) => {
      const word = d.chars.join("");
      words.add(word);

      const guessedWords: String[] = d.words.map((w) => {
        return w.replaceAll(",", "");
      });

      const winner = guessedWords.includes(word);
      winner ? winners++ : losers++;

      const completed = {
        id: d.id,
        word: word,
        guessedWords: guessedWords,
        winner: winner,
        ip: d.user.ip
      };

      uniqueCompleted.push(completed);
    });

    const groups = uniqueCompleted.reduce((groups, item) => ({
      ...groups,
      [item.word]: [...(groups[item.word] || []), item]
    }), {});

    const ipGroups = uniqueCompleted.reduce((groups, item) => ({
      ...groups,
      [item.ip]: [...(groups[item.ip] || []), item]
    }), {});

    return {
      winners: winners,
      losers: losers,
      percentWinners: (winners / losers) * 100,
      ipCount: ips.size,
      //    ips: Array.from(ips)
      docCount: docs.length,
      wordCount: words.size,
      words: Array.from(words).sort(),
      // uniqueCompleted: [...uniqueCompleted].sort((a,b) => a.word.localeCompare(b.word)),
      groups: groups,
      ipGroups: ipGroups
    };
  } catch (error) {
    return { result: [], error: error.message };
  }
});
