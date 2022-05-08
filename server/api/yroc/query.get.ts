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
    return {
      ipCount: ips.size,
      //    ips: Array.from(ips)
      docCount: docs.length,
    };
  } catch (error) {
    return { result: [], error: error.message };
  }
});
