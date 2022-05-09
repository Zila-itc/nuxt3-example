import { useQuery } from "h3";
import { queryByCollection } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    if (query.key !== "yroc") return "Nothing to see here!";
    const docs = await queryByCollection(query.col as string);

    const wins = docs.filter((d) => d.result == "win").length;
    const loses = docs.filter((d) => d.result == "lose").length;
    const ratio = (wins / docs.length) * 100;

    const groups = docs.reduce(
      (groups, item) => ({
        ...groups,
        [item.userId]: [...(groups[item.userId] || []), item],
      }),
      {}
    );

    const elapsedTimes = docs
      .filter((d) => d.result == "win")
      .filter(d => d.elapsedTime > 0)
      .map((d) => {
        return {
          result: d.result,
          elapsedTime: d.elapsedTime,
          chars: d.chars,
          stats: d.stats,
          userId: d.user.userId,
          words: d.words,
          id: d.id
        };
      });

    console.log(docs[0]);

    elapsedTimes.sort((a, b) => a.elapsedTime - b.elapsedTime);

    // console.log('elapsedTimes', elapsedTimes)

    const userStats = [];

    Object.keys(groups).forEach((key) => {
      const wins = groups[key].filter((game) => game.result == "win").length;
      const loses = groups[key].filter((game) => game.result == "lose").length;
      const gamesPlayed = groups[key].length;

      const stat = {
        userId: key,
        gamesPlayed: gamesPlayed,
        wins: wins,
        loses: loses,
        ratio: (wins / gamesPlayed) * 100,
      };

      userStats.push(stat);
    });

    userStats.sort((a, b) => b.gamesPlayed - a.gamesPlayed);

    return {
      //   ipCount: ips.size,
      //    ips: Array.from(ips)
      docCount: docs.length,
      wins: wins,
      loses: loses,
      ratio: ratio,
      //   docs: docs
      //   userGroups: groups,
      uniqueUsers: Object.keys(groups).length,
      userStats: userStats,
      elapsedTimes: elapsedTimes,
    };
  } catch (error) {
    return { result: [], error: error.message };
  }
});
